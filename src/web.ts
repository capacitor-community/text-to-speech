import { WebPlugin } from '@capacitor/core';
import {
  TextToSpeechPlugin,
  TTSSpeakOptions,
  SpeechSynthesisVoice,
  TTSPitchOptions,
  TTSRateOptions,
  TTSVoices,
  TTSLanguages,
} from './definitions';

export class TextToSpeechWeb extends WebPlugin implements TextToSpeechPlugin {
  private speechSynthesis: SpeechSynthesis | null;
  private currentlyActive = false;

  constructor() {
    super({
      name: 'TextToSpeech',
      platforms: ['web'],
    });
    this.speechSynthesis = this.getSpeechSynthesis();
  }

  public async speak(options: TTSSpeakOptions): Promise<void> {
    const speechSynthesis = this.speechSynthesis;
    if (!speechSynthesis) {
      this.throwUnsupportedError();
    }
    if (this.currentlyActive) {
      return;
    }
    this.currentlyActive = true;
    const utterance = await this.createSpeechSynthesisUtterance(options);
    return new Promise((resolve, reject) => {
      utterance.onend = () => {
        this.currentlyActive = false;
        resolve();
      };
      utterance.onerror = (event: any) => {
        this.currentlyActive = false;
        reject(event);
      };
      speechSynthesis.speak(utterance);
    });
  }

  public async stop(): Promise<void> {
    if (!this.speechSynthesis) {
      this.throwUnsupportedError();
    }
    this.speechSynthesis.cancel();
  }

  public async getSupportedLanguages(): Promise<TTSLanguages> {
    const voices = this.getSpeechSynthesisVoices();
    const languages = voices.map(voice => voice.lang);
    return { languages };
  }

  public async getSupportedVoices(): Promise<TTSVoices> {
    const voices = this.getSpeechSynthesisVoices();
    return { voices };
  }

  public async openInstall(): Promise<void> {
    throw new Error('Not implemented on web.');
  }

  public async setPitch(_options: TTSPitchOptions): Promise<void> {
    throw new Error('Not implemented on web.');
  }

  public async setRate(_options: TTSRateOptions): Promise<void> {
    throw new Error('Not implemented on web.');
  }

  private throwUnsupportedError(): never {
    throw new Error('Not supported on this device.');
  }

  private getSpeechSynthesis(): SpeechSynthesis | null {
    if ('speechSynthesis' in window) {
      return window.speechSynthesis;
    }
    return null;
  }

  private getSpeechSynthesisVoices(): SpeechSynthesisVoice[] {
    if (!this.speechSynthesis) {
      this.throwUnsupportedError();
    }
    return this.speechSynthesis.getVoices();
  }

  private async createSpeechSynthesisUtterance(
    options: TTSSpeakOptions,
  ): Promise<SpeechSynthesisUtterance> {
    const utterance = new SpeechSynthesisUtterance();
    const voices = this.getSpeechSynthesisVoices();
    const { text, locale, speechRate, volume, voice, pitchRate } = options;
    if (voice) {
      utterance.voice = voices[voice];
    }
    if (volume) {
      utterance.volume = volume >= 0 && volume <= 1 ? volume : 1;
    }
    if (speechRate) {
      utterance.rate = speechRate >= 0.1 && speechRate <=10 ? speechRate : 1;
    }
    if (pitchRate) {
      utterance.pitch = pitchRate >= 0 && pitchRate <= 2 ? pitchRate : 2;
    }
    if (locale) {
      utterance.lang = locale;
    }
    utterance.text = text;
    return utterance;
  }
}

const TextToSpeech = new TextToSpeechWeb();

export { TextToSpeech };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(TextToSpeech);
