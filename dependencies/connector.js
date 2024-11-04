let session;
let lastSession;

BENTWI.connector = {

    connect: (remote) => {
        BENTWI.connector.socket = new WebSocket(remote);
        BENTWI.connector.socketController(BENTWI.connector.socket)
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

        socket.onopen(() => {
            log("warn", "Connection to Backend established", "DEBUG")
        })

    }

}