var runtime = {};
var env = 'development';

async function initRuntime() {
    if (window.obsstudio) {
        runtime = {
            arch: "OBS_STUDIO",
            version: window.obsstudio.version
        };
        env = 'operating';
    } else if (typeof SE_API !== "undefined") {
        const SE = await SE_API.getOverlayStatus();
        runtime = {
            arch: "STREAMELEMENTS",
            editorMode: SE.isEditorMode,
            muted: SE.muted,
        };
        if(runtime.editorMode) { env = 'development'; } else { env = 'operating'; }
    } else if (location.protocol === "https:") {
        runtime = {
            ...runtime,
            arch: "WEB_SECURE",
            secure: true,
            hostname: location.hostname,
            path: location.pathname,
            timestamp: new Date().toISOString()
        };
        env = 'operating';
    } else if (location.host === "localhost") {
        runtime = {
            ...runtime,
            arch: "LOCALHOST",
            secure: false,
            hostname: "localhost",
            path: location.pathname,
            timestamp: new Date().toISOString(),
        };
        env = 'sec_development';
    } else {
        runtime = {
            ...runtime,
            arch: "WEB_UNSECURE",
            secure: false,
            hostname: location.hostname,
            path: location.pathname,
            timestamp: new Date().toISOString()
        };
        env = 'development';
    }

    if(runtime.arch){
        runtime.env = env;
        log("log", `Runtime is now set to ${runtime.arch}!`, "RUNTIME")
    } else {
        log("critical", `Failed to set environment, check the discord to see wether the env is already registered, if not feel free to open a support ticket and request adding it!`, "RUNTIME")
    }

}
