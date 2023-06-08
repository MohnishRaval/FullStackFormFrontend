import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ModalService } from 'src/app/services/modal.service';

@Component({
  selector: 'app-shared-modal',
  templateUrl: './shared-modal.component.html',
  styleUrls: ['./shared-modal.component.scss'],
})
export class SharedModalComponent implements OnInit, OnDestroy {
  display = 'none';
  modalSubscription = new Subscription();
  constructor(private modalService: ModalService) {}

  ngOnInit(): void {
    this.modalService.modalStatus$.subscribe(
      (currentStatus: { display: string }) => {
        this.display = currentStatus.display;
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
