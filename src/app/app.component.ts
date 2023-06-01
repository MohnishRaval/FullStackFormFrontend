import { Component, OnInit } from '@angular/core';
import { DataService } from './services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  constructor(public router: Router) {
    this.router.navigateByUrl('/surveyform');
  }

  ngOnInit(): void {}
}
