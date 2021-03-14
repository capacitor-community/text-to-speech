import { registerPlugin } from '@capacitor/core';

import type { TextToSpeechPlugin } from './definitions';

const TextToSpeech = registerPlugin<TextToSpeechPlugin>('TextToSpeech', {
  web: () => import('./web').then(m => new m.TextToSpeechWeb()),
});

// Warm up
if ('speechSynthesis' in window) {
  window.speechSynthesis;
}

export * from './definitions';
export { TextToSpeech };
