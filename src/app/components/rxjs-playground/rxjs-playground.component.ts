import { Component, OnInit } from '@angular/core';
import { from, merge, of, pipe } from 'rxjs';
import { filter, map } from 'rxjs/operators';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-rxjs-playground',
  templateUrl: './rxjs-playground.component.html',
  styleUrls: ['./rxjs-playground.component.scss'],
})
export class RxjsPlaygroundComponent implements OnInit {
  constructor(private dataService: DataService) {}
  numbers = from([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
  strings = from(['apple', 'banana', 'cherry', 'date', 'elderberry']);
  numbers1 = from([1, 2, 3, 4, 5]);
  numbers2 = from([6, 7, 8, 9, 10]);
  people = from([
    { name: 'John', age: 25 },
    { name: 'Alice', age: 35 },
    { name: 'Bob', age: 40 },
    { name: 'Jane', age: 28 },
  ]);

  ngOnInit(): void {
    const evenNumbers = this.numbers.pipe(filter((x) => x % 2 === 0));
    console.log('challenge 1.');
    evenNumbers.subscribe((evenNumber) => console.log(evenNumber));

    console.log('challenge 2.');
    const upperCase = this.strings.pipe(map((x) => x.toUpperCase()));
    upperCase.subscribe((uppercase) => {
      console.log(uppercase);
    });

    console.log('challenge 3.');
    const mergeNumbers = merge(this.numbers1, this.numbers2);
    mergeNumbers.subscribe((merged) => console.log(merged));

    console.log('Challenge 4.');
    this.people
      .pipe(
        filter((x) => x.age > 30),
        map((x) => x.name)
      )
      .subscribe((x) => console.log('name:' + x));

    console.log('Challenge 5.');
    this.dataService.getTodos();
  }
}
