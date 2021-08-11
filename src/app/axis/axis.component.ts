import {AfterViewInit, Component, OnInit} from '@angular/core';

declare let d3:any;

@Component({
  selector: 'app-axis',
  templateUrl: './axis.component.html',
  styleUrls: ['./axis.component.less']
})
export class AxisComponent implements OnInit, AfterViewInit {

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit(): void {

    const svg = d3.select('#svg1')
      .attr('width', '100%')
      .attr('height', 450)
      .style('border', '1px solid black');

    const svgGroup = svg.append('g');

    svgGroup.append('rect')
      .attr('x', 100)
      .attr('y', 20)
      .attr('width', 100)
      .attr('height', 100)
      .attr('fill', 'blue');

    const zoom = d3.zoom()
      .on('zoom', ()=>{
        svgGroup.attr('transform', d3.event.transform);
      });
    svg.call(zoom);
  }

}
