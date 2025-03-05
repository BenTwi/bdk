BENTWI.utils = {
    getEmoji: () => {
        if (!emojisLoaded) {
            log('warn', "BenTwi wanted some emojis, but didn't get one, now it's crying in the corner, alone..", "UTILS");
            return null;
        } else {
            return BENTWI.utils.rng("arrEntry", emojis);
        }
    },

    random: (randomType, data) => {
        let giveBack;
        switch (randomType) {
            case "minMax":
                giveBack = Math.random() * (max - min) + min;
                break;
            case "arrEntry":
                giveBack = data[Math.floor(Math.random() * data.length)];
                break;
        }
        return giveBack;
    },

    getUrlParam: (param, urlString = window.location.href) => {
        if (!param) {
            log("error", "Please provide a param to search for in the URL", "UTILS");
            return null;
        }

        const url = new URL(urlString);
        return url.searchParams.get(param);
    },

    playSound: (url, vol = 1, pit = 1) => {
        let AUD = new Audio(url);
        AUD.volume = vol;
        AUD.playbackRate = pit;
        AUD.play();
    },

    updateDocumentTitle: (title) => {
        document.title = title;
    },

    httpReq: async (url, body = null, headers = {}, method = 'GET') => {
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
    },

    getPlaybackPercentage: (durationInMillis, currentPlaybackTime) => {
        let totalDuration = durationInMillis / 1000; // Convert to seconds
        return (currentPlaybackTime / totalDuration) * 100;
    }
};
