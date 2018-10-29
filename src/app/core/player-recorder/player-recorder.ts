import { File } from '@ionic-native/file/ngx';
import { Media } from '@ionic-native/media/ngx';

import { TextToSpeech, TextToSpeechService } from '../text-to-speech/text-to-speech.service';
import { SpeechRecognition, SpeechRecognitionService } from '../speech-recognition/speech-recognition.service';

import { Player } from './player';
import { Recorder } from './recorder';

export class PlayerRecorder implements Player, Recorder {
  audioFile: string;

  constructor(
    public file: File,
    public media: Media,
    public _textToSpeechService: TextToSpeechService,
    public _speechRecognitionService: SpeechRecognitionService
  ) {}

  play: (speech) => Promise<number>;
  record: () => void;

  textToSpeech: (text, code) => Promise<TextToSpeech>;
  speechRecognition: (code) => Promise<SpeechRecognition>;
}
applyMixins(PlayerRecorder, [Player, Recorder]);

function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
        derivedCtor.prototype[name] = baseCtor.prototype[name];
    });
  });
}
