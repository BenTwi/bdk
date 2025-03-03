BENTWI.config.set = (config) => {

    if(config.connection.token != "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" && config.overlay.artifact != "com.myname.overlays.firstoverlay" && config.overlay.name != "My first overlay"){
        BENTWI.config = Object.assign({}, BENTWI.config, config);
        
        setTimeout(() => { 
            if(BENTWI.config.preferences.debug){
        console.log(BENTWI.config)
                console.log("Should LIVE update env: " + BENTWI.config.preferences.live_refresh_environment)
                }
        
        log("log", `Set new config with artifact: ${config.overlay.artifact}`, 'CONFIG')
            
            initENV(BENTWI.config.preferences.live_refresh_environment);
        updateDocumentTitle(`${BENTWI.config.overlay.name} | BenTwi`) }, 500)
    } else {
        log("error", "Config wasn't able to be set because either token, artifact or name was not set!", "SESSION")
        return;
    }

}

BENTWI.config.get = () => {
    const CONFIG = BENTWI.sessions.live.config
    if(!CONFIG){
        log("error", "There is no config set!", "CONFIG")
        return {};
    }
    return CONFIG;
}
