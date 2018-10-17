import { Component } from '@angular/core';
import { TextToSpeechService } from '../text-to-speech.service';
import { SpeechRecognitionService } from '../speech-recognition.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  public text: string;
  public code: string;

  customPopoverOptions: any = {
    header: 'Language',
    subHeader: 'Select language',
    message: 'Only select the language both parties understand'
  };

  constructor(
    private _textToSpeechService: TextToSpeechService,
    private _speechRecognitionService: SpeechRecognitionService
  ) { }

  clearText() {
    this.text = '';
  }

  textToSpeech() {
    const payload = { text: this.text, language: this.code };

    this._textToSpeechService.process(payload).subscribe(
      data => {
        // play audio
        return true;
      },
      error => {
        console.log('Text-to-Speech operation failed.');
        return throwError(error);
      }
    );
  }

  speechRecognition(audio) {
    // record audio for 10 secs
    const payload = { audio: audio };

    this._speechRecognitionService.process(payload).subscribe(
      data => {
        console.log(data);
        return true;
      },
      error => {
        console.log('Speech recognition operation failed.');
        return throwError(error);
      }
    );
  }
}
