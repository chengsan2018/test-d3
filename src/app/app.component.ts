import {Component, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {PlatformLocation} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.less']
})
export class AppComponent implements OnInit {
  title = 'test-d3';

  constructor(private router: Router,
              private acitveRouter: ActivatedRoute,
              private location: PlatformLocation){
  }

  ngOnInit(): void {

    setTimeout(()=>{
      // console.log(this.location.href);
      const curUrl = this.location.href;
      this.breadcrumbList.forEach(
        data=>{
          if(curUrl.indexOf(data.link) > 0){
            data.isActive = true;
          }
        }
      );
    }, 200);
  }

  breadcrumbList: any[] = [
    {link: '/home', title: 'Home', isActive: false},
    {link: '/axis', title: 'Axis', isActive: false},
    {link: '/scale', title: 'Scale', isActive: false},
    {link: '/pie', title: 'Pie', isActive: false},
    {link: '/force', title: 'Force', isActive: false},
    {link: '/tree', title: 'Tree', isActive: false},
    {link: '/bar-chart', title: 'Bar-Chart', isActive: false},
    {link: '/histogram', title: 'Histogram', isActive: false},
    {link: '/bubble-chart', title: 'Bubble-Chart', isActive: false}
  ]

  select(index:number){
    this.breadcrumbList.forEach(data=>data.isActive=false);
    this.breadcrumbList[index].isActive = true;
  }

}
