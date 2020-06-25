# Capacitor Text to Speech Plugin

Capacitory community plugin for text to speech engine.

## Maintainers

| Maintainer    | GitHub                                      | Social                     | Sponsoring Company |
| ------------- | ------------------------------------------- | -------------------------- | ------------------ |
| Priyank Patel | [priyankpat](https://github.com/priyankpat) | [N/A](https://twitter.com) | Ionic              |

Mainteinance Status: Actively Maintained

## Installation

To use npm

```bash
npm install @capacitor/text-to-speech
```

To use yarn

```bash
yarn add @capacitor/text-to-speech
```

Sync native files

```bash
npx cap sync
```

On iOS, no further steps are needed.

On Android, register the plugin in your main activity:

```java
import com.getcapacitor.community.tts.TextToSpeech;

public class MainActivity extends BridgeActivity {

  @Override
  public void onCreate(Bundle savedInstanceState) {
    super.onCreate(savedInstanceState);

    // Initializes the Bridge
    this.init(
        savedInstanceState,
        new ArrayList<Class<? extends Plugin>>() {

          {
            // Additional plugins you've installed go here
            // Ex: add(TotallyAwesomePlugin.class);
            add(TextToSpeech.class);
          }
        }
      );
  }
}
```

## Configuration

No configuration required for this plugin.

## Supported methods

| Name                  | Android | iOS | Web |
| :-------------------- | :------ | :-- | :-- |
| speak                 | ✅      | ✅  | ✅  |
| stop                  | ✅      | ✅  | ✅  |
| getSupportedLanguages | ✅      | ✅  | ✅  |
| openInstall           | ✅      | ✅  | ❌  |
| setPitchRate          | ✅      | ✅  | ❌  |
| setSpeechRate         | ✅      | ✅  | ❌  |

## Usage

```typescript
// Must import the package once to make sure the web support initializes
import "@capacitor-community/http";

import { Plugins } from "@capacitor/core";

const { TextToSpeech } = Plugins;

/**
 * This method will trigger text to speech engine and play desired text.
 * @param text - desired text to play in speech
 *        locale - supported locale (can be obtained by calling getSupportedLanguages())
 *        rate - speech rate (1.0 is the normal speech rate, lower values slow down the speech, greater values accelerate it)
 *        pitch - pitch rate (1.0 is the normal pitch rate, smaller value lowers the tone and greater value increases it)
 *        volume - volume of the synthesis (0 - 1)
 *        voice - index of the voice (can be obtained by calling getSupportedVoices()) (Android/Web Only)
 * @returns void
 */
TextToSpeech.speak({
  text: "This is a sample text.",
  locale: "en_US",
  rate: 1.0,
  pitch: 1,
  volume: 1,
  voice: 10,
  category: "ambient",
});

/**
 * This method will stop the engine if it's in the middle of playback.
 * @param none
 * @returns void
 */
TextToSpeech.stop();

/**
 * This method will return list of supported languages.
 * @param none
 * @returns languages - list of available languages
 */
TextToSpeech.getSupportedLanguages();

/**
 * This method will return list of supported voices.
 * @param none
 * @returns voices - list of available voices
 */
TextToSpeech.getSupportedVoices();

/**
 * This method will trigger the platform TextToSpeech engine to start the activity that installs the resource files on the device that are required for TTS to be operational.
 * @param none
 * @returns void
 */
TextToSpeech.openInstall();

/**
 * This method will change the pitch rate while the text is being played.
 * @param pitchRate - rate of the pitch (1.0 is the normal pitch, lower values lower the tone of the synthesized voice, greater values increase it)
 * @returns void
 */
TextToSpeech.setPitchRate({
  pitchRate: 1.5,
});

/**
 * This method will change the speech rate while the text is being played.
 * @param speechRate - speech rate (1.0 is the normal speech rate, lower values slow down the speech, greater values accelerate it)
 * @returns void
 */
TextToSpeech.setSpeechRate({
  speechRate: 0.5,
});
```
