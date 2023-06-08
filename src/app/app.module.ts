import { ElementRef, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormComponent } from './components/form/form.component';
import { SurveydataComponent } from './components/surveydata/surveydata.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { RxjsPlaygroundComponent } from './components/rxjs-playground/rxjs-playground.component';
import { HttpClientModule } from '@angular/common/http';
import { SharedModalComponent } from './shared/shared-modal/shared-modal.component';

@NgModule({
  declarations: [
    AppComponent,
    FormComponent,
    SurveydataComponent,
    NavbarComponent,
    RxjsPlaygroundComponent,
    SharedModalComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
  ],
  providers: [DatePipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
