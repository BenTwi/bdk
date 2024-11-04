let session;
let lastSession;

function connect(remote){



}

function disconnect(){



}

function reconnect(after){

    after = after * 5000;
    log('warn', `Disconnecting Session and connecting again in ${after} seconds..`, 'CONNECTOR')

    //disconnect

    setTimeout(() => {

        connect()

    }, after)


}

function newSession(){

    if(!BackendWasConnected){
        log('log', 'Welcome! BenTwi is initzilizing its session, this should not take longer than 5 seconds! :P', 'SESSION')
    } else {

        log('log', 'BenTwi terminated it old session and is about to create a new one, please be patient ;]', 'SESSION')

    }

}