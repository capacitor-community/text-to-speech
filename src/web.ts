import { WebPlugin } from '@capacitor/core';

import type { TextToSpeechPlugin, TTSOptions } from './definitions';

export class TextToSpeechWeb extends WebPlugin implements TextToSpeechPlugin {
  private speechSynthesis: SpeechSynthesis | null = null;
  private supportedVoices: SpeechSynthesisVoice[] | undefined;

  constructor() {
    super();
    if ('speechSynthesis' in window) {
      this.speechSynthesis = window.speechSynthesis;
      window.addEventListener('beforeunload', () => {
        this.stop();
      });
    }
  }

  public async speak(options: TTSOptions): Promise<void> {
    if (!this.speechSynthesis) {
      this.throwUnsupportedError();
    }
    await this.stop();
    const speechSynthesis = this.speechSynthesis;
    const utterance = this.createSpeechSynthesisUtterance(options);
    return new Promise((resolve, reject) => {
      utterance.onend = () => {
        resolve();
      };
      utterance.onerror = (event: any) => {
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

  public async getSupportedLanguages(): Promise<{ languages: string[] }> {
    const voices = this.getSpeechSynthesisVoices();
    const languages = voices.map(voice => voice.lang);
    const filteredLanguages = languages.filter((v, i, a) => a.indexOf(v) == i);
    return { languages: filteredLanguages };
  }

  public async getSupportedVoices(): Promise<{
    voices: SpeechSynthesisVoice[];
  }> {
    const voices = this.getSpeechSynthesisVoices();
    return { voices };
  }

  public async isLanguageSupported(options: {
    lang: string;
  }): Promise<{ supported: boolean }> {
    const result = await this.getSupportedLanguages();
    const isLanguageSupported = result.languages.includes(options.lang);
    return { supported: isLanguageSupported };
  }

  public async openInstall(): Promise<void> {
    this.throwUnimplementedError();
  }

  private createSpeechSynthesisUtterance(
    options: TTSOptions,
  ): SpeechSynthesisUtterance {
    const voices = this.getSpeechSynthesisVoices();
    const utterance = new SpeechSynthesisUtterance();
    const { text, lang, rate, pitch, volume, voice } = options;
    if (voice) {
      utterance.voice = voices[voice];
    }
    if (volume) {
      utterance.volume = volume >= 0 && volume <= 1 ? volume : 1;
    }
    if (rate) {
      utterance.rate = rate >= 0.1 && rate <= 10 ? rate : 1;
    }
    if (pitch) {
      utterance.pitch = pitch >= 0 && pitch <= 2 ? pitch : 2;
    }
    if (lang) {
      utterance.lang = lang;
    }
    utterance.text = text;
    return utterance;
  }

  private getSpeechSynthesisVoices(): SpeechSynthesisVoice[] {
    if (!this.speechSynthesis) {
      this.throwUnsupportedError();
    }
    if (!this.supportedVoices || this.supportedVoices.length < 1) {
      this.supportedVoices = this.speechSynthesis.getVoices();
    }
    return this.supportedVoices;
  }

  private throwUnsupportedError(): never {
    throw this.unavailable(
      'SpeechSynthesis API not available in this browser.',
    );
  }

  private throwUnimplementedError(): never {
    throw this.unimplemented('Not implemented on web.');
  }
}
