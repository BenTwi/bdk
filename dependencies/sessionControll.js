BENTWI.sessions = {
    live: {},
    closed: {},
    independent: {
        BackendWasConnected: false
    }
}

function newSession(){

    BENTWI.config.set = (config) => {

        if(config.connection.token != "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" && config.overlay.artifact != "com.myname.overlays.firstoverlay" && config.overlay.name != "My first overlay"){
            BENTWI.config = config;
            MAPPING_title = `${BENTWI.config.overlay.name} | BenTwi`
        } else {
            log("error", "Config wasn't able to be set because either token, artifact or name was not set!", "SESSION")
            return;
        }
    
    }

    BENTWI.config.get = () => {
        return BENTWI.sessions.live.config;
    }

    if(!BENTWI.sessions.independent.BackendWasConnected){
        log('log', 'Welcome! BenTwi is initzilizing its session, this should not take any longer than 5 seconds! :P', 'SESSION')
        BENTWI.connector.connect(BENTWI.domains.socket)
    } else {
        log('log', "BenTwi terminated it's old session and is about to create a new one, please be patient ;]", 'SESSION')
        BENTWI.connector.reconnect(BENTWI.domains.socket)

    }

    BENTWI.sessions.closed = BENTWI.sessions.live;
    BENTWI.sessions.live = {};

}