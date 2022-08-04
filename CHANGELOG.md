# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [2.0.1](https://github.com/capacitor-community/text-to-speech/compare/v2.0.0...v2.0.1) (2022-08-04)


### Bug Fixes

* **ios:** set deployment target to `13.0` ([dcda399](https://github.com/capacitor-community/text-to-speech/commit/dcda399a01d3fdc04eedbdfab4fa49064cba81b7))

## [2.0.0](https://github.com/capacitor-community/text-to-speech/compare/v1.1.3...v2.0.0) (2022-08-04)


### ⚠ BREAKING CHANGES

* This plugin now only supports Capacitor 4.

### Features

* update to Capacitor 4 ([#81](https://github.com/capacitor-community/text-to-speech/issues/81)) ([e108ff3](https://github.com/capacitor-community/text-to-speech/commit/e108ff360ff7735b089321ff637238c22e580df0))

### [1.1.3](https://github.com/capacitor-community/text-to-speech/compare/v1.1.2...v1.1.3) (2022-04-04)


### Bug Fixes

* **web:** stop on window unload ([#79](https://github.com/capacitor-community/text-to-speech/issues/79)) ([22f4bd7](https://github.com/capacitor-community/text-to-speech/commit/22f4bd7c1e9c2e6ce745454e46b9cd16ef2c3c55))

### [1.1.2](https://github.com/capacitor-community/text-to-speech/compare/v1.1.1...v1.1.2) (2022-01-26)


### Bug Fixes

* inline source code in esm map files ([29a1aa8](https://github.com/capacitor-community/text-to-speech/commit/29a1aa8d5256ec1fcd168a0802b616fbd8935a58))

### [1.1.1](https://github.com/capacitor-community/text-to-speech/compare/v1.1.0...v1.1.1) (2021-05-04)


### Bug Fixes

* **android:** handle IETF BCP 47 language tag string correctly ([#66](https://github.com/capacitor-community/text-to-speech/issues/66)) ([296adcb](https://github.com/capacitor-community/text-to-speech/commit/296adcba96641de60aea7cc74c292f2fdd3f7ada))

## [1.1.0](https://github.com/capacitor-community/text-to-speech/compare/v1.0.0...v1.1.0) (2021-03-20)


### Features

* add `isLanguageSupported` method ([#58](https://github.com/capacitor-community/text-to-speech/issues/58)) ([eb39f93](https://github.com/capacitor-community/text-to-speech/commit/eb39f93e31c0ec008a0058b32464b4f43471b322))


### Bug Fixes

* **android:** shutdown tts on destroy ([#56](https://github.com/capacitor-community/text-to-speech/issues/56)) ([2b6da17](https://github.com/capacitor-community/text-to-speech/commit/2b6da17f4f73c9d4443a2cdd325a5f918dd04bc8))
* **ios:** `speak` method resolves immediately on iOS ([#59](https://github.com/capacitor-community/text-to-speech/issues/59)) ([e77e8ba](https://github.com/capacitor-community/text-to-speech/commit/e77e8baf459d197798f16e5034288677d5e41cb1))

## [1.0.0](https://github.com/capacitor-community/text-to-speech/compare/v0.2.3...v1.0.0) (2021-03-14)


### ⚠ BREAKING CHANGES

* `TTSOptions` properties `locale`, `speechRate`, `pitchRate` renamed to `lang`, `rate`, `pitch`.
* remove `setSpeechRate` and `setPitchRate`
* Update to Capacitor v3

### Features

* add Capacitor 3 support ([#47](https://github.com/capacitor-community/text-to-speech/issues/47)) ([912a914](https://github.com/capacitor-community/text-to-speech/commit/912a91455f100aa430d1a108090fb7f8ff2bc8e9))


* remove `setSpeechRate` and `setPitchRate` ([#49](https://github.com/capacitor-community/text-to-speech/issues/49)) ([c4bd0a8](https://github.com/capacitor-community/text-to-speech/commit/c4bd0a85197921f23fd43f3d4a9f6bd2d998183a))
* rename `TTSOptions` properties ([#51](https://github.com/capacitor-community/text-to-speech/issues/51)) ([83c4370](https://github.com/capacitor-community/text-to-speech/commit/83c43708165f5365158eb05eb22e5f69f15b7bef))

### [0.2.3](https://github.com/capacitor-community/text-to-speech/compare/v0.2.2...v0.2.3) (2021-03-12)


### Bug Fixes

* **ios:** pod failed to validate ([#46](https://github.com/capacitor-community/text-to-speech/issues/46)) ([6a83100](https://github.com/capacitor-community/text-to-speech/commit/6a831003d3c29f9fa6a46dc27e20267246b3ec1a))

### [0.2.2](https://github.com/capacitor-community/text-to-speech/compare/v0.2.1...v0.2.2) (2021-03-11)


### Bug Fixes

* **android:** `speechRate` and `pitchRate` are ignored ([#43](https://github.com/capacitor-community/text-to-speech/issues/43)) ([153a500](https://github.com/capacitor-community/text-to-speech/commit/153a500aef2245de61885ce282f7d5111f28b803))
* **android:** get supported languages ([#29](https://github.com/capacitor-community/text-to-speech/issues/29)) ([bf477aa](https://github.com/capacitor-community/text-to-speech/commit/bf477aab9f713413e8b418d809de26a0482524b0))
* **android:** get supported voices ([#31](https://github.com/capacitor-community/text-to-speech/issues/31)) ([0870389](https://github.com/capacitor-community/text-to-speech/commit/087038989a6ba77bcce14506b89172046f754ee7))
* **ios:** not working in background ([#35](https://github.com/capacitor-community/text-to-speech/issues/35)) ([63108ab](https://github.com/capacitor-community/text-to-speech/commit/63108abb6b35ffabb5d04ef9a720267ddad2f33b))
* **ios:** speech rate adjusted to other platforms ([#36](https://github.com/capacitor-community/text-to-speech/issues/36)) ([d33dceb](https://github.com/capacitor-community/text-to-speech/commit/d33dceb2ed132616a1aaa7b40177ea1d7c6321c3))
* **web:** stop speaking on a new call ([#44](https://github.com/capacitor-community/text-to-speech/issues/44)) ([6b1b83e](https://github.com/capacitor-community/text-to-speech/commit/6b1b83e28191b1882bc50f2e103f766c4e5182df))
* different behavior with blank `text` ([#39](https://github.com/capacitor-community/text-to-speech/issues/39)) ([527a51f](https://github.com/capacitor-community/text-to-speech/commit/527a51f7cf6cbc4debec5f239f4479488554d494))
* publish only necessary files ([#23](https://github.com/capacitor-community/text-to-speech/issues/23)) ([359f2d2](https://github.com/capacitor-community/text-to-speech/commit/359f2d203abff1890369bd10a31668ea202a5ae3))

## [0.2.0](https://github.com/capacitor-community/text-to-speech/compare/v0.1.3...v0.2.0) (2020-06-30)

### Bug Fixes

- Merge pull request #3 from MarnickvdA/master [f84aef3](https://github.com/capacitor-community/text-to-speech/commit/f84aef3f25ebfa402b5b0de7006fe7fda7f2e47b)

- Fix for issue #2 'Cant run on iOS'. Changed name of the PodSpec file. Also added JSON parser for the package.json file so you won't have to update the plugin information in two places ;) [dbc97c3](https://github.com/capacitor-community/text-to-speech/commit/dbc97c3e8c44e62b1cff9b3cf3b40d1141c58915)

### Features

### Docs

- docs: update header and fix minor typo to speak method [99861e6](https://github.com/capacitor-community/text-to-speech/commit/99861e6b41609369db978060e398524dd04f4530)

- docs: rename `rate` to `speechRate` and `pitch` to `pitchRate` [99861e6](https://github.com/capacitor-community/text-to-speech/commit/99861e6b41609369db978060e398524dd04f4530)

### Chores

- chore: add changelog [b83f97a](https://github.com/capacitor-community/text-to-speech/commit/b83f97aef2413b174d0cc4b423ab9cf54ab9d4fd)
- chore(ios): add volume option [eef1b00](https://github.com/capacitor-community/text-to-speech/commit/eef1b00a54c3e1570ed6a52bc83b556d4c9930ea)
- chore: add homepage property to package [2aad4f4](https://github.com/capacitor-community/text-to-speech/commit/2aad4f43d47fe9d5f776b9ea672f34ac08d81762)
