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
   * Returns a list of supported languages.
   */
  getSupportedLanguages(): Promise<{ languages: string[] }>;
  /**
   * Returns a list of supported voices.
   */
  getSupportedVoices(): Promise<{ voices: SpeechSynthesisVoice[] }>;
  /**
   * Verifies proper installation and availability of resource files on the system.
   */
  openInstall(): Promise<void>;
  /**
   * Changes the pitch rate while the text is being played.
   *
   * Only available for Android.
   */
  setPitchRate(options: { pitchRate: number }): Promise<void>;
  /**
   * Changes the speech rate while the text is being played.
   *
   * Only available for Android.
   */
  setSpeechRate(options: { speechRate: number }): Promise<void>;
}

export interface TTSOptions {
  /**
   * Text to be spoken.
   */
  text: string;
  /**
   * Language spoken in.
   * Possible languages can be queried using `getSupportedLanguages`.
   *
   * Default: `en-US`
   */
  locale?: string;
  /**
   * The speech rate.
   *
   * Default: `1.0`
   */
  speechRate?: number;
  /**
   * The pitch rate.
   *
   * Default: `1.0`
   */
  pitchRate?: number;
  /**
   * The volume.
   *
   * Default: `1.0`
   */
  volume?: number;
  /**
   * The index of the selected voice.
   * Possible voices can be queried using `getSupportedVoices`.
   *
   * Only available for Web.
   */
  voice?: number;
  /**
   * Select the iOS Audio session category.
   * Possible values: `ambient` and `playback`
   * Use `playback` to play audio even when the app is in the background.
   *
   * Only available for iOS.
   *
   * Default: `ambient`
   */
  category?: string; // iOS only
}

/**
 * The SpeechSynthesisVoice interface represents a voice that the system supports.
 */
export interface SpeechSynthesisVoice {
  /**
   * Specifies whether the voice is the default voice for the current app (`true`) or not (`false`).
   */
  default: boolean;
  /**
   * BCP 47 language tag indicating the language of the voice.
   * Example: `en-US`
   */
  lang: string;
  /**
   * Specifies whether the voice is supplied by a local (`true`) or remote (`false`) speech synthesizer service.
   */
  localService: boolean;
  /**
   * Human-readable name that represents the voice.
   * Example: `Microsoft Zira Desktop - English (United States)`
   */
  name: string;
  /**
   * Type of URI and location of the speech synthesis service for this voice.
   * Example: `urn:moz-tts:sapi:Microsoft Zira Desktop - English (United States)?en-US`
   */
  voiceURI: string;
}
