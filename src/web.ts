import { WebPlugin } from "@capacitor/core";
import {
  TextToSpeechPlugin,
  TTSOptions,
  SpeechSynthesisVoice,
} from "./definitions";

export class TextToSpeechWeb extends WebPlugin implements TextToSpeechPlugin {
  private speechSynthesizer: any;
  private activeUtterance: any;
  private notSupportedMessage =
    "Speech Synthesizer is not yet initialized or supported.";

  private supportedVoices: SpeechSynthesisVoice[] = [];

  constructor() {
    super({
      name: "TextToSpeech",
      platforms: ["web"],
    });

    if (!this.speechSynthesizer && window && window.speechSynthesis) {
      this.speechSynthesizer = window.speechSynthesis;
    }
  }
  speak(options: TTSOptions): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.speechSynthesizer) {
        reject(this.notSupportedMessage);
        return;
      }

      if (!options) {
        reject("No options were provided.");
        return;
      }

      if (!options.text) {
        reject("Text option was not provided");
        return;
      }

      const { text, locale, speechRate, volume, voice, pitchRate } = options;

      if (!this.activeUtterance) {
        this.activeUtterance = new SpeechSynthesisUtterance();
        this.supportedVoices = window.speechSynthesis.getVoices();
        this.activeUtterance.voice = this.supportedVoices[voice];
        this.activeUtterance.rate =
          speechRate >= 0.1 && speechRate <= 10 ? speechRate : 1;
        this.activeUtterance.volume = volume >= 0 && volume <= 1 ? volume : 1;
        this.activeUtterance.text = text;
        this.activeUtterance.lang = locale;
        this.activeUtterance.pitch =
          pitchRate >= 0 && pitchRate <= 2 ? pitchRate : 2;
        if (voice) {
          this.activeUtterance.voice = voice;
        }
        this.activeUtterance.onend = (ev: any) => {
          resolve(ev);
          this.activeUtterance = undefined;
        };
        this.activeUtterance.onerror = (ev: any) => {
          reject(ev);
          this.activeUtterance = undefined;
        };

        this.speechSynthesizer.speak(this.activeUtterance);
      }
    });
  }

  stop(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (!this.speechSynthesizer) {
        reject(this.notSupportedMessage);
        return;
      }

      this.speechSynthesizer.cancel();
      resolve();
    });
  }

  getSupportedLanguages(): Promise<{ languages: any }> {
    return new Promise((resolve, reject) => {
      if (!this.speechSynthesizer) {
        reject(this.notSupportedMessage);
        return;
      }

      resolve();
    });
  }

  getSupportedVoices(): Promise<{ voices: SpeechSynthesisVoice[] }> {
    return new Promise((resolve, reject) => {
      if (!this.speechSynthesizer) {
        reject(this.notSupportedMessage);
        return;
      }

      this.supportedVoices = window.speechSynthesis.getVoices();
      resolve({
        voices: this.supportedVoices,
      });
    });
  }

  openInstall(): Promise<void> {
    throw new Error("Method not implemented.");
  }

  setPitchRate(_options: { pitchRate: number }): Promise<void> {
    // Pitch rate cannot be set while engine is active
    throw new Error("Method not implemented.");
  }

  setSpeechRate(_options: { speechRate: number }): Promise<void> {
    // Speech rate cannot be set while engine is active
    throw new Error("Method not implemented.");
  }
}

const TextToSpeech = new TextToSpeechWeb();

export { TextToSpeech };

import { registerWebPlugin } from "@capacitor/core";
registerWebPlugin(TextToSpeech);
