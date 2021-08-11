import {Component, OnDestroy, OnInit} from '@angular/core';

declare let d3: any;

@Component({
  selector: 'app-histogram',
  templateUrl: './histogram.component.html',
  styleUrls: ['./histogram.component.less']
})
export class HistogramComponent implements OnInit, OnDestroy {

  svgWidth;
  svgHeight;
  svgPadding = {top:20, right:30, bottom:20, left:20};

  constructor() { }

  ngOnInit() {
    this.initSvg();
    console.log(this.svgWidth);
    console.log(this.svgHeight);

    let data = d3.range(100).map(d3.randomBates(10));
    console.log('source data: ',data);

    let xScale = d3.scaleLinear()
      .range([0, this.svgWidth-this.svgPadding.left-this.svgPadding.right]);

    console.log('xScale.ticks(20)', xScale.ticks(20));

    let bins = d3.histogram()
      .domain(xScale.domain())
      .thresholds(xScale.ticks(20))(data);
    console.log('histograms data: ',bins);

    bins.pop();

    let yScale = d3.scaleLinear()
      .domain([0, d3.max(bins, function (d) {
        return d.length;
      })])
      .range([this.svgHeight-this.svgPadding.top-this.svgPadding.bottom, 0]);

    const svg = d3.select('#svg');
    const svgGroup = svg.append('g')
      .attr('transform', `translate(${this.svgPadding.left},${this.svgPadding.top})`);

    const bar = svgGroup.selectAll('.bar')
      .data(bins)
      .enter()
      .append('g')
      .attr('class', 'bar')
      .attr('transform', function (d) {
        return `translate(${xScale(d.x0)},${yScale(d.length)})`;
      });

    bar.append('rect')
      .attr('x', 1)
      .attr('width', xScale(bins[0].x1) - xScale(bins[0].x0) - 2)
      .attr('height', (d)=> {
        return this.svgHeight-this.svgPadding.top-this.svgPadding.bottom-yScale(d.length);
      })
      .attr('fill', 'blueviolet');

    bar.append('text')
      .attr("dy", "-.75em")
      .attr("y", 6)
      .attr("x", (xScale(bins[0].x1) - xScale(bins[0].x0)) / 2)
      .attr("text-anchor", "middle")
      .text(d=>{
        return d.length;
      });

    svgGroup.append('g')
      .attr('class', 'axis-X')
      .attr("transform", `translate(0,${this.svgHeight-this.svgPadding.top-this.svgPadding.bottom})`)
      .call(d3.axisBottom(xScale));

  }

  initSvg(){
    d3.select('#svg')
      .attr('width', '100%')
      .attr('height', 500)
      .style('border', '1px solid black');

    const svg = d3.select('#svg');
    this.svgWidth = svg._groups[0][0].clientWidth;
    this.svgHeight = svg._groups[0][0].clientHeight;
  }

  ngOnDestroy(){
    d3.select('#svg').remove();
  }

}
