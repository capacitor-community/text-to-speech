<p align="center"><br><img src="https://user-images.githubusercontent.com/236501/85893648-1c92e880-b7a8-11ea-926d-95355b8175c7.png" width="128" height="128" /></p>
<h3 align="center">Text to Speech</h3>
<p align="center"><strong><code>@capacitor-community/text-to-speech</code></strong></p>
<p align="center">
  Capacitor community plugin for synthesizing speech from text.
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

### Capacitor 3.x

```
npm install @capacitor-community/text-to-speech
npx cap sync
```

### Capacitor 2.x

```
npm install @capacitor-community/text-to-speech@0.2.3
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

## Usage

```typescript
import { TextToSpeech } from '@capacitor-community/text-to-speech';

const speak = async () => {
  await TextToSpeech.speak({
    text: 'This is a sample text.',
    locale: 'en_US',
    speechRate: 1.0,
    pitchRate: 1.0,
    volume: 1.0,
    category: 'ambient',
  });
};

const stop = async () => {
  await TextToSpeech.stop();
};

const getSupportedLanguages = async () => {
  const languages = await TextToSpeech.getSupportedLanguages();
};

const getSupportedVoices = async () => {
  const voices = await TextToSpeech.getSupportedVoices();
};

const setPitchRate = async () => {
  await TextToSpeech.setPitchRate({
    pitchRate: 1.5,
  });
};

const setSpeechRate = async () => {
  await TextToSpeech.setSpeechRate({
    speechRate: 0.5,
  });
};
```

## API

<docgen-index>

* [`speak(...)`](#speak)
* [`stop()`](#stop)
* [`getSupportedLanguages()`](#getsupportedlanguages)
* [`getSupportedVoices()`](#getsupportedvoices)
* [`openInstall()`](#openinstall)
* [`setPitchRate(...)`](#setpitchrate)
* [`setSpeechRate(...)`](#setspeechrate)
* [Interfaces](#interfaces)

</docgen-index>

<docgen-api>
<!--Update the source file JSDoc comments and rerun docgen to update the docs below-->

### speak(...)

```typescript
speak(options: TTSOptions) => Promise<void>
```

Starts the TTS engine and plays the desired text.

| Param         | Type                                              |
| ------------- | ------------------------------------------------- |
| **`options`** | <code><a href="#ttsoptions">TTSOptions</a></code> |

--------------------


### stop()

```typescript
stop() => Promise<void>
```

Stops the TTS engine.

--------------------


### getSupportedLanguages()

```typescript
getSupportedLanguages() => Promise<{ languages: string[]; }>
```

Returns a list of supported languages.

**Returns:** <code>Promise&lt;{ languages: string[]; }&gt;</code>

--------------------


### getSupportedVoices()

```typescript
getSupportedVoices() => Promise<{ voices: SpeechSynthesisVoice[]; }>
```

Returns a list of supported voices.

**Returns:** <code>Promise&lt;{ voices: SpeechSynthesisVoice[]; }&gt;</code>

--------------------


### openInstall()

```typescript
openInstall() => Promise<void>
```

Verifies proper installation and availability of resource files on the system.

--------------------


### setPitchRate(...)

```typescript
setPitchRate(options: { pitchRate: number; }) => Promise<void>
```

Changes the pitch rate while the text is being played.

Only available for Android.

| Param         | Type                                |
| ------------- | ----------------------------------- |
| **`options`** | <code>{ pitchRate: number; }</code> |

--------------------


### setSpeechRate(...)

```typescript
setSpeechRate(options: { speechRate: number; }) => Promise<void>
```

Changes the speech rate while the text is being played.

Only available for Android.

| Param         | Type                                 |
| ------------- | ------------------------------------ |
| **`options`** | <code>{ speechRate: number; }</code> |

--------------------


### Interfaces


#### TTSOptions

| Prop             | Type                | Description                                                                                                                                                                                      |
| ---------------- | ------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **`text`**       | <code>string</code> | Text to be spoken.                                                                                                                                                                               |
| **`locale`**     | <code>string</code> | Language spoken in. Possible languages can be queried using `getSupportedLanguages`. Default: `en-US`                                                                                            |
| **`speechRate`** | <code>number</code> | The speech rate. Default: `1.0`                                                                                                                                                                  |
| **`pitchRate`**  | <code>number</code> | The pitch rate. Default: `1.0`                                                                                                                                                                   |
| **`volume`**     | <code>number</code> | The volume. Default: `1.0`                                                                                                                                                                       |
| **`voice`**      | <code>number</code> | The index of the selected voice. Possible voices can be queried using `getSupportedVoices`. Only available for Web.                                                                              |
| **`category`**   | <code>string</code> | Select the iOS Audio session category. Possible values: `ambient` and `playback` Use `playback` to play audio even when the app is in the background. Only available for iOS. Default: `ambient` |


#### SpeechSynthesisVoice

The <a href="#speechsynthesisvoice">SpeechSynthesisVoice</a> interface represents a voice that the system supports.

| Prop               | Type                 | Description                                                                                                                                                 |
| ------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **`default`**      | <code>boolean</code> | Specifies whether the voice is the default voice for the current app (`true`) or not (`false`).                                                             |
| **`lang`**         | <code>string</code>  | BCP 47 language tag indicating the language of the voice. Example: `en-US`                                                                                  |
| **`localService`** | <code>boolean</code> | Specifies whether the voice is supplied by a local (`true`) or remote (`false`) speech synthesizer service.                                                 |
| **`name`**         | <code>string</code>  | Human-readable name that represents the voice. Example: `Microsoft Zira Desktop - English (United States)`                                                  |
| **`voiceURI`**     | <code>string</code>  | Type of URI and location of the speech synthesis service for this voice. Example: `urn:moz-tts:sapi:Microsoft Zira Desktop - English (United States)?en-US` |

</docgen-api>

## Changelog

See [CHANGELOG.md](https://github.com/capacitor-community/text-to-speech/blob/master/CHANGELOG.md).

## License

See [LICENSE](https://github.com/capacitor-community/text-to-speech/blob/master/LICENSE).
