import { BrowserModule } from '@angular/platform-browser';
import { NgSelectModule } from '@ng-select/ng-select';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgModule } from '@angular/core';

// components
import {
  AppComponent,
  ChartComponent,
  ChartWrapperComponent
} from '@components';

// imports
import { ChartModule } from 'angular-highcharts';

@NgModule({
  declarations: [
    AppComponent,
    ChartComponent,
    ChartWrapperComponent
  ],
  imports: [
    FormsModule,
    ChartModule,
    BrowserModule,
    NgSelectModule,
    ReactiveFormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
