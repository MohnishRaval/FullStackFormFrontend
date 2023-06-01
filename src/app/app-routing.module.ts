import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SurveydataComponent } from './components/surveydata/surveydata.component';
import { FormComponent } from './components/form/form.component';

const routes: Routes = [
  { path: '', component: FormComponent },
  { path: 'surveydata', component: SurveydataComponent },
  { path: 'surveyform', component: FormComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
