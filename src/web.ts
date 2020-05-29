import { WebPlugin } from '@capacitor/core';
import { TextToSpeechPlugin } from './definitions';

export class TextToSpeechWeb extends WebPlugin implements TextToSpeechPlugin {
  constructor() {
    super({
      name: 'TextToSpeech',
      platforms: ['web']
    });
  }

  async echo(options: { value: string }): Promise<{value: string}> {
    console.log('ECHO', options);
    return options;
  }
}

const TextToSpeech = new TextToSpeechWeb();

export { TextToSpeech };

import { registerWebPlugin } from '@capacitor/core';
registerWebPlugin(TextToSpeech);
