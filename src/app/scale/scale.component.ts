import { Component, OnInit } from '@angular/core';
import {NzMessageService} from 'ng-zorro-antd';

declare let d3: any;

@Component({
  selector: 'app-scale',
  templateUrl: './scale.component.html',
  styleUrls: ['./scale.component.less']
})
export class ScaleComponent implements OnInit {


  constructor(private messageService: NzMessageService) { }

  ngOnInit() {
    this.initSvg();
    this.drawAxis();
    this.test1();
  }

  test1(){
    const data = [1.2, 2.3, 0.9, 1.5, 3.3];

    let min = d3.min(data);
    let max = d3.max(data);

    //v5 写法
    let linear = d3.scaleLinear()
    // d3.scale.linear() 旧写法
      .domain([min, max])
      .range([0, 300]);

    console.log(linear(0.9));
    console.log(linear(2.0));
    console.log(linear(3.3));
  }

  initSvg(){
    d3.select('#svg')
      .attr('width', '100%')
      .attr('height', 500)
      .style('border', '1px solid black');
  }

  drawAxis(){
    const svg = d3.select('#svg');

    //定义比例尺
    const xScale = d3.scaleLinear()  //线性比例尺
      .domain([0, 3])     //定义显示在比例尺上面的刻度
      .range([0, 500]);   //定义比例尺实际的显示宽度(即像素)

    //定义坐标轴方向
    const xAxis = d3.axisBottom(xScale);

    //添加x坐标轴
    svg.append('g')
      .attr("transform", "translate(40, 450)")
      .call(xAxis);

    const yScale = d3.scaleLinear()
      .domain([1000,0])
      .range([0, 400]);

    //添加y坐标轴
    const yAxis = d3.axisLeft(yScale);
    svg.append('g')
      .attr("transform", "translate(40, 50)")
      .call(yAxis);
  }

}
