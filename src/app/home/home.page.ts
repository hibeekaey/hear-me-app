import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingController } from '@ionic/angular';
import { Toast } from '@ionic-native/toast/ngx';

import { File } from '@ionic-native/file/ngx';
import { Media } from '@ionic-native/media/ngx';

import { TextToSpeech, TextToSpeechService } from '../core/text-to-speech/text-to-speech.service';
import { SpeechRecognition, SpeechRecognitionService } from '../core/speech-recognition/speech-recognition.service';

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
    super(file, media, _textToSpeechService, _speechRecognitionService);
  }

  async presentLoading(): Promise<void> {
    const loading: HTMLIonLoadingElement = await this.loadingController.create({
      keyboardClose: true
    });
    return await loading.present();
  }

  async dismissLoading(): Promise<void> {
    const loading: HTMLIonLoadingElement = await this.loadingController.getTop();
    return await loading.dismiss();
  }

  clearText(): void {
    this.text = '';
  }

  async processText() {
    try {
      this.presentLoading();
      const speech: TextToSpeech = await this.textToSpeech(this.text, this.code);
      await this.play(speech.data);
      this.dismissLoading();
    } catch (err) {
      this.dismissLoading();
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
