import { Media, MediaObject } from '@ionic-native/media/ngx';

import { TextToSpeech, TextToSpeechService } from '../text-to-speech/text-to-speech.service';
import { interval, throwError, Subject } from 'rxjs';
import { retryWhen, delayWhen, takeUntil } from 'rxjs/operators';

export class Player {
  constructor(
    public media: Media,
    public _textToSpeechService: TextToSpeechService
  ) {}

  play(data): Promise<number> {
    const audio: MediaObject = this.media.create(data);
    const duration = interval(700);
    const unsubscriber$: Subject<void> = new Subject<void>();
    let previousPosition = 0;
    audio.play();
    return new Promise(resolve => {
      duration.pipe(takeUntil(unsubscriber$)).subscribe(
        val => {
          audio.getCurrentPosition().then(position => {
            if (previousPosition === position) {
              unsubscriber$.next();
              resolve(val);
            }
            previousPosition = position;
          });
        }
      );
    });
  }

  textToSpeech(text, code): Promise<object> {
    const payload = { text: text, language: code };
    return new Promise((resolve, reject) => {
      this._textToSpeechService.process(payload).subscribe(
        (data: TextToSpeech) => {
          resolve(data);
        },
        error => {
          console.log('Text-to-Speech operation failed.');
          reject(throwError(error));
        }
      );
    });
  }
}
