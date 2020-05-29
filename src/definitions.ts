declare module "@capacitor/core" {
  interface PluginRegistry {
    TextToSpeech: TextToSpeechPlugin;
  }
}

export interface TextToSpeechPlugin {
  speak(options: TTSOptions): Promise<void>;
  speak(text: string): Promise<void>;
  stop(): Promise<void>;
  checkLanguage(): Promise<string>;
  openInstall(): Promise<void>;
}

export interface TTSOptions {
  text: string;
  locale?: string;
  rate?: number;
  category?: string;
}