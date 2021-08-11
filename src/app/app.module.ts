import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {NgZorroAntdModule} from 'ng-zorro-antd';
import { HomeComponent } from './home/home.component';
import { AxisComponent } from './axis/axis.component';
import { ScaleComponent } from './scale/scale.component';
import {FormsModule} from '@angular/forms';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { PieComponent } from './pie/pie.component';
import { ForceComponent } from './force/force.component';
import { TreeComponent } from './tree/tree.component';
import { BarChartComponent } from './bar-chart/bar-chart.component';
import { HistogramComponent } from './histogram/histogram.component';
import { BubbleChartComponent } from './bubble-chart/bubble-chart.component';
import {HttpClientModule} from "@angular/common/http";

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    AxisComponent,
    ScaleComponent,
    PieComponent,
    ForceComponent,
    TreeComponent,
    BarChartComponent,
    HistogramComponent,
    BubbleChartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgZorroAntdModule,
    FormsModule,
    BrowserAnimationsModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
