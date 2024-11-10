let session;
let lastSession;

BENTWI.connector = {

    connect: (remote) => {
        if(BENTWI.config && BENTWI.config.connection.token != "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" && BENTWI.config.connection.version != 0){
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
            log("error", "socektController didn't receive an socket object", "CONNECTOR")
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

        log("warn", "BenTwi received an message from the backend: ", "DEBUG")
        console.log(message)

    }

}
