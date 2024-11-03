Current development state:

- [x] Completed
- [ ] Unfinished
- [ ] *Working on it*
- [ ] ~~Temporarily not in development~~

- [x] Enabling Eventsub for Beta users
- [ ] *Finish writing Docs (help, i don't wanna)*
- [ ] *Start developing Skytrough*
- [x] Give BenTwi a logo
- [ ] *Create some graphics for all over BenTwi's User Interface and Branding*
- [ ] *Profile Stream game activitys*
- [ ] ~~Add music widget support~~
- [ ] Push the frontend further
- [ ] Create a docs page on domain
- [ ] ~~Get Discord server ready~~
- [ ] ~~Eat something~~
- [ ] ~~Drink water~~




### Chapter: BenTwi.json

This JSON file is essential for BDK to function correctly. Place it either in your project’s root folder or the folder where you want to use BenTwi.
Configuration Fields


# Overlay // Canvas

<details>
<summary>Define your canvas's attributes:</summary>

    artifact: A reverse DNS string used to identify and categorize the overlay.
    name: A human-readable name for your overlay, shown when editing.
    width & height: Set the base dimensions of the overlay, recommended at 1920x1080 (16:9). If not specified, 1920x1080 is used by default.

</details>

# Connection

<details>
<summary>Settings for connecting BenTwi to your account:</summary>

    token: Your BenTwi token, allowing secure access to your account data. Do not share this token to keep your activity feed private.
    version: The current app version. Keep this updated to the latest version, which can be found in our API at bentwi.skykopf.com/docs/api.
    spotify: (Note: This setting will likely be removed, as user connections will be managed through the backend.)

</details>

# Preferences

<details>
<summary>Customize how BenTwi handles connectivity issues:</summary>

    auto_reconnect_on_connection_loss: If the connection to the backend is lost, BenTwi will attempt reconnection every 5 seconds for up to 15 minutes.
        Shutdown Process: If connection attempts fail, BenTwi will enter “shutdown” mode. Here, it tries to reach the user’s custom “disable” function for overlay visibility (e.g., fade-out or animation). If unavailable, BenTwi will forcely fade it out and  display a “Connection Issue” overlay as a fallback in either way.
        Reconnection Attempts: Every 5 minutes, BenTwi will retry the connection until the server is back online.

</details>



### Chapter: Runtime Environment Detection and Configuration Overview

The initRuntime function initializes the runtime object, capturing critical information about the current operating environment. This configuration helps adapt behavior based on the platform or mode in use, such as OBS Studio, StreamElements, secure web, or localhost. The env variable classifies each environment into one of three categories: development, sec_development, and operating. These categories streamline functionality and debugging by identifying each environment's role and requirements.
Environments and Configurations

<details>

<summary>Things the runtime could include based on where BenTwi runs</summary>

    OBS Studio:
        Environment: operating
        Properties:
            arch: "OBS_STUDIO"
            version: window.obsstudio.version
        Purpose: Identifies that the runtime is within OBS Studio and sets up an operating environment for overlays, supporting specific OBS integrations and optimizations.

    StreamElements (SE):
        Environment:
            development if in editor mode.
            operating if in live mode.
        Properties:
            arch: "STREAMELEMENTS"
            editorMode: SE.isEditorMode (checks if currently in editor mode)
            muted: SE.muted
        Purpose: Configures for StreamElements integration, adjusting the environment depending on whether the overlay is in editor mode (for testing) or live mode (for normal operation).

    Secure Web (https):
        Environment: operating
        Properties:
            arch: "WEB_SECURE"
            secure: true
            hostname: location.hostname
            path: location.pathname
            timestamp: Current timestamp in ISO format.
        Purpose: Configures for secure web environments, which ensures overlays are served over HTTPS, providing enhanced security.

    Localhost:
        Environment: sec_development
        Properties:
            arch: "LOCALHOST"
            secure: false
            hostname: "localhost"
            path: location.pathname
            timestamp: Current timestamp in ISO format.
        Purpose: Configures the environment for local testing, useful for development and debugging without impacting production.

    Unsecured Web (http):
        Environment: development
        Properties:
            arch: "WEB_UNSECURE"
            secure: false
            hostname: location.hostname
            path: location.pathname
            timestamp: Current timestamp in ISO format.
        Purpose: Configures for non-secure web contexts, intended for general development outside of localhost.

</details>

# Usage Example

This configuration helps developers easily distinguish between testing, development, and production environments. Each runtime is dynamically set based on the platform, enabling optimized behavior for the relevant environment.



```javascript
console.log(runtime);
// Output will vary based on the environment in which `initRuntime()` is executed.
// Examples can be found above
```