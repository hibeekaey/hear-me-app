import { File } from '@ionic-native/file/ngx';
import { Media, MediaObject } from '@ionic-native/media/ngx';

import { SpeechRecognition, SpeechRecognitionService } from '../speech-recognition/speech-recognition.service';
import { throwError, Subject } from 'rxjs';
import { retryWhen, delayWhen, takeUntil } from 'rxjs/operators';

export class Recorder {
  audioFile = 'audio.amr';

  constructor(
    public file: File,
    public media: Media,
    public _speechRecognitionService: SpeechRecognitionService
  ) {}

  record(): void {
    // create audio output file
    this.file.createFile(this.file.externalCacheDirectory, this.audioFile, true).then(() => {
      const audio: MediaObject = this.media.create(`${this.file.externalCacheDirectory.replace(/^file:\/\//, '')}${this.audioFile}`);
      audio.startRecord();
    });
  }

  async speechRecognition(code): Promise<object> {
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
