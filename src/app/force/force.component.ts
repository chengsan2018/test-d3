import { Component, OnInit } from '@angular/core';

declare let d3: any;

@Component({
  selector: 'app-force',
  templateUrl: './force.component.html',
  styleUrls: ['./force.component.less']
})
export class ForceComponent implements OnInit {

  nodes: any[] =  [
    { name: "桂林", id: 0},
    { name: "广州", id: 1},
    { name: "厦门", id: 2},
    { name: "杭州", id: 3},
    { name: "上海", id: 4},
    { name: "青岛", id: 5},
    { name: "天津", id: 6}
  ];

  links:any[] = [
    { source : 5 , target: 0 },
    { source : 4 , target: 2 },
    { source : 0 , target: 3 },
    { source : 1 , target: 4 },
    { source : 1 , target: 0 },
    { source : 1 , target: 6 }
  ];

  simulation:any;

  edgeLength: number = 100;
  centerX:number = 300;
  centerY:number = 300;
  chargeStrength:number = -400;

  constructor() { }

  ngOnInit() {
    this.initSvg();
    this.draw();
  }

  draw() {

    //颜色
    const colors = d3.scaleOrdinal()
      .domain(d3.range(this.nodes.length))
      .range(d3.schemeCategory10);

    const svgGroup = d3.select('#svg').append('g');


    //生成模型
    this.simulation = d3.forceSimulation();

    this.simulation
    //定义边
      .force('link', d3.forceLink())
      //定义中心点
      .force('center', d3.forceCenter())
      //万有引力
      //任何两个节点之间都有万有引力
      //strength为正数，模拟吸引力
      //strength为负数，模拟排斥力
      .force('charge', d3.forceManyBody ().strength(this.chargeStrength))
      //碰撞力 碰撞半径 碰撞力大小 迭代次数
      .force('collide', d3.forceCollide(20).strength(0.5).iterations(5))
      .alphaDecay(0.0228);

    //输入节点
    this.simulation.nodes(this.nodes);

    //输入边
    this.simulation.force("link")
      .links(this.links)
      .distance(this.edgeLength);

    //输入中心点
    this.simulation.force("center")
      .x(this.centerX)
      .y(this.centerY);


    //绘制边
    const lines = svgGroup.append('g')
      .selectAll('line')
      .data(this.links)
      .enter()
      .append('line')
      .style("stroke", "#ccc")
      .style("stroke-width", 1);

    //添加节点
    const circles = svgGroup.append('g')
      .selectAll('circle')
      .data(this.nodes)
      .enter()
      .append('circle')
      .attr('r', 20)
      .attr('fill', function (d, i) {
        return colors(i);
      })
      .call(d3.drag().on('start', (d)=>{

        if (!d3.event.active) {
          this.simulation.alphaTarget(0.8).restart();
        }

        d.fx = d.x;
        d.fy = d.y;
      }).on('drag', (d) =>{

        d.fx = d3.event.x;
        d.fy = d3.event.y;
      }).on('end', (d)=>{

        if (!d3.event.active) {
          this.simulation.alphaTarget(0);
        }
        d.fx = null;
        d.fy = null;
      }));


    this.simulation.on("tick", () => {

      console.log('ticked!');

      lines.attr("x1", function (d) {
        return d.source.x;
      })
        .attr("y1", function (d) {
          return d.source.y;
        })
        .attr("x2", function (d) {
          return d.target.x;
        })
        .attr("y2", function (d) {
          return d.target.y;
        });

      //更新节点坐标
      circles.attr("cx", function (d) {
        return d.x;
      })
        .attr("cy", function (d) {
          return d.y;
        });

    });

  }

  printNode(){
    console.log(this.nodes);
    console.log(this.simulation.nodes());
  }

  initSvg(){
    d3.select('#svg')
      .attr('width', '100%')
      .attr('height', 500)
      .style('border', '1px solid black')
      .style('background-color', '#F5DEB3');
  }

  reDraw(){
    this.simulation.force('link').distance(this.edgeLength);
    this.simulation.force('center').x(this.centerX).y(this.centerY);
    this.simulation.force('charge', d3.forceManyBody().strength(this.chargeStrength));
    this.simulation.alphaTarget(0.8).restart();
  }
}
