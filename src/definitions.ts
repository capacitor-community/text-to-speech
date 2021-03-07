declare module '@capacitor/core' {
  interface PluginRegistry {
    TextToSpeech: TextToSpeechPlugin;
  }
}

export interface TextToSpeechPlugin {
  speak(options: TTSSpeakOptions): Promise<void>;
  stop(): Promise<void>;
  getSupportedLanguages(): Promise<TTSLanguages>;
  getSupportedVoices(): Promise<TTSVoices>;
  openInstall(): Promise<void>;
  setPitch(options: TTSPitchOptions): Promise<void>;
  setRate(options: TTSRateOptions): Promise<void>;
}

export interface TTSSpeakOptions {
  text: string;
  locale?: string;
  speechRate?: number;
  pitchRate?: number;
  volume?: number;
  voice?: number; // Web only
  category?: string; // iOS only
}

export interface TTSPitchOptions {
  pitch: number;
}

export interface TTSRateOptions {
  rate: number;
}

export interface TTSVoices {
  voices: SpeechSynthesisVoice[];
}

export interface TTSLanguages {
  languages: any;
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
