// General document queries for quick access
let MAPPINGS = {
    add: (tag, type, alias) => {
        // Error handling: Check if any parameter is missing
        if (!tag || !type || !alias) {
            log("error", "Missing parameter(s): 'tag', 'type', or 'alias'", "MAPPINGS");
            return;
        }
        
        // Error handling: Check if the alias already exists in MAPPINGS
        if (MAPPINGS[alias]) {
            log("error", `Cannot add ${tag} as ${alias} because ${alias} already exists!`, "MAPPINGS");
            return;
        }

        // Determine the selector based on the 'type' parameter
        let selector;
        if (type === "class" || type === ".") {
            selector = document.querySelector(`.${tag}`);
        } else if (type === "id" || type === "#") {
            selector = document.querySelector(`#${tag}`);
        } else {
            log("error", `Invalid type '${type}' for ${tag}. Use 'class'/'.' or 'id'/'#' only.`, "MAPPINGS");
            return;
        }

        // Error handling: Check if the selector found an element
        if (!selector) {
            log("error", `Element with ${type} '${tag}' not found in the document.`, "MAPPINGS");
            return;
        }

        // Assign the found element to MAPPINGS under the specified alias
        MAPPINGS[alias] = selector;
        log("log", `Added '${tag}' with alias '${alias}' as new mapping!.`, "MAPPINGS");
    },
    
    // Predefined quick-access mappings
    body: document.body,
    debug: document.querySelector(".debug")
};