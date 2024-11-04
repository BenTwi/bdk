BENTWI.sessions = {
    live: {},
    closed: {},
    independent: {
        BackendWasConnected: false
    }
}

function newSession(){

    if(!BENTWI.sessions.independent.BackendWasConnected){
        log('log', 'Welcome! BenTwi is initzilizing its session, this should not take longer than 5 seconds! :P', 'SESSION')
    } else {

        log('log', "BenTwi terminated it's old session and is about to create a new one, please be patient ;]", 'SESSION')

    }

}