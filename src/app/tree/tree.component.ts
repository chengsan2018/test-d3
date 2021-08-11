import { Component, OnInit } from '@angular/core';

declare let d3: any;

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.less']
})
export class TreeComponent implements OnInit {


  dataSet: any = {
    name: '中国',
    children: [
      {
        name: '浙江',
        children:[
          {name: '杭州', value: 100},
          {name: '宁波', value: 100},
          {name: '温州', value: 100},
          {name: '绍兴', value: 100}
        ]
      },
      {
        name: '广西',
        children: [
          {
            name: '桂林',
            children: [
              {name: '秀峰区', value: 100},
              {name: '叠彩区', value: 100},
              {name: '象山区', value: 100},
              {name: '七星区', value: 100}
            ]
          },
          {name: '南宁',value: 100},
          {name: '柳州',value: 100},
          {name: '防城港',value: 100}
        ]
      },
      {
        name: '黑龙江',
        children:[
          {name: '哈尔滨', value: 100},
          {name: '齐齐哈尔', value: 100},
          {name: '牡丹江', value: 100},
          {name: '大庆', value: 100}
        ]
      },
      {
        name: '新疆',
        children:[
          {name: '乌鲁木齐'},
          {name: '克拉玛依'},
          {name: '吐鲁番'},
          {name: '哈密'}
        ]
      }
    ]
  }

  constructor() { }

  ngOnInit() {

    this.initSvg();

    const svg = d3.select('#svg');
    const svgWidth = svg._groups[0][0].clientWidth;
    const svgHeight = svg._groups[0][0].clientHeight;
    console.log(svgWidth);
    console.log(svgHeight);

    const svgGroup = svg.append('g')
      .attr("transform","translate(100,0)");

    //创建层级布局
    let hierarchyData = d3.hierarchy(this.dataSet)
      //后序遍历
      .sum(function (d) {
        return d.value;
      });

    console.log(hierarchyData);

    let tree = d3.tree()
      .size([svgHeight, svgWidth-200])
      //叶节点之间的间隔
      //如果父节点相同，那么间隔为1
      //如果父节点不同，那么间隔为2
      .separation(function(a,b){
        return (a.parent == b.parent? 1 : 2) / a.depth;
      });

    let treeData = tree(hierarchyData);
    let nodes = treeData.descendants();
    let links = treeData.links();

    console.log(nodes);
    console.log(links);

    //创建一个贝塞尔生成曲线生成器
    let curve_generator = d3.linkHorizontal()
      .x(function(d) { return d.y; })
      .y(function(d) { return d.x; });

    //绘制边
    svgGroup.append('g')
      .selectAll('path')
      .data(links)
      .enter()
      .append('path')
      .attr('d', function (d) {
        let start = {x: d.source.x, y: d.source.y};
        let end = {x: d.target.x, y: d.target.y};
        return curve_generator({source:start,target:end});
      })
      .attr("fill","none")
      .attr("stroke","blue")
      .attr("stroke-width",1);

    //绘制节点
    let nodeGroup = svgGroup.append('g')
      .selectAll('g')
      .data(nodes)
      .enter()
      .append('g')
      .attr('transform', function (d) {
        var cx = d.x;
        var cy= d.y;
        return "translate("+cy+","+cx+")";
      });

    nodeGroup.append('circle')
      .attr('r', 6)
      .attr("fill","white")
      .attr("stroke","blue")
      .attr("stroke-width",1);

    nodeGroup.append("text")
      .attr("x",function(d){
        return d.children?-(d.data.name.length * 18):8;
      })
      .attr("y",-5)
      .attr("dy",10)
      .text(function(d) {
        return d.data.name;
      });

  }

  initSvg(){
    d3.select('#svg')
      .attr('width', '100%')
      .attr('height', 500)
      .style('border', '1px solid black');
  }
}
