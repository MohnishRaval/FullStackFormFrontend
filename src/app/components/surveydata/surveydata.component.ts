import {
  AfterContentInit,
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
@Component({
  selector: 'app-surveydata',
  templateUrl: './surveydata.component.html',
  styleUrls: ['./surveydata.component.scss'],
})
export class SurveydataComponent implements OnInit {
  constructor(private modalService: ModalService) {}

  ngOnInit(): void {}

  openModal() {
    this.modalService.openModal();
  }
}
