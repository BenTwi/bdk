BENTWI.alertManager = {
    _alerts: {}, // Store alert functions
    _queue: [], // Store pending alerts
    _activeTags: new Set(), // Tags of currently playing alerts

    trigger: (type, payload) => {
      if (!BENTWI.alertManager._alerts[type]) {
        console.warn(`No alert function registered for type: ${type}`);
        return;
      }

      const { tag } = payload; // Get the alert's tag (e.g., "alertBomb")

      // Check if an alert with the same tag is already playing
      if (tag && BENTWI.alertManager._activeTags.has(tag)) {
        console.log(`Queued ${type} (tag: ${tag})`);
        BENTWI.alertManager._queue.push({ type, payload });
        return;
      }

      // Mark tag as active
      if (tag) BENTWI.alertManager._activeTags.add(tag);

      // Play alert
      BENTWI.alertManager._alerts[type](payload);
    },

    complete: (type, tag) => {
      // Remove tag from active set
      if (tag) BENTWI.alertManager._activeTags.delete(tag);

      // Check the queue for alerts that can now play
      for (let i = 0; i < BENTWI.alertManager._queue.length; i++) {
        const { type: queuedType, payload: queuedPayload } = BENTWI.alertManager._queue[i];

        // Check if it's now allowed to play
        if (!queuedPayload.tag || !BENTWI.alertManager._activeTags.has(queuedPayload.tag)) {
          console.log(`Starting queued alert: ${queuedType}`);
          BENTWI.alertManager._queue.splice(i, 1); // Remove from queue
          BENTWI.alertManager.trigger(queuedType, queuedPayload); // Play it
          break; // Only start one at a time
        }
      }
    },

    append: (type, alertFunction) => {
      if (typeof alertFunction !== "function") {
        console.error("Provided alertFunction is not a function");
        return;
      }
      BENTWI.alertManager._alerts[type] = alertFunction;
    },
  };
