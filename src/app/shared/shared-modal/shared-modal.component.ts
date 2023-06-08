import { Component, OnDestroy, OnInit, TemplateRef } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-shared-modal',
  templateUrl: './shared-modal.component.html',
  styleUrls: ['./shared-modal.component.scss'],
})
export class SharedModalComponent implements OnInit, OnDestroy {
  display = 'none';
  header = '';
  body: TemplateRef<any> | null = null;
  modalSubscription = new Subscription();

  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.modalService.modalContent$.subscribe(
      (content: {
        display: string;
        header: string;
        body: TemplateRef<any>;
      }) => {
        this.display = content.display;
        this.header = content.header;
        this.body = content.body;
      }
    );
  }

  closeModal() {
    this.modalService.closeModal();
  }

  ngOnDestroy(): void {
    if (this.modalSubscription) {
      this.modalSubscription.unsubscribe();
    }
  }
}
