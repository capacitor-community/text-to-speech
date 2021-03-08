declare module '@capacitor/core' {
  interface PluginRegistry {
    TextToSpeech: TextToSpeechPlugin;
  }
}

export interface TextToSpeechPlugin {
  speak(options: TTSOptions): Promise<void>;
  stop(): Promise<void>;
  getSupportedLanguages(): Promise<{ languages: string[] }>;
  getSupportedVoices(): Promise<{ voices: SpeechSynthesisVoice[] }>;
  openInstall(): Promise<void>;
  setPitchRate(options: { pitchRate: number }): Promise<void>;
  setSpeechRate(options: { speechRate: number }): Promise<void>;
}

export interface TTSOptions {
  text: string;
  locale?: string;
  speechRate?: number;
  pitchRate?: number;
  volume?: number;
  voice?: number; // Web only
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
