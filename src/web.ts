import { WebPlugin } from '@capacitor/core';

import type { TextToSpeechPlugin } from './definitions';

export class TextToSpeechWeb extends WebPlugin implements TextToSpeechPlugin {
  async echo(options: { value: string }): Promise<{ value: string }> {
    console.log('ECHO', options);
    return options;
  }
}
