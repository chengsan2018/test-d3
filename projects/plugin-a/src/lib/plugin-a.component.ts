import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'lib-plugin-a',
  template: `
    <p>
      plugin-a works!
    </p>
  `,
  styles: []
})
export class PluginAComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
