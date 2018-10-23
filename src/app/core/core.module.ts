import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { File } from '@ionic-native/file/ngx';
import { Media } from '@ionic-native/media/ngx';

import { TextToSpeechService } from './text-to-speech.service';
import { SpeechRecognitionService } from './speech-recognition.service';

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
    SpeechRecognitionService
  ],
  exports: [
    CommonModule,
    FormsModule
  ]
})
export class CoreModule { }
