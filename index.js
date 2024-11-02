//############################################################
//
//
//              Lizenz & Credits von BenTwi hier
//
//
//############################################################







let socket;
let BackendWasConnected = false;


function loadDependencys(){

    const dependencys = ['connector', 'utils', 'logger', 'mappings', 'runtimes']

    dependencys.forEach(dependency => {

        const depSrc = createElement('script')
        depSrc.src = `https://bentwi.skykopf.com/dev-kit/dependencys/${dependency}.js`;

        document.body.appendChild(depSrc)

    })

}