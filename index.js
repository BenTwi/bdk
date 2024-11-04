//############################################################
//
//
//              Lizenz & Credits von BenTwi hier
//
//
//############################################################







let socket;
let BackendWasConnected = false;
let domains;
let BENTWI = {
    useLocal: true
};


function loadDependencys(){

    const dependencys = ['logger', 'mappings', 'runtimes', 'utils', 'connector']

        // Replace ./data.json with your JSON feed
    fetch('https://bentwi.skykopf.com/dev-kit/config/domains.json').then(response => {
        return response.json();
    }).then(data => {
        log("log", "Successfully loaded domains", "MAIN")
    }).catch(err => {
        log("critical", `Cannot load domains from backend server: ${JSON.stringify(err)}`, "MAIN")
    });


    dependencys.forEach(dependency => {

        const depSrc = document.createElement('script')
        depSrc.src = `https://bentwi.skykopf.com/dev-kit/dependencies/${dependency}.js`;

        document.body.appendChild(depSrc)

        setTimeout(() => {
            log("log", `Loaded dependency "${dependency}"`, "MAIN")
        }, 2500)

    })

    setTimeout(() => {
        initENV()
        setTimeout(loadBenTwiDotJSON, 1000)
    }, 3500)

}


function loadBenTwiDotJSON(){

    log("log", "Trying to load bentwi.json", "MAIN")

    if(BENTWI.useLocal){
        log("warn", "Hey! In this version BenTwi can't use a local BenTwi.json file.", "MAIN")
        setInlineBenTwiConfig(true)
        setTimeout(loadBenTwiDotJSON, 1000)
        return;
        log("log", "Loaded BenTwi.json in Local mode", "MAIN")
    } else {
        fetch('https://bentwi.skykopf.com/dev-kit/bentwi.json').then(response => {
            return response.json();
        }).then(data => {
            log("log", "Loaded BenTwi.json in Inline mode", "MAIN")
        }).catch(err => {
            log("critical", `Cannot load bentwi default from backend server: ${JSON.stringify(err)}`, "MAIN")
        });
    }

}


function setInlineBenTwiConfig(val){
    if(val == true || val == false){
    BENTWI.useLocal = !val
} else {
    log("error", `setInlineBenTwiConfig() needs an boolean of true or false instead of ${val}`, "MAIN")
}
}

setTimeout(loadDependencys, 500)