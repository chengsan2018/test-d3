import { Component, OnInit } from '@angular/core';

declare let d3: any;

@Component({
  selector: 'app-pie',
  templateUrl: './pie.component.html',
  styleUrls: ['./pie.component.less']
})
export class PieComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    this.initSvg();
    this.drawPie();
  }

  initSvg(){
    d3.select('#svg')
      .attr('width', '100%')
      .attr('height', 500)
      .style('border', '1px solid black');
  }

  drawPie(){

    const data = [2, 8 ,1 ,3, 5, 1, 13, 21];

    //弧形生成器
    const arc = d3.arc()
      .innerRadius(0)
      .outerRadius(200);

    //饼状图生成器
    const pie = d3.pie();

    const arcGroup = d3.select('#svg')
      .append('g')
      .attr("transform","translate(220, 220)")
      .selectAll('g')
      .data(pie(data))  //调用饼图生成器
      .enter()
      .append('g');

    // const colors = d3.scaleOrdinal(d3.schemeBlues[9]);
    const colors = d3.scaleOrdinal(d3.schemeCategory10);

    arcGroup.append('path')
      .attr('fill', function (d, i) {
        return colors(i);
      })
      .attr('d', function (d) {
        return arc(d); //调用弧形生成器
      });

    arcGroup.append("text")
      .attr("transform",function(d){
        return "translate(" + arc.centroid(d) + ")"; //弧中心
      })
      .attr("text-anchor","middle")
      .text(function(d){
        return d.data;
      });

  }

}
