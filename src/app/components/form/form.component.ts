import { DatePipe } from '@angular/common';
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
  currentSegments: any;
  surveyForm: FormGroup;
  surveyFormChanges: Subscription;
  campusLiking: Array<any> = [
    { name: 'students', value: 'students' },
    { name: 'location', value: 'location' },
    { name: 'campus', value: 'campus' },
    { name: 'atmosphere', value: 'atmosphere' },
    { name: 'dormRooms', value: 'dormRooms' },
    { name: 'sports', value: 'sports' },
  ];

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
      campusLikingArray: this.fb.array([]),
      raffleNumbers: new FormControl('', [
        Validators.required,
        this.raffleFieldValidator,
      ]),
    });
  }

  ngOnInit(): void {
    //console.log(this.surveyForm.valid);
    this.surveyFormChanges = this.surveyForm.valueChanges.subscribe(
      (valueChanges) => {
        setTimeout(() => {
          console.log(valueChanges);
        }, 1000);
      }
    );
  }

  checkboxChange(event: any) {
    const checkedBox = this.surveyForm.get('campusLikingArray') as FormArray;

    if (event.target.checked) {
      checkedBox.push(new FormControl(event.target.value));
    } else {
      let i: number = 0;
      checkedBox.controls.forEach((item: any) => {
        if (item.value == event.target.value) {
          checkedBox.removeAt(i);
          return;
        }
        i++;
      });
    }
    console.log(this.surveyForm.value);
  }

  raffleFieldValidator(
    control: AbstractControl
  ): { [key: string]: any } | null {
    const value = control.value;
    const numbers = value.split(',').map((num: string) => num.trim());
    const isValid = numbers.every((num: string) => {
      const parsed = parseInt(num, 10);
      return !isNaN(parsed) && parsed >= 1 && parsed <= 100;
    });

    return isValid ? null : { invalidRaffleNumbers: true };
  }

  errorHandler(formControlName: string) {
    const getControl = this.surveyForm.get(formControlName)?.errors;
    return getControl?.invalid && (getControl?.dirty || getControl?.touched);
  }

  formHandler(formControlName: string): {
    success: boolean;
    error: boolean;
    displayError: boolean;
  } {
    const currentControl = this.surveyForm.get(formControlName)!;
    const success =
      currentControl?.valid &&
      (currentControl?.dirty || currentControl?.untouched);
    console.log('success=' + success);
    const error =
      currentControl?.invalid &&
      (currentControl?.dirty || currentControl?.untouched);
    console.log('error=' + error);
    const displayError = false;
    return { success, error, displayError };
  }

  submitForm(): void {
    // Handle form submission
  }

  ngOnDestroy(): void {
    this.surveyFormChanges.unsubscribe();
  }
}
