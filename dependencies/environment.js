BENTWI.environment = {};
var env = 'development';
const OBS = window.obsstudio;

async function initENV(liveRefresh, interval) {
    log("log", "Initilizing Environment..", "ENV")
    if (OBS) {
        BENTWI.environment = {
            arch: "OBS_STUDIO",
            version: OBS..pluginVersion,
            permission: OBS.getControlLevel(),
            state: OBS.getStatus(),
            curretnScene: OBS.getCurrentScene(),
            scenes: OBS.getScenes(),
            currentTransition: OBS.getCurrentTransition(),
            transitions: OBS.getTransitions()
        };
        env = 'operating';
    } else if (typeof SE_API !== "undefined") {
        const SE = await SE_API.getOverlayStatus();
        BENTWI.environment = {
            arch: "STREAMELEMENTS",
            editorMode: SE.isEditorMode,
            muted: SE.muted,
        };
        if(BENTWI.environment.editorMode) { env = 'development'; } else { env = 'operating'; }
    } else if (location.protocol === "https:") {
        BENTWI.environment = {
            ...BENTWI.environment,
            arch: "WEB_SECURE",
            secure: true,
            hostname: location.hostname,
            path: location.pathname,
            timestamp: new Date().toISOString()
        };
        env = 'operating';
    } else if (location.host === "localhost") {
        BENTWI.environment = {
            ...BENTWI.environment,
            arch: "LOCALHOST",
            secure: false,
            hostname: "localhost",
            path: location.pathname,
            timestamp: new Date().toISOString(),
        };
        env = 'sec_development';
    } else {
        BENTWI.environment = {
            ...BENTWI.environment,
            arch: "WEB_UNSECURE",
            secure: false,
            hostname: location.hostname,
            path: location.pathname,
            timestamp: new Date().toISOString()
        };
        env = 'development';
    }

    if(BENTWI.environment.arch){
        BENTWI.environment.env = env;
        log("log", `Runtime is now set to ${BENTWI.environment.arch}!`, "RUNTIME")
    } else {
        log("critical", `Failed to set environment, check the discord to see wether the env is already registered, if not feel free to open a support ticket and request adding it!`, "RUNTIME")
    }

    if(liveRefresh){
        setTimeout(initENV, interval || 1500)

}
