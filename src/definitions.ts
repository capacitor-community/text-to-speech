declare module '@capacitor/core' {
  interface PluginRegistry {
    TextToSpeech: TextToSpeechPlugin;
  }
}

export interface TextToSpeechPlugin {
  speak(options: TTSOptions): Promise<void>;
  stop(): Promise<void>;
  getSupportedLanguages(): Promise<{ languages: any }>;
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

export interface SpeechSynthesisVoice {
  voiceURI: string;
  name: string;
  lang: string;
  localService: boolean;
  default: boolean;
}
