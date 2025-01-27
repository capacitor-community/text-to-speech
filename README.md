<p align="center"><br><img src="https://user-images.githubusercontent.com/236501/85893648-1c92e880-b7a8-11ea-926d-95355b8175c7.png" width="128" height="128" /></p>
<h3 align="center">Text to Speech</h3>
<p align="center"><strong><code>@capacitor-community/text-to-speech</code></strong></p>
<p align="center">
  Capacitor community plugin for synthesizing speech from text.
</p>

<p align="center">
  <img src="https://img.shields.io/maintenance/yes/2025?style=flat-square" />
  <a href="https://github.com/capacitor-community/text-to-speech/actions?query=workflow%3A%22CI%22"><img src="https://img.shields.io/github/actions/workflow/status/capacitor-community/text-to-speech/ci.yml?branch=master&style=flat-square" /></a>
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

## Configuration

No configuration required for this plugin.

## Demo

A working example can be found here: [robingenz/capacitor-plugin-demo](https://github.com/robingenz/capacitor-plugin-demo)

## Usage

```typescript
import { TextToSpeech } from '@capacitor-community/text-to-speech';

const speak = async () => {
  await TextToSpeech.speak({
    text: 'This is a sample text.',
    lang: 'en-US',
    rate: 1.0,
    pitch: 1.0,
    volume: 1.0,
    category: 'ambient',
    queueStrategy: 1
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

const isLanguageSupported = async (lang: string) => {
  const isSupported = await TextToSpeech.isLanguageSupported({ lang });
};
```

## API

<docgen-index>

* [`speak(...)`](#speak)
* [`stop()`](#stop)
* [`getSupportedLanguages()`](#getsupportedlanguages)
* [`getSupportedVoices()`](#getsupportedvoices)
* [`isLanguageSupported(...)`](#islanguagesupported)
* [`openInstall()`](#openinstall)
* [`addListener('onRangeStart', ...)`](#addlisteneronrangestart-)
* [Interfaces](#interfaces)
* [Enums](#enums)

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

Returns a list of supported BCP 47 language tags.

**Returns:** <code>Promise&lt;{ languages: string[]; }&gt;</code>

--------------------


### getSupportedVoices()

```typescript
getSupportedVoices() => Promise<{ voices: SpeechSynthesisVoice[]; }>
```

Returns a list of supported voices.

**Returns:** <code>Promise&lt;{ voices: SpeechSynthesisVoice[]; }&gt;</code>

--------------------


### isLanguageSupported(...)

```typescript
isLanguageSupported(options: { lang: string; }) => Promise<{ supported: boolean; }>
```

Checks if a specific BCP 47 language tag is supported.

| Param         | Type                           |
| ------------- | ------------------------------ |
| **`options`** | <code>{ lang: string; }</code> |

**Returns:** <code>Promise&lt;{ supported: boolean; }&gt;</code>

--------------------


### openInstall()

```typescript
openInstall() => Promise<void>
```

Verifies proper installation and availability of resource files on the system.

Only available for Android.

--------------------


### addListener('onRangeStart', ...)

```typescript
addListener(eventName: 'onRangeStart', listenerFunc: (info: { start: number; end: number; spokenWord: string; }) => void) => Promise<PluginListenerHandle>
```

| Param              | Type                                                                                |
| ------------------ | ----------------------------------------------------------------------------------- |
| **`eventName`**    | <code>'onRangeStart'</code>                                                         |
| **`listenerFunc`** | <code>(info: { start: number; end: number; spokenWord: string; }) =&gt; void</code> |

**Returns:** <code>Promise&lt;<a href="#pluginlistenerhandle">PluginListenerHandle</a>&gt;</code>

--------------------


### Interfaces


#### TTSOptions

| Prop                | Type                                                    | Description                                                                                                                                                                    | Default                          | Since |
| ------------------- | ------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | -------------------------------- | ----- |
| **`text`**          | <code>string</code>                                     | The text that will be synthesised when the utterance is spoken.                                                                                                                |                                  |       |
| **`lang`**          | <code>string</code>                                     | The language of the utterance. Possible languages can be queried using `getSupportedLanguages`.                                                                                | <code>"en-US"</code>             |       |
| **`rate`**          | <code>number</code>                                     | The speed at which the utterance will be spoken at.                                                                                                                            | <code>1.0</code>                 |       |
| **`pitch`**         | <code>number</code>                                     | The pitch at which the utterance will be spoken at.                                                                                                                            | <code>1.0</code>                 |       |
| **`volume`**        | <code>number</code>                                     | The volume that the utterance will be spoken at.                                                                                                                               | <code>1.0</code>                 |       |
| **`voice`**         | <code>number</code>                                     | The index of the selected voice that will be used to speak the utterance. Possible voices can be queried using `getSupportedVoices`.                                           |                                  |       |
| **`category`**      | <code>string</code>                                     | Select the iOS Audio session category. Possible values: `ambient` and `playback`. Use `playback` to play audio even when the app is in the background. Only available for iOS. | <code>"ambient"</code>           |       |
| **`queueStrategy`** | <code><a href="#queuestrategy">QueueStrategy</a></code> | Select the strategy to adopt when several requests to speak overlap.                                                                                                           | <code>QueueStrategy.Flush</code> | 5.1.0 |


#### SpeechSynthesisVoice

The <a href="#speechsynthesisvoice">SpeechSynthesisVoice</a> interface represents a voice that the system supports.

| Prop               | Type                 | Description                                                                                                 |
| ------------------ | -------------------- | ----------------------------------------------------------------------------------------------------------- |
| **`default`**      | <code>boolean</code> | Specifies whether the voice is the default voice for the current app (`true`) or not (`false`).             |
| **`lang`**         | <code>string</code>  | BCP 47 language tag indicating the language of the voice.                                                   |
| **`localService`** | <code>boolean</code> | Specifies whether the voice is supplied by a local (`true`) or remote (`false`) speech synthesizer service. |
| **`name`**         | <code>string</code>  | Human-readable name that represents the voice.                                                              |
| **`voiceURI`**     | <code>string</code>  | Type of URI and location of the speech synthesis service for this voice.                                    |


#### PluginListenerHandle

| Prop         | Type                                      |
| ------------ | ----------------------------------------- |
| **`remove`** | <code>() =&gt; Promise&lt;void&gt;</code> |


### Enums


#### QueueStrategy

| Members     | Value          | Description                                                                                                          |
| ----------- | -------------- | -------------------------------------------------------------------------------------------------------------------- |
| **`Flush`** | <code>0</code> | Use `Flush` to stop the current request when a new request is sent.                                                  |
| **`Add`**   | <code>1</code> | Use `Add` to buffer the speech request. The request will be executed when all previous requests have been completed. |

</docgen-api>

## Changelog

See [CHANGELOG.md](https://github.com/capacitor-community/text-to-speech/blob/master/CHANGELOG.md).

## License

See [LICENSE](https://github.com/capacitor-community/text-to-speech/blob/master/LICENSE).
