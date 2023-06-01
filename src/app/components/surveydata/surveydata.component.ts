import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DataService } from 'src/app/services/data.service';

@Component({
  selector: 'app-surveydata',
  templateUrl: './surveydata.component.html',
  styleUrls: ['./surveydata.component.scss'],
})
export class SurveydataComponent implements OnInit {
  currentSegments: any;
  constructor(
    private activatedRoute: ActivatedRoute,
    private dataService: DataService
  ) {}

  ngOnInit(): void {
    // this.activatedRoute.url.subscribe((segments: any) => {
    //   this.currentSegments = segments[0].path;
    // });
    //this.dataService.currentActivatedRoute = this.currentSegments;
  }
}
