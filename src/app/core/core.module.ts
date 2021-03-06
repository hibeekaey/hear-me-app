import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { File } from '@ionic-native/file/ngx';
import { Media } from '@ionic-native/media/ngx';

import { TextToSpeechService } from './text-to-speech/text-to-speech.service';
import { SpeechRecognitionService } from './speech-recognition/speech-recognition.service';
import { ErrorHandlerService } from './error-handler/error-handler.service';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    HttpClientModule
  ],
  declarations: [],
  providers: [
    File,
    Media,
    TextToSpeechService,
    SpeechRecognitionService,
    ErrorHandlerService
  ],
  exports: [
    CommonModule,
    FormsModule
  ]
})
export class CoreModule { }
