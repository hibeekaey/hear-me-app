import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class TextToSpeechService {

  constructor(private http: HttpClient) { }

  process(data) {
    return this.http.post('https://hear-me-api.herokuapp.com/text', data, httpOptions);
  }
}
