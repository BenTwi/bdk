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
            log("warn", "Connection to backend established", "DEBUG")
        })

    }

}