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