import { Injectable } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class DataService {
  constructor(public router: Router) {}
  currentActivatedRoute = 'surveyform';

  componentRedirect(source: String, destination: String) {
    if (source === 'formComponent' && destination === 'surveydataComponent') {
      this.router.navigate(['/surveydata']);
    }
    if (source === 'surveydataComponent' && destination === 'formComponent') {
      this.router.navigate(['/surveyform']);
    }
  }
}
