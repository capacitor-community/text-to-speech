import { registerPlugin } from '@capacitor/core';

import type { TextToSpeechPlugin } from './definitions';

const TextToSpeech = registerPlugin<TextToSpeechPlugin>('TextToSpeech', {
  web: () => import('./web').then(m => new m.TextToSpeechWeb()),
});

export * from './definitions';
export { TextToSpeech };
