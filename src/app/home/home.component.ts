import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  constructor() {
  }

  ngOnInit() {

    const a = new Promise(function (resolve, reject) {
      console.log('start');
      setTimeout(() => {
        resolve('success');
      }, 3000);
    });

    a.then((value) => {
      console.log(value);
    });

  }

}
