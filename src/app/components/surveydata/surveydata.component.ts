import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import { ModalService } from 'src/app/services/modal.service';
import { ColDef, GridApi, GridReadyEvent } from 'ag-grid-community';
import { DataService } from 'src/app/services/data.service';
import { Subscription } from 'rxjs';
import { FormPostModel } from 'src/app/models/PostModel';
import { map } from 'rxjs/operators';
import { CustomspinnerService } from 'src/app/services/customspinner.service';
@Component({
  selector: 'app-surveydata',
  templateUrl: './surveydata.component.html',
  styleUrls: ['./surveydata.component.scss'],
})
export class SurveydataComponent implements OnInit, OnDestroy {
  surveyDataSubscriptions: Subscription[] = [];
  private gridApi!: GridApi;
  rowData: any = [];

  @ViewChild('dynamicContent') dynamicContent!: TemplateRef<any>;

  columnDefs: ColDef[] = [
    { field: 'firstName', headerName: 'First Name', width: 120 },
    { field: 'lastName', headerName: 'Last Name', width: 120 },
    { field: 'streetAddress', headerName: 'Address' },
    { field: 'city', headerName: 'City', width: 120 },
    { field: 'state', headerName: 'State', width: 80 },
    { field: 'zipCode', headerName: 'Zipcode', width: 100 },
    { field: 'phoneNumber', headerName: 'PhoneNumber', width: 130 },
    { field: 'email', headerName: 'Email', width: 150 },
    { field: 'date', headerName: 'Date', width: 120 },
    { field: 'recommendation', headerName: 'Recommendation' },
    { field: 'raffleNumbers', headerName: 'RaffleNumbers' },
    { field: 'won', headerName: 'Survey Result' },
  ];

  constructor(
    private modalService: ModalService,
    private dataService: DataService,
    private spinnerService: CustomspinnerService
  ) {}

  ngOnInit(): void {
    this.displayFormDetails();
  }

  onGridReady(params: GridReadyEvent) {
    this.gridApi = params.api;
    params.api.sizeColumnsToFit();
  }

  displayFormDetails() {
    this.spinnerService.show('Fetching Survey Form Details');
    const displayFormDataSub = this.dataService
      .fetchFormDetails()
      .pipe(
        map((formdata: Partial<FormPostModel>) => {
          return (formdata as any).map((object: any) => {
            const date = object.date.split('T')[0];
            return { ...object, date };
          });
        })
      )
      .subscribe(
        (updatedData: Partial<FormPostModel>[]) => {
          this.spinnerService.hide();
          this.rowData = updatedData;
          console.log(this.rowData);
        },
        (error) => {
          this.spinnerService.hide();
          console.log('Error occurred in displayingForm Data');
        }
      );
    this.surveyDataSubscriptions.push(displayFormDataSub);
  }

  openModal() {
    this.modalService.openModal('SurveyData', this.dynamicContent);
  }

  ngOnDestroy(): void {
    this.surveyDataSubscriptions.forEach((subi) => subi.unsubscribe());
  }
}
