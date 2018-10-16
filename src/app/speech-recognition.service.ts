import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

const httpOptions = {
  headers: new HttpHeaders({ 'Content-Type': 'application/json' })
};

@Injectable({
  providedIn: 'root'
})
export class SpeechRecognitionService {

  constructor(private http: HttpClient) { }

  process(data) {
    return this.http.post('http://localhost:8080/speech', data, httpOptions);
  }
}
