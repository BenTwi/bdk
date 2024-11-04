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
        }, 2000)

    })

    setTimeout(() => {
        initRuntime()
    }, 3500)

}

setTimeout(loadDependencys, 500)