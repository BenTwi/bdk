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

    const dependencys = ['logger', 'utils', 'connector', 'mappings', 'runtimes']

        // Replace ./data.json with your JSON feed
    fetch('https://bentwi.skykopf.com/dev-kit/config/domains.json').then(response => {
        return response.json();
    }).then(data => {
        log("log", "Successfully loaded domains", "MAIN")
    }).catch(err => {
        // Do something for an error here
    });


    dependencys.forEach(dependency => {

        const depSrc = document.createElement('script')
        depSrc.src = `https://bentwi.skykopf.com/dev-kit/dependencies/${dependency}.js`;

        document.body.appendChild(depSrc)

        setTimeout(() => {
            log("log", `Loaded dependency "${dependency}"`, "MAIN")
        }, 2000)

    })

}

setTimeout(loadDependencys, 500)