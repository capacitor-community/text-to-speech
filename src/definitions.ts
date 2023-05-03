export interface TextToSpeechPlugin {
  /**
   * Starts the TTS engine and plays the desired text.
   */
  speak(options: TTSOptions): Promise<void>;
  /**
   * Stops the TTS engine.
   */
  stop(): Promise<void>;
  /**
   * Returns a list of supported BCP 47 language tags.
   */
  getSupportedLanguages(): Promise<{ languages: string[] }>;
  /**
   * Returns a list of supported voices.
   */
  getSupportedVoices(): Promise<{ voices: SpeechSynthesisVoice[] }>;
  /**
   * Checks if a specific BCP 47 language tag is supported.
   */
  isLanguageSupported(options: {
    lang: string;
  }): Promise<{ supported: boolean }>;
  /**
   * Verifies proper installation and availability of resource files on the system.
   *
   * Only available for Android.
   */
  openInstall(): Promise<void>;
}

export interface TTSOptions {
  /**
   * The text that will be synthesised when the utterance is spoken.
   *
   * @example "Hello world"
   */
  text: string;
  /**
   * The language of the utterance.
   * Possible languages can be queried using `getSupportedLanguages`.
   *
   * @default "en-US"
   */
  lang?: string;
  /**
   * The speed at which the utterance will be spoken at.
   *
   * @default 1.0
   */
  rate?: number;
  /**
   * The pitch at which the utterance will be spoken at.
   *
   * @default 1.0
   */
  pitch?: number;
  /**
   * The volume that the utterance will be spoken at.
   *
   * @default 1.0
   */
  volume?: number;
  /**
   * The index of the selected voice that will be used to speak the utterance.
   * Possible voices can be queried using `getSupportedVoices`.
   */
  voice?: number;
  /**
   * Select the iOS Audio session category.
   * Possible values: `ambient` and `playback`.
   * Use `playback` to play audio even when the app is in the background.
   *
   * Only available for iOS.
   *
   * @default "ambient"
   */
  category?: string;
}

/**
 * The SpeechSynthesisVoice interface represents a voice that the system supports.
 */
export interface SpeechSynthesisVoice {
  /**
   * Specifies whether the voice is the default voice for the current app (`true`) or not (`false`).
   *
   * @example false
   */
  default: boolean;
  /**
   * BCP 47 language tag indicating the language of the voice.
   *
   * @example "en-US"
   */
  lang: string;
  /**
   * Specifies whether the voice is supplied by a local (`true`) or remote (`false`) speech synthesizer service.
   *
   * @example true
   */
  localService: boolean;
  /**
   * Human-readable name that represents the voice.
   *
   * @example "Microsoft Zira Desktop - English (United States)"
   */
  name: string;
  /**
   * Type of URI and location of the speech synthesis service for this voice.
   *
   * @example "urn:moz-tts:sapi:Microsoft Zira Desktop - English (United States)?en-US"
   */
  voiceURI: string;
}
