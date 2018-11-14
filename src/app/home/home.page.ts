import { Component, OnInit, OnDestroy } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { File } from '@ionic-native/file/ngx';
import { Media } from '@ionic-native/media/ngx';

import { TextToSpeech, TextToSpeechService } from '../core/text-to-speech/text-to-speech.service';
import { SpeechRecognition, SpeechRecognitionService } from '../core/speech-recognition/speech-recognition.service';

import { ErrorHandlerService } from '../core/error-handler/error-handler.service';
import { interval, Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';

import { PlayerRecorder } from '../core/player-recorder/player-recorder';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
})
export class HomePage extends PlayerRecorder implements OnInit, OnDestroy {
  text: string;
  code: string;
  countdown = 0;

  customPopoverOptions: any = {
    header: 'Language',
    subHeader: 'Select language',
    message: 'Only select the language both parties understand'
  };

  constructor(
    public loadingController: LoadingController,
    private _errorHandler: ErrorHandlerService,
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

  startCountdown(countdown: number): Promise<number> {
    return new Promise(resolve => {
      this.countdown = countdown;
      const duration = interval(1000);
      const unsubscriber$: Subject<void> = new Subject<void>();
      duration.pipe(takeUntil(unsubscriber$)).subscribe(
        val => {
          this.countdown--;
          if (!this.countdown) {
            this.stop();
            unsubscriber$.next();
            resolve(val);
          }
        }
      );
    });
  }

  async processText() {
    try {
      this.presentLoading();
      const speech: TextToSpeech = await this.textToSpeech(this.text, this.code);
      await this.play(speech.data);
      this.dismissLoading();
    } catch (err) {
      this.dismissLoading();
      this._errorHandler.showToast(err);
    }
  }

  async handleRecord() {
    try {
      this.presentLoading();
      await this.record();
      await this.startCountdown(5);
      const text: SpeechRecognition = await this.speechRecognition(this.code);
      this.text = text.data;
      this.dismissLoading();
    } catch (err) {
      this.dismissLoading();
      this._errorHandler.showToast(err);
    }
  }

  ngOnInit(): void { }

  ngOnDestroy(): void { }
}
