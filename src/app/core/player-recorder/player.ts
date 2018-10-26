import { LoadingController } from '@ionic/angular';

import { Media, MediaObject } from '@ionic-native/media/ngx';

import { TextToSpeech, TextToSpeechService } from '../text-to-speech/text-to-speech.service';
import { throwError } from 'rxjs';
import { retryWhen, delayWhen} from 'rxjs/operators';

export class Player {
  constructor(
    public loadingController: LoadingController,
    public media: Media,
    public _textToSpeechService: TextToSpeechService
  ) {}

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Hello',
      duration: 2000
    });
    return await loading.present();
  }

  play(data): void {
    const audio: MediaObject = this.media.create(data);
    audio.play();
  }

  textToSpeech(text, code) {
    const payload = { text: text, language: code };
    return new Promise((resolve, reject) => {
      this._textToSpeechService.process(payload).subscribe(
        (data: TextToSpeech) => {
          resolve(data.data);
        },
        error => {
          console.log('Text-to-Speech operation failed.');
          reject(throwError(error));
        }
      );
    });
  }
}
