import { Injectable } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';
import { BehaviorSubject, Observable, Subject, timer } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CustomspinnerService {
  spinnerTimeDuration = 1000;
  private spinnerTextSubject = new BehaviorSubject<string>('Loading ...');
  public spinnerData$ = this.spinnerTextSubject.asObservable();
  constructor(private spinner: NgxSpinnerService) {}

  show(spinnerText?: string, minimumShowTime?: number) {
    if (minimumShowTime) {
      this.spinnerTimeDuration = minimumShowTime;
    }
    spinnerText = spinnerText || 'Loading...';
    this.spinnerTextSubject.next(spinnerText);
    this.spinner.show();
  }

  hide() {
    if (this.spinnerTimeDuration) {
      setTimeout(() => {
        this.spinner.hide();
      }, this.spinnerTimeDuration);
    } else {
      this.spinner.hide();
    }
  }
}
