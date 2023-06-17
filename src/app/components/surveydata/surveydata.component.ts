import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { CellClickedEvent, ColDef, GridReadyEvent } from 'ag-grid-community';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';
@Component({
  selector: 'app-surveydata',
  templateUrl: './surveydata.component.html',
  styleUrls: ['./surveydata.component.scss'],
})
export class SurveydataComponent implements OnInit, OnDestroy {
  surveyDataSubscriptions: Subscription[] = [];
  @ViewChild('dynamicContent') dynamicContent!: TemplateRef<any>;

  columnDefs: ColDef[] = [
    { field: 'FirstName' },
    { field: 'LastName' },
    { field: 'SurveyResult' },
    { field: 'SurveyDate' },
  ];

  rowData = [
    {
      FirstName: 'Mohnish',
      LastName: 'Celica',
      SurveyResult: 35000,
      SurveyDate: '06-12-2023',
    },
    {
      FirstName: 'Toyota',
      LastName: 'Celica',
      SurveyResult: 35000,
      SurveyDate: '06-12-2023',
    },
    {
      FirstName: 'Toyota',
      LastName: 'Celica',
      SurveyResult: 35000,
      SurveyDate: '06-12-2023',
    },
  ];
  constructor(
    private modalService: ModalService,
    private dataService: DataService
  ) {}

  ngOnInit(): void {}

  displayFormDetails() {
    const displayFormDataSub = this.dataService
      .fetchFormDetails()
      .subscribe((formdata) => {
        console.log(formdata);
      });
    this.surveyDataSubscriptions.push(displayFormDataSub);
  }

  openModal() {
    this.modalService.openModal('SurveyData', this.dynamicContent);
  }

  ngOnDestroy(): void {
    this.surveyDataSubscriptions.forEach((subi) => subi.unsubscribe());
  }
}
