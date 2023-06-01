import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  FormGroup,
  FormControl,
  FormBuilder,
  Validators,
  FormArray,
  AbstractControl,
} from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.scss'],
})
export class FormComponent implements OnInit, OnDestroy {
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

  // campusLiking: Array<any> = [
  //   { name: 'students', value: 'students' },
  //   { name: 'location', value: 'location' },
  //   { name: 'campus', value: 'campus' },
  //   { name: 'atmosphere', value: 'atmosphere' },
  //   { name: 'dormRooms', value: 'dormRooms' },
  //   { name: 'sports', value: 'sports' },
  // ];

  constructor(private fb: FormBuilder) {
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
      zipCode: new FormControl('', [Validators.required]),
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
    this.surveyFormChanges = this.surveyForm.valueChanges.subscribe(
      (valueChanges) => {
        setTimeout(() => {
          console.log(valueChanges);
        }, 1000);
      }
    );
  }

  get campusLikingFormArray() {
    return this.surveyForm.controls.campusLikingArray as FormArray;
  }
  private addCheckboxes() {
    this.campusLiking.forEach(() =>
      this.campusLikingFormArray.push(new FormControl(false))
    );
  }

  // checkboxChange = (event: any) => {
  //   const checkedBox = this.surveyForm.get('campusLikingArray') as FormArray;
  //   const formControl = checkedBox.controls.find(
  //     (control) => control.value === event.target.value
  //   );

  //   if (event.target.checked) {
  //     if (!formControl) {
  //       checkedBox.push(new FormControl(event.target.value));
  //     }
  //   } else {
  //     if (formControl) {
  //       const index = checkedBox.controls.indexOf(formControl);
  //       checkedBox.removeAt(index);
  //     }
  //   }
  // };

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
    const checkedBox = this.surveyForm.get('campusLikingArray') as FormArray;
    checkedBox.controls.forEach((control) => {
      control.setValue(false);
      control.markAsUntouched();
    });

    this.surveyForm.reset();
  };

  submitForm = (): void => {
    if (this.surveyForm.valid) {
    } else {
    }
  };

  ngOnDestroy(): void {
    this.surveyFormChanges.unsubscribe();
  }
}
