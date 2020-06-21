import { WebPlugin } from "@capacitor/core";
import { TextToSpeechPlugin, TTSOptions } from "./definitions";

export class TextToSpeechWeb extends WebPlugin implements TextToSpeechPlugin {
  constructor() {
    super({
      name: "TextToSpeech",
      platforms: ["web"],
    });
  }
  speak(options: TTSOptions): Promise<void> {
    console.warn(options);
    throw new Error("Method not implemented.");
  }

  stop(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  getSupportedLanguages(): Promise<string> {
    throw new Error("Method not implemented.");
  }

  openInstall(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  setPitchRate(options: { pitchRate: number }): Promise<void> {
    console.warn(options);
    throw new Error("Method not implemented.");
  }

  setSpeechRate(options: { speechRate: number }): Promise<void> {
    console.warn(options);
    throw new Error("Method not implemented.");
  }
}

const TextToSpeech = new TextToSpeechWeb();

export { TextToSpeech };

import { registerWebPlugin } from "@capacitor/core";
registerWebPlugin(TextToSpeech);
