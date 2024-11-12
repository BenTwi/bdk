let session;
let lastSession;

BENTWI.events = {
    events: {},

    /**
     * Register a callback to an event
     * @param {string} event - Name of the event to listen to
     * @param {function} callback - Function to call when the event is emitted
     */
    on: function(event, callback) {
        if (!this.events[event]) {
            this.events[event] = [];
        }
        this.events[event].push(callback);
    },

    /**
     * Emit an event to trigger all registered callbacks
     * @param {string} event - Name of the event to emit
     * @param {...any} args - Arguments to pass to the callback functions
     */
    emit: function(event, ...args) {
        if (this.events[event]) {
            this.events[event].forEach(callback => callback(...args));
        }
    }
};

BENTWI.connector = {

    connect: (remote) => {
        if(BENTWI.config && BENTWI.config.connection && BENTWI.config.connection.token != "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"){
            BENTWI.connector.socket = new WebSocket(remote + `?token=${BENTWI.config.connection.token}&version=${BENTWI.config.connection.version}`);
            BENTWI.connector.socketController(BENTWI.connector.socket)
            log("warn", "Connecting to backend with domain: " + remote, "DEBUG")
        } else {
            log("warn", "Delayed connecting task because BenTwi.json isn't set yet - Delayed by 5s", 'CONNECTOR');
            setTimeout(() => { BENTWI.connector.connect(remote); }, 5000)
        }
    },
    reconnect: (after) => {
        if(!BENTWI.connector.socket){
            log('warn', `Can't use reconnect when no session is active`, 'CONNECTOR')
            return;
        }
        
        after = after * 5000;
        log('warn', `Disconnecting Session and connecting again in ${after} seconds..`, 'CONNECTOR')
    
        BENTWI.connector.socket.close()
        BENTWI.connector.socket = null;
    
        setTimeout(() => {
            BENTWI.connector.connect(BENTWI.domains.socket)
        }, after)
    },
    disconnect: () => {
        BENTWI.connector.socket.close()
        BENTWI.connector.socket = null;
    },

    socket: null,

    socketController: (socket) => {
        if(!socket){
            log("error", "socketController didn't receive a socket object", "CONNECTOR")
            return;
        }

        socket.addEventListener("open", () => {
            log("warn", "BenTwi established a connection to the Backend", "CONNECTOR")
        })

        socket.addEventListener("close", () => {
            log("warn", "BenTwi's connection to the backend was closed", "CONNECTOR")
            if(BENTWI.config.preferences.auto_reconnect_on_connection_loss){
                log("warn", "BenTwi will try to reconnect!")
                BENTWI.connector.reconnect(5)
            }
        })

        socket.addEventListener("error", (err) => {
            log("warn", "BenTwi backend connection got an error: " + JSON.stringify(err), "CONNECTOR")
        })

        socket.addEventListener("message", (message) => {
            BENTWI.connector.messageHandler(message.data)
        })
    },

    messageHandler: (message) => {
        
        var logWorth = false;

        // Parse message as JSON
        let parsedMessage;
        try {
            parsedMessage = JSON.parse(message);
        } catch (error) {
            log("error", "Failed to parse message: " + message, "CONNECTOR")
            return;
        }

        // Use switch statement to handle different message types by ID
        switch (parsedMessage.ID) {
            case "OB2OF_CONFIG":

            BENTWI.sessions.live.config = parsedMessage.DATA
            
                break;
            case "OB2OF_PING":
                // Respond with PONG message
                BENTWI.connector.sendMessage({
                    ID: "OF2OB_PONG"
                });
                log("info", "Responded with OF2OB_PONG", "CONNECTOR")
                break;
            
            // Add more cases here for handling other messages as needed

            default:
                log("warn", "Received an unhandled message ID: " + parsedMessage.ID, "CONNECTOR")
                break;
        }

        if(logWorth){
            log("warn", "BenTwi received a message from the backend: ", "DEBUG")
            console.log(message)
        }

    },

    sendMessage: (messageObj) => {
        if (BENTWI.connector.socket && BENTWI.connector.socket.readyState === WebSocket.OPEN) {
            BENTWI.connector.socket.send(JSON.stringify(messageObj));
            log("info", "Sent message: " + JSON.stringify(messageObj), "CONNECTOR");
        } else {
            log("warn", "Unable to send message; socket is not open", "CONNECTOR");
        }
    }
}
