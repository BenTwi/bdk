function getEmoji(){

    if(!emojisLoaded){
        log('warn', "BenTwi wanted some emojis, but didn't get one, now it's crying in the corner, alone..", "UTILS")
    } else {

        return rng("arrEntry", emojis)

    }

}

function rng(rndType, data){

    var giveBack;

    switch(rndType){

        case "minMax":

        break;

        case "arrEntry":
            giveBack = data[Math.floor(Math.random() * data.length)]
        break;

    }

    return giveBack;

}


function getUrlParam(param, urlString){

    if(!param) log("error", "Please provide an param to search for in the URL", "UTILS");
    const URLOBJ = urlString || window.location.href;
    
    const url = new URL(URLOBJ);
    const RESP = url.searchParams.get(param);

    return RESP;
    
}


function playsound(url, vol, pit){
    if(!vol) vol = 1;
    if(!pit) pit = 1;
    let AUD = new Audio(url);
    AUD.volume = vol;
    AUD.pitch = pit;
    AUD.play()
  }


function updateDocumentTitle(title){
    //Yeah, laziness is kicking in..
    document.title = title;
}

async function httpReq(url, body = null, headers = {}, method = 'GET') {
    try {
        const options = {
            method: method.toUpperCase(),
            headers: { 'Content-Type': 'application/json', ...headers },
        };
        
        if (body && method !== 'GET') {
            options.body = JSON.stringify(body);
        }
        
        const response = await fetch(url, options);
        
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status} - ${response.statusText}`);
        }
        
        const contentType = response.headers.get('content-type');
        if (contentType && contentType.includes('application/json')) {
            return await response.json();
        }
        
        return await response.text();
    } catch (error) {
        console.error('Fetch error:', error);
        return { error: true, message: error.message };
    }
}
