
import { Plugins } from '@capacitor/core';
import { TextToSpeechPlugin, TTSOptions } from './definitions';

const { TextToSpeech: TTS } = Plugins;

export class TextToSpeech implements TextToSpeechPlugin {

    speak(options: TTSOptions): Promise<void> {
        return TTS.speak(options);
    }

    stop(): Promise<void> {
        return TTS.stop();
    }

    getSupportedLanguages(): Promise<string> {
        return TTS.getSupportedLanguages();
    }

    openInstall(): Promise<void> {
        return TTS.openInstall();
    }

    setPitchRate(options: { pitchRate: number; }): Promise<void> {
        return TTS.setPitchRate(options);
    }

    setSpeechRate(options: { speechRate: number; }): Promise<void> {
        return TTS.setSpeechRate(options);
    }

}