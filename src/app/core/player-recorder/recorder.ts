import { File } from '@ionic-native/file/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';

import { SpeechRecognition, SpeechRecognitionService } from '../speech-recognition/speech-recognition.service';
import { throwError } from 'rxjs';

export class Recorder {
  audio: MediaObject;
  audioFile: string;

  constructor(
    public file: File,
    public media: Media,
    public _speechRecognitionService: SpeechRecognitionService
  ) {}

  record(): Promise<number> {
    return new Promise(resolve => {
      this.file.createFile(this.file.externalCacheDirectory, this.audioFile, true).then(() => {
        this.audio = this.media.create(`${this.file.externalCacheDirectory.replace(/^file:\/\//, '')}${this.audioFile}`);
        this.audio.startRecord();
        resolve(1);
      });
    });
  }

  stop(): void {
    if (this.audio) {
      this.audio.stopRecord();
      this.audio.release();
    }
  }

  async speechRecognition(code: string): Promise<object> {
    const audioBytes = await this.file.readAsDataURL(this.file.externalCacheDirectory, this.audioFile);
    const payload = { voice: audioBytes.split(',')[1], language: code };
    return new Promise((resolve, reject) => {
      this._speechRecognitionService.process(payload).subscribe(
        (data: SpeechRecognition) => {
          resolve(data);
        }, error => {
          console.log('Speech recognition operation failed.');
          reject(throwError(error));
        }
      );
    });
  }
}
