<p align="center"><br><img src="https://user-images.githubusercontent.com/236501/85893648-1c92e880-b7a8-11ea-926d-95355b8175c7.png" width="128" height="128" /></p>
<h3 align="center">Text to Speech</h3>
<p align="center"><strong><code>@capacitor-community/text-to-speech</code></strong></p>
<p align="center">
  Capacitor community plugin for native Text to Speech.
</p>

<p align="center">
  <img src="https://img.shields.io/maintenance/yes/2021?style=flat-square" />
  <a href="https://github.com/capacitor-community/text-to-speech/actions?query=workflow%3A%22CI%22"><img src="https://img.shields.io/github/workflow/status/capacitor-community/text-to-speech/CI/master?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/@capacitor-community/text-to-speech"><img src="https://img.shields.io/npm/l/@capacitor-community/text-to-speech?style=flat-square" /></a>
<br>
  <a href="https://www.npmjs.com/package/@capacitor-community/text-to-speech"><img src="https://img.shields.io/npm/dw/@capacitor-community/text-to-speech?style=flat-square" /></a>
  <a href="https://www.npmjs.com/package/@capacitor-community/text-to-speech"><img src="https://img.shields.io/npm/v/@capacitor-community/text-to-speech?style=flat-square" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:START - Do not remove or modify this section -->
<a href="#contributors-"><img src="https://img.shields.io/badge/all%20contributors-1-orange?style=flat-square" /></a>
<!-- ALL-CONTRIBUTORS-BADGE:END -->
</p>

## Maintainers

| Maintainer | GitHub                                    | Social                                        |
| ---------- | ----------------------------------------- | --------------------------------------------- |
| Robin Genz | [robingenz](https://github.com/robingenz) | [@robin_genz](https://twitter.com/robin_genz) |

## Installation

```
npm install @capacitor-community/text-to-speech
npx cap sync
```

On **iOS**, no further steps are needed.

On **Android**, register the plugin in your main activity:

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
import '@capacitor-community/text-to-speech';

import { Plugins } from '@capacitor/core';

const { TextToSpeech } = Plugins;

/**
 * Platform: Android/iOS/Web
 * This method will trigger text to speech engine and play desired text.
 * @param text - desired text to play in speech
 *        locale - supported locale (can be obtained by calling getSupportedLanguages())
 *        speechRate - speech rate (1.0 is the normal speech rate, lower values slow down the speech, greater values accelerate it)
 *        pitchRate - pitch rate (1.0 is the normal pitch rate, smaller value lowers the tone and greater value increases it)
 *        volume - volume of the synthesis (0 - 1)
 *        voice - index of the voice (can be obtained by calling getSupportedVoices()) (Android/Web Only)
 * @returns void
 */
TextToSpeech.speak({
  text: 'This is a sample text.',
  locale: 'en_US',
  speechRate: 1.0,
  pitchRate: 1,
  volume: 1.0,
  voice: 10,
  category: 'ambient',
});

/**
 * Platform: Android/iOS/Web
 * This method will stop the engine if it's in the middle of playback.
 * @param none
 * @returns void
 */
TextToSpeech.stop();

/**
 * Platform: Android/iOS/Web
 * This method will return list of supported languages.
 * @param none
 * @returns languages - list of available languages
 */
TextToSpeech.getSupportedLanguages();

/**
 * Platform: Android/iOS/Web
 * This method will return list of supported voices.
 * @param none
 * @returns voices - list of available voices
 */
TextToSpeech.getSupportedVoices();

/**
 * Platform: Android/iOS
 * This method will trigger the platform TextToSpeech engine to start the activity that installs the resource files on the device that are required for TTS to be operational.
 * @param none
 * @returns void
 */
TextToSpeech.openInstall();

/**
 * * Platform: Android/iOS
 * This method will change the pitch rate while the text is being played.
 * @param pitchRate - rate of the pitch (1.0 is the normal pitch, lower values lower the tone of the synthesized voice, greater values increase it)
 * @returns void
 */
TextToSpeech.setPitchRate({
  pitchRate: 1.5,
});

/**
 * * Platform: Android/iOS
 * This method will change the speech rate while the text is being played.
 * @param speechRate - speech rate (1.0 is the normal speech rate, lower values slow down the speech, greater values accelerate it)
 * @returns void
 */
TextToSpeech.setSpeechRate({
  speechRate: 0.5,
});
```

## Changelog

See [CHANGELOG.md](https://github.com/capacitor-community/text-to-speech/blob/master/CHANGELOG.md).

## License

See [LICENSE](https://github.com/capacitor-community/text-to-speech/blob/master/LICENSE).
