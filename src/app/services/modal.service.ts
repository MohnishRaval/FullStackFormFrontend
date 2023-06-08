import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ModalService {
  private renderer: Renderer2;
  private modalSubject = new BehaviorSubject<{ display: string }>({
    display: 'none',
  });
  public modalStatus$ = this.modalSubject as Observable<{ display: string }>;
  constructor(private rendererFactory2: RendererFactory2) {
    this.renderer = this.rendererFactory2.createRenderer(null, null);
  }

  openModal() {
    return this.modalSubject.next({ display: 'block' });
  }

  closeModal() {
    return this.modalSubject.next({ display: 'none' });
  }
}
