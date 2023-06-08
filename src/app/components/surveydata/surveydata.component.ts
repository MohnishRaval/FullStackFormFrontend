import { Component, OnInit, TemplateRef, ViewChild } from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
@Component({
  selector: 'app-surveydata',
  templateUrl: './surveydata.component.html',
  styleUrls: ['./surveydata.component.scss'],
})
export class SurveydataComponent implements OnInit {
  @ViewChild('dynamicContent') dynamicContent!: TemplateRef<any>;

  columnDefs: ColDef[] = [
    { field: 'make' },
    { field: 'model' },
    { field: 'price' },
  ];

  rowData = [
    { make: 'Toyota', model: 'Celica', price: 35000 },
    { make: 'Ford', model: 'Mondeo', price: 32000 },
    { make: 'Porsche', model: 'Boxster', price: 72000 },
  ];
  constructor(private modalService: ModalService) {}

  ngOnInit(): void {}

  openModal() {
    this.modalService.openModal('SurveyData', this.dynamicContent);
  }
}
