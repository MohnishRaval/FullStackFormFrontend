import { Injectable, TemplateRef } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private modalSubject = new BehaviorSubject<{
    display: string;
    header: string;
    body: TemplateRef<any>;
  }>({
    display: 'none',
    header: '',
    body: null as any,
  });
  public modalContent$ = this.modalSubject as Observable<{
    display: string;
    header: string;
    body: TemplateRef<any>;
  }>;

  constructor() {}

  openModal(header: string, body: TemplateRef<any>) {
    return this.modalSubject.next({ display: 'block', header, body });
  }

  closeModal() {
    return this.modalSubject.next({
      display: 'none',
      header: '',
      body: null as any,
    });
  }
}
