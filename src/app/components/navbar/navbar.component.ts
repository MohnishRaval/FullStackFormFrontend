import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { DataService } from '../../services/data.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  currentRoute = '';
  constructor(public dataService: DataService) {}

  ngOnInit(): void {
    this.currentRoute = this.dataService.currentActivatedRoute;
  }
}
