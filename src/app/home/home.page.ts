import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Toast } from '@ionic-native/toast/ngx';

import { File } from '@ionic-native/file/ngx';
import { Media } from '@ionic-native/media/ngx';

import { TextToSpeechService } from '../core/text-to-speech/text-to-speech.service';
import { SpeechRecognitionService } from '../core/speech-recognition/speech-recognition.service';

import { PlayerRecorder } from '../core/player-recorder/player-recorder';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage extends PlayerRecorder implements OnInit, OnDestroy {
  text: string;
  code: string;

  customPopoverOptions: any = {
    header: 'Language',
    subHeader: 'Select language',
    message: 'Only select the language both parties understand'
  };

  constructor(
    public loadingController: LoadingController,
    private toast: Toast,
    public file: File,
    public media: Media,
    public _textToSpeechService: TextToSpeechService,
    public _speechRecognitionService: SpeechRecognitionService
  ) {
    super(loadingController, file, media, _textToSpeechService, _speechRecognitionService);
  }

  clearText(): void {
    this.text = '';
  }

  async processText() {
    try {
      const speech = await this.textToSpeech(this.text, this.code);
      this.play(speech);
    } catch (err) {
      err.subscribe({
        error: val => {
          this.toast.showShortBottom(val.error.message).subscribe(
            toast => {
              console.log(toast);
            }
          );
        }
      });
    }
  }

  handleRecord(): void { }

  ngOnInit(): void { }

  ngOnDestroy(): void { }
}
