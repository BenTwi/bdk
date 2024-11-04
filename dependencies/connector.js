let session;
let lastSession;

BENTWI.connector = {

    connect: (remote) => {
        BENTWI.connector.socket = new WebSocket(remote);
        BENTWI.connector.socketController(BENTWI.connector.socket)
        log("warn", "Connecting to backend with domain: " + remote, "DEBUG")
    },
    reconnect: (after) => {

        after = after * 5000;
        log('warn', `Disconnecting Session and connecting again in ${after} seconds..`, 'CONNECTOR')
    
        BENTWI.connector.socket.close()
        BENTWI.connector.socket = null;
    
        setTimeout(() => {
    
            connect()
    
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
        })

        socket.addEventListener("error", (err) => {
            log("warn", "BenTwi backend connection got an error: " + JSON.stringify(err), "CONNECTOR")
        })

        socket.addEventListener("message", (message) => {
            log("warn", "BenTwi received an message from the backend: ", "DEBUG")
            console.log(message)
        })

    }

}