import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {AxisComponent} from './axis/axis.component';
import {ScaleComponent} from './scale/scale.component';
import {PieComponent} from './pie/pie.component';
import {ForceComponent} from './force/force.component';
import {TreeComponent} from './tree/tree.component';
import {BarChartComponent} from './bar-chart/bar-chart.component';
import {HistogramComponent} from './histogram/histogram.component';
import {BubbleChartComponent} from './bubble-chart/bubble-chart.component';


const routes: Routes = [
  {path:'home', component: HomeComponent},
  {path:'axis', component: AxisComponent},
  {path:'scale', component: ScaleComponent},
  {path:'pie', component: PieComponent},
  {path:'force', component: ForceComponent},
  {path:'tree', component: TreeComponent},
  {path:'bar-chart', component: BarChartComponent},
  {path:'histogram', component: HistogramComponent},
  {path:'bubble-chart', component: BubbleChartComponent},
  {path:'', pathMatch:'full', redirectTo:'/home'},
  {path:'**', redirectTo:'/home'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
