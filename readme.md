# BenTwi BDK Documentation

## Development Status

- [x] Completed
- [ ] Unfinished
- [ ] *Working on it*
- [ ] ~~Temporarily not in development~~

### Current Development State:
- [x] Enabling Eventsub for Beta users
- [ ] *Recode domain-docs [link](https://bentwi.skykopf.com/docs) (That thing is garbage)*
- [ ] *Start developing Skytrough*
- [x] Give BenTwi a logo
- [x] Create graphics for all over BenTwi's User Interface and Branding
- [ ] *Profile Stream game activity*
- [x] Add music widget support
- [x] Create a docs page on the domain
- [x] Get Discord server ready

---

## Chapter: `BenTwi.json`

The `BenTwi.json` file is essential for the BDK to function correctly. Place it either in your project’s root folder or the folder where you want to use BenTwi.

### Configuration Fields

#### Overlay // Canvas

<details>
<summary>Define your canvas's attributes:</summary>

```json
{
  "artifact": "A reverse DNS string used to identify and categorize the overlay.",
  "name": "A human-readable name for your overlay, shown when editing.",
  "width": "Set the base width of the overlay, default is 1920.",
  "height": "Set the base height of the overlay, default is 1080."
}
```

</details>

Connection
<details> <summary>Settings for connecting BenTwi to your account:</summary>

```json
{
  "token": "Your BenTwi token, used for secure access to your account data. Sharing this gives access to your Twitch account!",
  "version": "Set this to 'bdk'."
}
```

</details>
Preferences
<details> <summary>Customize how you want BenTwi to react to specific situations and how to handle actions:</summary>

```json
{
    auto_reconnect_on_connection_loss: true,
    clear_console_on_bdk_load: true,
    debug: true,
    live_refresh_environment: true
}
```
- **auto_reconnect_on_connection_loss:** Means that when the connection closes by mistake init a auto reconnect
- **clear_console_on_bdk_load:** If you want to clear the console on each reload to give a "session-based" console if you can say it like that
- **debug:** Tells the BDK to log more information than normal, helpfull when you want to report bugs
- **live_refresh_environment:** When true the environment refreshs every 1.5s - This is needed when wanting to change the overlay based on OBS scenes, transitions, etc.

</details>


## Chapter: Runtime Environment Detection and Configuration Overview

The Environment helps developers control the visibility of objects based on the mode your application or overlay is currently in. For example, one of BenTwi's developers, Bennet, uses this feature to hide elements when the overlay is loaded in OBS.
Usage Examples:
Testing Environment (OBS Studio):

```js
if (BENTWI.environment.arch == "OBS_STUDIO") {
  // Execute code when it's loaded in OBS Studio as an overlay
}
```

Testing Environment (StreamElements Editor):

```js
if (BENTWI.environment.arch == "STREAMELEMENTS" && BENTWI.environment.editorMode) {
  // Execute code when it's loaded in the StreamElements editor
}
```

Running in StreamElements (Live Mode or Editor):

```js
if (BENTWI.environment.arch == "STREAMELEMENTS") {
  // Execute code when it's loaded as an overlay preview or editor in StreamElements
}
```

<details> <summary>Things the runtime could include based on where BenTwi runs</summary>

    OBS Studio:
        Environment: operating
        Properties:
            arch: "OBS_STUDIO"
            version: window.obsstudio.version
        Purpose: Identifies the runtime within OBS Studio and sets up an operating environment for overlays, with OBS-specific integrations and optimizations.

    StreamElements (SE):
        Environment:
            development (in editor mode)
            operating (in live mode)
        Properties:
            arch: "STREAMELEMENTS"
            editorMode: SE.isEditorMode
            muted: SE.muted
        Purpose: Configures for StreamElements integration, adjusting the environment based on whether it's in editor mode or live mode.

    Secure Web (https):
        Environment: operating
        Properties:
            arch: "WEB_SECURE"
            secure: true
            hostname: location.hostname
            path: location.pathname
            timestamp: Current timestamp in ISO format.
        Purpose: Configures for secure web environments, ensuring overlays are served over HTTPS for enhanced security.

    Localhost:
        Environment: sec_development
        Properties:
            arch: "LOCALHOST"
            secure: false
            hostname: "localhost"
            path: location.pathname
            timestamp: Current timestamp in ISO format.
        Purpose: Configures for local testing environments, useful for development and debugging without impacting production.

    Unsecured Web (http):
        Environment: development
        Properties:
            arch: "WEB_UNSECURE"
            secure: false
            hostname: location.hostname
            path: location.pathname
            timestamp: Current timestamp in ISO format.
        Purpose: Configures for non-secure web contexts, useful for general development outside of localhost.

</details>
