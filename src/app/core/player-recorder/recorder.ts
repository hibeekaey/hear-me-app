import { LoadingController } from '@ionic/angular';

import { File } from '@ionic-native/file/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';

import { SpeechRecognition, SpeechRecognitionService } from '../speech-recognition/speech-recognition.service';
import { throwError } from 'rxjs';

export class Recorder {
  audioFile = 'audio.amr';

  constructor(
    public loadingController: LoadingController,
    public file: File,
    public media: Media,
    public _speechRecognitionService: SpeechRecognitionService
  ) {}

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Hello',
      duration: 2000
    });
    return await loading.present();
  }

  record(): void {
    // create audio output file
    this.file.createFile(this.file.externalCacheDirectory, this.audioFile, true).then(() => {
      const audio: MediaObject = this.media.create(`${this.file.externalCacheDirectory.replace(/^file:\/\//, '')}${this.audioFile}`);
      audio.startRecord();
    });
  }

  speechRecognition(code) {
    this.file.readAsDataURL(this.file.externalCacheDirectory, this.audioFile).then(audioBytes => {
      const payload = { voice: audioBytes.split(',')[1], language: code };
      return new Promise((resolve, reject) => {
        this._speechRecognitionService.process(payload).subscribe(
          (data: SpeechRecognition) => {
            resolve(data.data);
          },
          error => {
            console.log('Speech recognition operation failed.');
            reject(throwError(error));
          }
        );
      });
    });
  }
}
