function log(level, message, context) {
    const DATE = new Date()
    var logMessage;

    if(context == "DEBUG") level = "debug"
    
    if(!context) context = "MISSING-TAG | Please report this to the support!"

    switch(level){

        case "log":
            logMessage = `${DATE.toLocaleTimeString()} [🟢BenTwi-LOG🟢] [${context}] ${message}\n`;
            console.log(logMessage);
        break;
        case "debug":
            if(!BENTWI.config.preferences.debug) return;
            logMessage = `${DATE.toLocaleTimeString()} [⚫BenTwi-DEBUG⚫] [${context}] ${message}\n`;
            console.log(logMessage);
        break;
        case "warn":
            logMessage = `${DATE.toLocaleTimeString()} [🟡BenTwi-WARNING🟡] [${context}] ${message}\n`;
            console.warn(logMessage);
        break;
        case "error":
            logMessage = `${DATE.toLocaleTimeString()} [🟠BenTwi-ERROR🟠] [${context}] ${message}\n`;
            console.error(logMessage);
        break;
        case "critical":
            logMessage = `${DATE.toLocaleTimeString()} [🔴💥BenTwi-CRICIAL💥🔴] [${context}] ${message}\n`;
            console.error(logMessage);
        break;

    }
}
