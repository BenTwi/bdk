BENTWI.environment = {
    firstLoad: true
};
var env = 'development';
const OBS = window.obsstudio;

async function initENV(liveRefresh) {
    if(BENTWI.environment.firstLoad){
    log("log", "Initializing Environment..", "ENV");
        }

    if (OBS) {

        initOBS();
        
} else if (typeof SE_API !== "undefined") {
        const SE = await SE_API.getOverlayStatus();
        BENTWI.environment = {
            arch: "STREAMELEMENTS",
            editorMode: SE.isEditorMode,
            muted: SE.muted,
        };
        if (BENTWI.environment.editorMode) { 
            env = 'development'; 
        } else { 
            env = 'operating'; 
        }
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

    if (BENTWI.environment.arch) {
        BENTWI.environment.env = env;
        log("log", `Runtime is now set to ${BENTWI.environment.arch}!`, "RUNTIME");
        if(BENTWI.environment.firstLoad){
            BENTWI.environment.firstLoad = false;
    log("log", `Runtime is now set to ${BENTWI.environment.arch}!`, "RUNTIME");
        }
    } else {
        log("critical", `Failed to set environment, check the Discord to see whether the env is already registered. If not, feel free to open a support ticket and request adding it!`, "RUNTIME");
    }

    if (liveRefresh) {
        setTimeout(() => {
            initENV(true);
        }, 1500); // Added missing parenthesis
    }
}



async function initOBS() {
    try {
        const level = await getControlLevelPromise();
        const status = await getStatusPromise();
        const currentScene = await getCurrentScenePromise();
        const scenes = await getScenesPromise();
        const currentTransition = await getCurrentTransitionPromise();
        const transitions = await getTransitionsPromise();

        BENTWI.environment = {
            arch: "OBS_STUDIO",
            version: OBS.pluginVersion,
            permission: level,
            state: status,
            currentScene: currentScene,
            scenes: scenes,
            currentTransition: currentTransition,
            transitions: transitions
        };
        env = 'operating';
        log("log", "OBS environment initialized!", "RUNTIME");
    } catch (error) {
        log("error", `Failed to initialize OBS environment: ${error.message}`, "RUNTIME");
    }
}

// Wrapper functions for OBS methods (if Promises aren't natively supported)
function getControlLevelPromise() {
    return new Promise((resolve) => OBS.getControlLevel(resolve));
}
function getStatusPromise() {
    return new Promise((resolve) => OBS.getStatus(resolve));
}
function getCurrentScenePromise() {
    return new Promise((resolve) => OBS.getCurrentScene(resolve));
}
function getScenesPromise() {
    return new Promise((resolve) => OBS.getScenes(resolve));
}
function getCurrentTransitionPromise() {
    return new Promise((resolve) => OBS.getCurrentTransition(resolve));
}
function getTransitionsPromise() {
    return new Promise((resolve) => OBS.getTransitions(resolve));
}
