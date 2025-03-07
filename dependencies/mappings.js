// General document queries for quick access
BENTWI.utils.mappings = {
    add: (tag, type, alias, all = false) => {
        // Error handling: Check if any parameter is missing
        if (!tag || type == undefined || !alias) {
            log("error", "Missing parameter(s): 'tag', 'type', or 'alias'", "MAPPINGS");
            return;
        }
        
        // Error handling: Check if the alias already exists in MAPPINGS
        if (BENTWI.utils.mappings[alias]) {
            log("error", `Cannot add ${tag} as ${alias} because ${alias} already exists!`, "MAPPINGS");
            return;
        }

        // Determine the selector based on the 'type' parameter
        let selector;
        if(all){
            if (type === "class" || type === ".") {
            selector = document.querySelectorAll(`.${tag}`);
        } else if (type === "id" || type === "#") {
            selector = document.querySelectorAll(`#${tag}`);
        } else {
            selector = document.querySelectorAll(`${tag}`);
            return;
        }
        } else {
            if (type === "class" || type === ".") {
            selector = document.querySelector(`.${tag}`);
        } else if (type === "id" || type === "#") {
            selector = document.querySelector(`#${tag}`);
        } else {
            selector = document.querySelector(`${tag}`);
            return;
        }
        }

        // Error handling: Check if the selector found an element
        if (!selector) {
            log("error", `Element with ${type} '${tag}' not found in the document.`, "MAPPINGS");
            return;
        }

        // Assign the found element to MAPPINGS under the specified alias
        BENTWI.utils.mappings[alias] = selector;
        log("log", `Added '${tag}' with alias '${alias}' as new mapping!.`, "MAPPINGS");
    },
    
    // Predefined quick-access mappings
    body: document.body,
    debug: document.querySelector(".debug")
};
