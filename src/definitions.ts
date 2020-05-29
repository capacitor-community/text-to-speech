declare module "@capacitor/core" {
  interface PluginRegistry {
    TextToSpeech: TextToSpeechPlugin;
  }
}

export interface TextToSpeechPlugin {
  speak(options: TTSOptions): Promise<void>;
  stop(): Promise<void>;
  getSupportedLanguages(): Promise<string>;
  openInstall(): Promise<void>;
  setPitchRate(options: { pitchRate: number; }): Promise<void>;
  setSpeechRate(options: { speechRate: number; }): Promise<void>;
}

export interface TTSOptions {
  text: string;
  locale?: string;
  rate?: number;
  category?: string;
}