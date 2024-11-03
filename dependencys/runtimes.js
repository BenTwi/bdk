var runtime = {};
var env = 'development';

function initRuntime() {
    if (window.obsstudio) {
        runtime = {
            arch: "OBS_STUDIO",
            version: window.obsstudio.version
        };
        env = 'operating';
    } else if (typeof SE_API !== "undefined") {
        const SE = SE_API.getOverlayStatus();
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
    }

}
