let session;
let lastSession;

BENTWI.connector = {

    connect: (remote) => {
        if(BENTWI.config && BENTWI.config.connection && BENTWI.config.connection.token != "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"){
            BENTWI.connector.socket = new WebSocket(remote + `?token=${BENTWI.config.connection.token}&version=${BENTWI.config.connection.version}`);
            BENTWI.connector.socketController(BENTWI.connector.socket)
            log("debug", "Connecting to backend with domain: " + remote, "DEBUG")
        } else {
            log("warn", "Delayed connecting task because BenTwi.json isn't set yet - Delayed by 5s", 'CONNECTOR');
            setTimeout(() => { BENTWI.connector.connect(remote); }, 5000)
        }
    },
    reconnect: (after) => {
        if(!BENTWI.connector.socket){
            log('warn', `Can't use reconnect when no socket is active`, 'CONNECTOR')
            return;
        }
        
        after = after * 1000;
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
            log("critical", "socketController didn't receive a socket object | Please report this error to our support team!", "CONNECTOR")
            return;
        }

        socket.addEventListener("open", () => {
            log("log", "BenTwi connectin established", "CONNECTOR")
        })

        socket.addEventListener("close", () => {
            log("warn", "BenTwi's connection was closed", "CONNECTOR")
            if(BENTWI.config.preferences.auto_reconnect_on_connection_loss){
                log("warn", "BenTwi will try to reconnect!")
                BENTWI.connector.reconnect(2)
            }
        })

        socket.addEventListener("error", (err) => {
            log("debug", "BenTwi backend connection got an error: " + JSON.stringify(err), "CONNECTOR")
            BENTWI.connector.reconnect(2)
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

        log("debug", "Received: " + parsedMessage.ID, "DEBUG")

        // Use switch statement to handle different message types by ID
        switch (parsedMessage.ID) {
            case "OB2OF_CONFIG":

                BENTWI.sessions.live.config = parsedMessage.DATA
                BENTWI.events.emit('config', parsedMessage.DATA)
                log("log", "Session config aquired & saved!", "CONNECTOR")

            break;

            case "OB2OF_EVENTSUB":

            const eventType = parsedMessage.DATA.subscription.type;
            const eventData = parsedMessage.DATA.event;
            BENTWI.events.emit('twitch.eventsub', parsedMessage.DATA)
            BENTWI.events.emit(parsedMessage.DATA.subscription.type, parsedMessage.DATA)

            
            break;

            case "OB2OF_CHAT":
                BENTWI.events.emit('twitch.chat', parsedMessage.DATA)
                BENTWI.events.emit('channel.chat.message', parsedMessage.DATA)
            break;
            case "OB2OF_ERROR":
                log("DEBUG", message, "CONFIG")
                BENTWI.events.emit('error', parsedMessage.DATA)
            break;
            case "OB2OF_ALERT":
                BENTWI.events.emit('alert', parsedMessage.DATA)

                switch(parsedMessage.DATA.type){

                    case "SUB":
                        BENTWI.events.emit('alert.sub', parsedMessage.DATA)
                        break;
                        case "RESUB":
                        BENTWI.events.emit('alert.resub', parsedMessage.DATA)
                        break;
                        case "SUB_GIFT":
                        BENTWI.events.emit('alert.gift_sub', parsedMessage.DATA)
                        break;
                        case "COMMUNITY_GIFT":
                        BENTWI.events.emit('alert.sub_bomb', parsedMessage.DATA)
                        BENTWI.events.emit('alert.community_gift', parsedMessage.DATA)
                        break;
                        case "RAID":
                        BENTWI.events.emit('alert.raid', parsedMessage.DATA)
                        break;
                        case "CHEER":
                        BENTWI.events.emit('alert.cheer', parsedMessage.DATA)
                        BENTWI.events.emit('alert.bits', parsedMessage.DATA)
                        break;
                        case "FOLLOW":
                        BENTWI.events.emit('alert.follower', parsedMessage.DATA)
                        break;
                        
                }
                
            break;
            case "OB2OF_AUTHORIZE_SUCCESS":
                BENTWI.events.emit('authorized', parsedMessage.DATA)
            break;

                case "OB2OF_MSG":
                BENTWI.events.emit('msg', parsedMessage.DATA)
            break;

                case "OB2OF_COLOR":
                BENTWI.events.emit('color', parsedMessage.DATA)
            break;

                case "OB2OF_NOTIFY":
                BENTWI.events.emit('notify', parsedMessage.DATA)
            break;

                case "OB2OF_NEXTUP":
                BENTWI.events.emit('nextup', parsedMessage.DATA)
            break;

            case "OB2OF_PING":
                // Respond with PONG message
                BENTWI.connector.sendMessage({
                    ID: "OF2OB_PONG"
                });
                log("debug", "Responded with OF2OB_PONG", "CONNECTOR")
                break;

            default:
                log("debug", "Received an unhandled message ID: " + parsedMessage.ID, "CONNECTOR")
                break;
        }

        if(logWorth){
            log("debug", "BenTwi received a message from the backend: ", "DEBUG")
            console.log(parsedMessage)
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
