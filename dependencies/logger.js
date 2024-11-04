function log(level, message, context) {
    const DATE = new Date()
    var logMessage;
    
    switch(level){

        case "log":
            logMessage = `${DATE.toLocaleTimeString()} [🟢BenTwi-LOG🟢] [${context}] ${message}\n`;
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
