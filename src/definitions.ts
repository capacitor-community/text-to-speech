export interface TextToSpeechPlugin {
  echo(options: { value: string }): Promise<{ value: string }>;
}
