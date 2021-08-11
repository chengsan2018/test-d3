import { Component, OnInit } from '@angular/core';

declare let d3: any;

@Component({
  selector: 'app-bar-chart',
  templateUrl: './bar-chart.component.html',
  styleUrls: ['./bar-chart.component.less']
})
export class BarChartComponent implements OnInit {


  data:any[] = [10,20,30,23,13,40,27,35,20];
  svgPadding = {top:20, right:30, bottom:20, left:30};
  rectInterval = 30;

  constructor() { }

  ngOnInit() {
    this.initSvg();
    this.draw();
  }

  initSvg(){
    d3.select('#svg')
      .attr('width', '100%')
      .attr('height', 500)
      .style('border', '1px solid black');
  }

  draw(){
    const svg = d3.select('#svg');
    const svgWidth = svg._groups[0][0].clientWidth;
    const svgHeight = svg._groups[0][0].clientHeight;
    console.log(svgWidth);
    console.log(svgHeight);

    const svgGroup = svg.append('g')
      .attr('transform', `translate(${this.svgPadding.left},${this.svgPadding.top})`);

    //生成x坐标轴
    const xScale = d3.scaleBand()
      //range 生成自然序数组
      .domain(d3.range(this.data.length))
      .rangeRound([0, svgWidth - this.svgPadding.left - this.svgPadding.right]);

    const xAxis = d3.axisBottom(xScale);

    //生成y坐标轴
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(this.data)])
      .range([svgHeight - this.svgPadding.top - this.svgPadding.bottom, 0]);
    const yAxis = d3.axisLeft(yScale);

    //画柱状图
    const rectGroup = svgGroup.selectAll('.rect-group')
      .data(this.data)
      .enter()
      .append('g')
      .attr('class', 'rect-group');

    rectGroup.append('rect')
      .attr('x', (d, index)=>{
        console.log(xScale(index));
        return xScale(index) + this.rectInterval / 2;
      })
      .attr('y', (d, index)=>{
        return yScale(d);
      })
      .attr('width', xScale.step() - this.rectInterval)
      .attr('height', (d)=>{
        return svgHeight - this.svgPadding.top - this.svgPadding.bottom - yScale(d);
      })
      .attr('fill', 'blueviolet');

    rectGroup.append('text')
      .attr('x', (d, index)=>{
        return xScale(index) + this.rectInterval / 2;
      })
      .attr('y', (d, index)=>{
        return yScale(d);
      })
      .attr('dx', (xScale.step() - this.rectInterval) / 2)
      .attr('dy', -5)
      .attr('text-anchor', 'middle') //文字左右居中
      .style('font-size', 16)
      .text(d=>d);

    //画x坐标轴
    svgGroup.append('g')
      .attr("transform", `translate(0, ${svgHeight-this.svgPadding.bottom-this.svgPadding.top})`)
      .call(xAxis);

    //画y坐标轴
    svgGroup.append('g')
      .call(yAxis);

  }

}
