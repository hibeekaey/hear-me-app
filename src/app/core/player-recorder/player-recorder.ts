import { File } from '@ionic-native/file/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';

import { TextToSpeech, TextToSpeechService } from '../text-to-speech/text-to-speech.service';
import { SpeechRecognition, SpeechRecognitionService } from '../speech-recognition/speech-recognition.service';

import { Player } from './player';
import { Recorder } from './recorder';

export class PlayerRecorder implements Player, Recorder {
  audio: MediaObject;
  audioFile = 'audio.amr';

  constructor(
    public file: File,
    public media: Media,
    public _textToSpeechService: TextToSpeechService,
    public _speechRecognitionService: SpeechRecognitionService
  ) {}

  play: (speech: string) => Promise<number>;
  record: () => Promise<number>;
  stop: () => void;

  textToSpeech: (text: string, code: string) => Promise<TextToSpeech>;
  speechRecognition: (code: string) => Promise<SpeechRecognition>;
}
applyMixins(PlayerRecorder, [Player, Recorder]);

function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
        derivedCtor.prototype[name] = baseCtor.prototype[name];
    });
  });
}
