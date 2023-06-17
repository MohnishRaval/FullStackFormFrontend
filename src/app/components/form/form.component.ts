import {
  Component,
  OnDestroy,
  OnInit,
  TemplateRef,
  ViewChild,
} from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { CustomspinnerService } from 'src/app/services/customspinner.service';
import { ModalService } from 'src/app/services/modal.service';
import { NotificationService } from 'src/app/services/notification.service';
import { FormPostModel } from '../../models/PostModel';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
  @ViewChild('submitModal') submitModal!: TemplateRef<any>;
  surveyForm: FormGroup;
  surveyFormChanges: Subscription;
  mainValid: boolean = false;
  campusLiking = [
    { name: 'students', value: 'students' },
    { name: 'location', value: 'location' },
    { name: 'campus', value: 'campus' },
    { name: 'atmosphere', value: 'atmosphere' },
    { name: 'dormRooms', value: 'dormRooms' },
    { name: 'sports', value: 'sports' },
  ];

  constructor(
    private fb: FormBuilder,
    private modalService: ModalService,
    private spinner: CustomspinnerService,
    private notificationService: NotificationService,
    private toastr: ToastrService,
    private dataService: DataService
  ) {
    this.surveyFormChanges = new Subscription();
    const currentDate = new Date();
    this.surveyForm = this.fb.group({
      firstName: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]+'),
      ]),
      lastName: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]+'),
      ]),
      address: new FormControl('', [Validators.required]),
      city: new FormControl('', [
        Validators.required,
        Validators.pattern('[a-zA-Z ]+'),
      ]),
      state: new FormControl('', [Validators.required]),
      zipCode: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{5}'),
      ]),
      phone: new FormControl('', [
        Validators.required,
        Validators.pattern('[0-9]{3}-[0-9]{3}-[0-9]{4}'),
      ]),
      email: new FormControl('', [Validators.required, Validators.email]),
      date: new FormControl(currentDate.toISOString().split('T')[0], [
        Validators.required,
      ]),
      campusLikingArray: new FormArray([]),
      likelihood: new FormControl(''),
      raffleNumbers: new FormControl('', [this.raffleFieldValidator]),
    });

    this.addCheckboxes();
  }

  ngOnInit(): void {
    this.surveyFormChanges = this.surveyForm.valueChanges
      .pipe(debounceTime(1000))
      .subscribe((valueChanges) => {
        console.log(valueChanges);
        // setTimeout(() => {
        //   console.log(valueChanges);
        // }, 1000);
      });

    // this.toastr.success('Success', 'Form Submiited', {
    //   progressBar: true,
    // });
  }

  get campusLikingFormArray() {
    return this.surveyForm.controls.campusLikingArray as FormArray;
  }
  private addCheckboxes() {
    this.campusLiking.forEach(() =>
      this.campusLikingFormArray.push(new FormControl(false))
    );
  }

  raffleFieldValidator = (
    control: AbstractControl
  ): { [key: string]: any } | null => {
    const value = control.value || false;
    if (value) {
      const numbers = value.split(',').map((num: string) => num.trim());
      const isValid = numbers.every((num: string) => {
        const parsed = parseInt(num, 10);
        return !isNaN(parsed) && parsed >= 1 && parsed <= 100;
      });
      this.mainValid = isValid;
    } else {
      this.mainValid = false;
    }
    return this.mainValid ? null : { invalidRaffleNumbers: true };
  };

  formHandler = (
    formControlName: string
  ): {
    success: boolean;
    error: boolean;
    displayError: boolean;
  } => {
    const currentControl = this.surveyForm.get(formControlName)!;
    const success =
      currentControl?.valid &&
      (currentControl?.dirty || currentControl?.untouched);

    const error =
      currentControl?.invalid &&
      (currentControl?.dirty || currentControl?.untouched);

    const displayError = false;
    return { success, error, displayError };
  };

  resetForm = () => {
    this.spinner.show('Resetting From Data', 2000);
    const checkedBox = this.surveyForm.get('campusLikingArray') as FormArray;
    checkedBox.controls.forEach((control) => {
      control.setValue(false);
      control.markAsUntouched();
    });
    this.spinner.hide();
    this.surveyForm.reset();
  };

  submitForm = (): void => {
    const selectedCheckBoxes = this.surveyForm.value.campusLikingArray
      .map((checked: any, index: any) =>
        checked ? this.campusLiking[index].value : null
      )
      .filter((value: any) => value != null);

    const formModelPartial: Partial<FormPostModel> = {
      firstName: this.surveyForm.value.firstName,
      lastName: this.surveyForm.value.lastName,
      streetAddress: this.surveyForm.value.address,
      city: this.surveyForm.value.city,
      state: this.surveyForm.value.state,
      zipCode: this.surveyForm.value.zipCode,
      phoneNumber: this.surveyForm.value.phone,
      email: this.surveyForm.value.email,
      date: this.surveyForm.value.date,
      campusLikingArray: selectedCheckBoxes,
      recommendation: this.surveyForm.value.likelihood,
      raffleNumbers: this.surveyForm.value.raffleNumbers,
      won: false,
      optionStudent: true,
    };
    const formModel = new FormPostModel(formModelPartial);
    console.log('formModel=', formModel);
    if (this.surveyForm.valid) {
      this.dataService.saveFormDetails(formModel).subscribe((formResponse) => {
        console.log(formResponse);
      });
      this.notificationService.addNotification('Form Submitted');
    } else {
      this.notificationService.addNotification('Form Error');
    }
    this.modalService.openModal(
      'Do you want to submit Survey Form?',
      this.submitModal
    );
  };

  ngOnDestroy(): void {
    this.surveyFormChanges.unsubscribe();
  }
}
