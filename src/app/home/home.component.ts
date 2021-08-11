import {Component, OnInit} from '@angular/core';
import {TestApi} from "../../api/test-api";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.less']
})
export class HomeComponent implements OnInit {

  constructor(private testApi: TestApi) {
  }

  ngOnInit() {
    this.getData();
    this.testPromise();
  }

  getData() {
    this.testApi.queryNews().subscribe(
      response => {
        console.log(response);
      }
    );
  }

  testPromise() {
    const a = new Promise(function (resolve, reject) {
      console.log('start');

      setTimeout(() => {
        resolve('success');
      }, 1000);
      reject('fail');
    });

    console.log('end');

    a.then((value) => {
      console.log(value);
    }, (error) => {
      console.log(error);
    });
  }

}
