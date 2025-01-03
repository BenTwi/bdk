//############################################################
//
//
//              Lizenz & Credits von BenTwi hier
//
//
//############################################################







let domains;
let BENTWI = {
    useLocal: true,
    config: {},
    versions: {
        bdk: "v0.0",
        backend: "v0.0",
        frontend: "v0.0"
    },
    events: {
        events: {},

        on: function(event, callback) {
            if (!this.events[event]) {
                this.events[event] = [];
            }
            this.events[event].push(callback);
        },
        
        emit: function(event, ...args) {
            if (this.events[event]) {
                this.events[event].forEach(callback => callback(...args));
            }
        }
    }
};


function loadDependencys(){

    const dependencys = ['logger', 'mappings', 'environment', 'utils', 'sessionControll', 'connector', 'config', 'version']

    dependencys.forEach(dependency => {

        const depSrc = document.createElement('script')
        depSrc.src = `https://bentwi.skykopf.com/dev-kit/dependencies/${dependency}.js`;

        document.body.appendChild(depSrc)

        setTimeout(() => {
            log("log", `Loaded dependency "${dependency}"`, "MAIN")
        }, 2500)

        if(dependency === "mappings"){
            if(!preRegisterMappings){
                log("log", `No preRegisterMappings function found, skipped!`, "MAPPINGS");
            } else {
                setTimeout(preRegisterMappings, 2000)
            }
            
        }

    })

    fetch('https://bentwi.skykopf.com/dev-kit/config/domains.json').then(response => {
        return response.json();
    }).then(data => {
        log("log", "Successfully loaded domains", "MAIN")
        BENTWI.domains = data;
    }).catch(err => {
        log("critical", `Cannot load domains from backend server: ${JSON.stringify(err)}`, "MAIN")
    });

    setTimeout(() => {
        setTimeout(loadBenTwiDotJSON, 1000)
        setTimeout(newSession, 4000)
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
            log("log", "Fetching default BenTwi.json from Backend Server", "MAIN")
        fetch('https://bentwi.skykopf.com/dev-kit/bentwi.json').then(response => {
            return response.json();
        }).then(data => {
            BENTWI.config = { ...BENTWI.config, ...data };
            if(log) log("log", "Loaded BenTwi.json in Inline mode", "MAIN")
        }).catch(err => {
            err = JSON.stringify(err)
            if(err == "{}") return;
            log("critical", `Cannot load bentwi default from backend server: ${err}`, "MAIN")
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
