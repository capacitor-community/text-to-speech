export interface TextToSpeechPlugin {
  /**
   * Starts text to speech.
   */
  speak(options: TTSOptions): Promise<void>;
  /**
   * Stops text to speech.
   */
  stop(): Promise<void>;
  /**
   * Returns all supported languages.
   */
  getSupportedLanguages(): Promise<{ languages: string[] }>;
  /**
   * Returns all supported voices.
   */
  getSupportedVoices(): Promise<{ voices: SpeechSynthesisVoice[] }>;
  /**
   * Verifies proper installation and availability of resource files on the system.
   */
  openInstall(): Promise<void>;
  /**
   * Sets the pitch rate.
   */
  setPitchRate(options: { pitchRate: number }): Promise<void>;
  /**
   * Sets the speech rate.
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
   * Default: `1`
   */
  speechRate?: number;
  /**
   * Default: `1`
   */
  pitchRate?: number;
  /**
   * Default: `1`
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
