import { Component } from '@angular/core';
import { LoadingController } from '@ionic/angular';

import { Media, MediaObject } from '@ionic-native/media/ngx';
import { File } from '@ionic-native/file/ngx';

import { TextToSpeech, TextToSpeechService } from '../core/text-to-speech.service';
import { SpeechRecognition, SpeechRecognitionService } from '../core/speech-recognition.service';
import { throwError } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss']
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
    public loadingController: LoadingController,
    private file: File,
    private media: Media,
    private _textToSpeechService: TextToSpeechService,
    private _speechRecognitionService: SpeechRecognitionService
  ) {}

  async presentLoading() {
    const loading = await this.loadingController.create({
      message: 'Hello',
      duration: 2000
    });
    return await loading.present();
  }

  async presentLoadingWithOptions() {
    const loading = await this.loadingController.create({
      spinner: 'hide',
      duration: 5000,
      message: 'Please wait...',
      translucent: true,
      cssClass: 'custom-class custom-loading'
    });
    return await loading.present();
  }

  clearText() {
    this.text = '';
  }

  startPlay() { }

  startRecord() { }

  stopRecord() { }

  textToSpeech() {
    const payload = { text: this.text, language: this.code };
    this._textToSpeechService.process(payload).subscribe(
      (data: TextToSpeech) => {
        const audio: MediaObject = this.media.create(data.data);
        audio.play();
        return true;
      },
      error => {
        console.log('Text-to-Speech operation failed.');
        return throwError(error);
      }
    );
  }

  speechRecognition() {
    // record audio for 10 secs
    this.file.createFile(this.file.externalCacheDirectory, 'audio.amr', true).then(() => {
      const audio = this.media.create(this.file.externalCacheDirectory.replace(/^file:\/\//, '') + 'audio.amr');
      audio.startRecord();
      window.setTimeout(() => {
        audio.stopRecord();
        this.file.readAsDataURL(this.file.externalCacheDirectory, 'audio.amr').then(audioBytes => {
          const payload = { voice: audioBytes.split(',')[1], language: this.code };
          this._speechRecognitionService.process(payload).subscribe(
            (data: SpeechRecognition) => {
              this.text = data.data;
              return true;
            },
            error => {
              console.log('Speech recognition operation failed.');
              return throwError(error);
            }
          );
        });
      }, 10000);
    });
  }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnInit() { }

  // tslint:disable-next-line:use-life-cycle-interface
  ngOnDestroy() { }
}
