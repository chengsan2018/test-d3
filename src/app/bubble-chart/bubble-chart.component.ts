import {Component, ElementRef, OnInit} from '@angular/core';

declare let d3: any;

@Component({
  selector: 'app-bubble-chart',
  templateUrl: './bubble-chart.component.html',
  styleUrls: ['./bubble-chart.component.less']
})
export class BubbleChartComponent implements OnInit {

  data: any[] = [
    {x: 24,y: 12,r: 64},
    {x: 39,y: 20,r: 14},
    {x: 78,y: 15,r: 67},
    {x: 15,y: 80,r: 34},
    {x: 36,y: 70,r: 14},
    {x: 7,y: 11,r: 64},
    {x: 36,y: 89,r: 74},
    {x: 9,y: 95,r: 6},
    {x: 72,y: 35,r: 25},
    {x: 26,y: 65,r: 80},
    {x: 16,y: 36,r: 10},
    {x: 99,y: 65,r: 45},
    {x: 46,y: 78,r: 65}
  ];

  config = {
    margins: {top: 80, left: 80, bottom: 50, right: 80},
    textColor: 'black',
    gridColor: 'gray',
    ShowGridX: [10, 20, 30, 40, 50, 60, 70 ,80, 90, 100],
    ShowGridY: [10, 20, 30, 40, 50, 60, 70 ,80, 90, 100],
    title: '气泡图',
    pointMaxSize: 20,
    hoverColor: 'white',
    animateDuration: 1000,
    pointCenterColor: 'white',
    pointEdgeColor: d3.scaleOrdinal(d3.schemeCategory10)(0)
  };

  parentElement:any;

  constructor(private el: ElementRef) { }

  ngOnInit() {

    const svg = d3.select('#svg');
    const svgGroup = svg.append('g');
    svgGroup.append('rect').attr('x', 0).attr('y', 0)
      .attr('width', 100).attr('height',100).attr('fill', 'red');

    console.log(svgGroup);
    // this.initSvg();
    // this.draw();
  }

  private draw(){
    const svg = d3.select('#svg');
    const svgWidth = svg._groups[0][0].clientWidth;
    const svgHeight = svg._groups[0][0].clientHeight;

    // svg.append('defs')
    //   .append('clipPath')
    //   .attr('id', 'clip')
    //   .attr('width', svgWidth-this.config.margins.left-this.config.margins.right+10+10)
    //   .attr('height', svgHeight-this.config.margins.top-this.config.margins.bottom+10+10)
    //   .attr('x',-10)
    //   .attr('y',-10);

    const xScale = d3.scaleLinear()
      .domain([0, Math.ceil(d3.max(this.data, function (d) {return d.x;}) / 10) * 10])
      .range([0, svgWidth-this.config.margins.left-this.config.margins.right]);

    const yScale = d3.scaleLinear()
      .domain([0, Math.ceil(d3.max(this.data, function (d) {return d.y;}) / 10) * 10])
      .range([svgHeight-this.config.margins.top-this.config.margins.bottom, 0]);

    const sizeScale = d3.scaleLinear()
      .domain([0, d3.max(this.data, function (d) {return d.r;})])
      .range([0, this.config.pointMaxSize]);

    //画坐标轴
    const xAxis = svg.append('g')
      .attr('transform', `translate(${this.config.margins.left},${(this.config.margins.top+svgHeight-this.config.margins.top-this.config.margins.bottom)})`)
      .call(d3.axisBottom(xScale));

    xAxis.append('text')
      .attr('class', 'axisText')
      .attr('x', svgWidth-this.config.margins.left-this.config.margins.right)
      .attr('y', 0)
      .attr('fill', this.config.textColor)
      .attr('dy', 30)
      .text('X');

    const yAxis = svg.append('g')
      .attr('transform', `translate(${this.config.margins.left},${this.config.margins.top})`)
      .call(d3.axisLeft(yScale));

    yAxis.append('text')
      .attr('class', 'axisText')
      .attr('x', 0)
      .attr('y', 0)
      .attr('fill', this.config.textColor)
      .attr('dx', '-30')
      .attr('dy', '10')
      .text('Y');

    let config = this.config;

    xAxis.selectAll('.tick')
      .each(function(d,i){
        if(config.ShowGridX.indexOf(d) > -1){
          d3.select(this)
            .append('line')
            .attr('class','grid')
            .attr('stroke', config.gridColor)
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', 0)
            .attr('y2', -(svgHeight-config.margins.top-config.margins.bottom));
        }
      });

    yAxis.selectAll('.tick')
      .each(function(d,i){
        if(config.ShowGridY.indexOf(d) > -1){
          d3.select(this)
            .append('line')
            .attr('class','grid')
            .attr('stroke', config.gridColor)
            .attr('x1', 0)
            .attr('y1', 0)
            .attr('x2', svgWidth-config.margins.left-config.margins.right)
            .attr('y2', 0);
        }
      });

    const svgGroup = svg.append('g')
      .attr('transform', `translate(${this.config.margins.left},${this.config.margins.top})`)
    // .attr('clip-path', "url(#clip)");

    const radialGrad = svgGroup.append('defs')
      .append('radialGradient')
      .attr('id', 'bubble-fill')
      .attr('cx', 0.4)
      .attr('cy', 0.4);

    radialGrad.append('stop')
      .attr('offset', '0%')
      .attr('stop-color', this.config.pointCenterColor);

    radialGrad.append('stop')
      .attr('offset', '100%')
      .attr('stop-color', this.config.pointEdgeColor);

    //画点
    const points = svgGroup.selectAll('.point')
      .data(this.data)

    points.enter()
      .append('circle')
      .classed('point', true)
      .merge(points)
      .attr('cx', d=>xScale(d.x))
      .attr('cy', d=>yScale(d.y))
      .attr('r', 0)
      .attr('fill', 'url(#bubble-fill)')
      .transition().duration(this.config.animateDuration)
      .attr('r', (d) => sizeScale(d.r));

    points.exit().remove();

    //添加鼠标事件
    d3.selectAll('.point').on('mouseover', d=>{
      const e = d3.event;
      const position = d3.mouse(svg.node());
      e.target.style.cursor='hand';
      d3.select(e.target)
        .attr('r', sizeScale(d.r)+5);

      svg.append('text')
        .classed('tip', true)
        .attr('x', position[0]+15)
        .attr('y', position[1]-15)
        .attr('fill', this.config.textColor)
        .text(`x:${d.x}, y:${d.y}`);
    })
    .on('mouseleave', d=>{
      const e = d3.event;

      d3.select(e.target)
        .attr('r', sizeScale(d.r));

      d3.select('.tip').remove();
    })
    .on('mousemove', debounce(function(){
        const position = d3.mouse(svg.node());
        d3.select('.tip')
          .attr('x', position[0]+15)
          .attr('y', position[1]-15);
      }, 6)
    );

    function debounce(fn, time){
      let timeId = null;
      return function(){
        const context = this;
        const event = d3.event;
        timeId && clearTimeout(timeId)
        timeId = setTimeout(function(){
          d3.event = event;
          fn.apply(context, arguments);
        }, time);
      }
    }
  }

  test(){
    const test = d3.select('#svg').selectAll('*');
    console.log(test);
  }

  private initSvg(){
    d3.select('#svg')
      .attr('width', '100%')
      .attr('height', 500)
      .style('border', '1px solid black');
  }

}
