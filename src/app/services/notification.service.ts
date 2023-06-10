import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class NotificationService {
  private notifcationsArray: string[] = [];
  private notificationData = new Subject<string[]>();
  public showNotificationData$ = this.notificationData.asObservable();
  constructor() {}

  addNotification(notificationText: string) {
    this.notifcationsArray.push(notificationText);
    return this.notificationData.next(this.notifcationsArray);
  }

  // showNotifications() {
  //   return this.showNotificationData$;
  // }
}
