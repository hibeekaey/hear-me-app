import { Injectable } from '@angular/core';
import { Toast } from '@ionic-native/toast/ngx';

@Injectable({
  providedIn: 'root'
})
export class ErrorHandlerService {
  constructor(private toast: Toast) { }

  showToast(err): void {
    err.subscribe({
      error: val => {
        this.toast.showShortBottom(val.error.message).subscribe(
          toast => {
            console.log(toast.message);
          }
        );
      }
    });
  }
}
