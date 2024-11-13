BENTWI.config.set = (config) => {

    if(config.connection.token != "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx" && config.overlay.artifact != "com.myname.overlays.firstoverlay" && config.overlay.name != "My first overlay"){
        BENTWI.config = Object.assign({}, BENTWI.config, config);
        
        setTimeout(() => { 
        console.log(BENTWI.config)
        
        log("log", `Set new config with artifact: ${config.overlay.artifact}`, 'CONFIG')
        updateDocumentTitle(`${BENTWI.config.overlay.name} | BenTwi`) }, 500)
    } else {
        log("error", "Config wasn't able to be set because either token, artifact or name was not set!", "SESSION")
        return;
    }

}

BENTWI.config.get = () => {
    return BENTWI.sessions.live.config;
}