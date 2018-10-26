import { LoadingController } from '@ionic/angular';

import { File } from '@ionic-native/file/ngx';
import { Media } from '@ionic-native/media/ngx';

import { TextToSpeechService } from '../text-to-speech/text-to-speech.service';
import { SpeechRecognitionService } from '../speech-recognition/speech-recognition.service';

import { Player } from './player';
import { Recorder } from './recorder';

export class PlayerRecorder implements Player, Recorder {
  audioFile: string;

  constructor(
    public loadingController: LoadingController,
    public file: File,
    public media: Media,
    public _textToSpeechService: TextToSpeechService,
    public _speechRecognitionService: SpeechRecognitionService
  ) {}

  presentLoading: () => any;

  play: (speech) => void;
  record: () => void;

  textToSpeech: (text, code) => any;
  speechRecognition: (code) => any;
}
applyMixins(PlayerRecorder, [Player, Recorder]);

function applyMixins(derivedCtor: any, baseCtors: any[]) {
  baseCtors.forEach(baseCtor => {
    Object.getOwnPropertyNames(baseCtor.prototype).forEach(name => {
        derivedCtor.prototype[name] = baseCtor.prototype[name];
    });
  });
}
