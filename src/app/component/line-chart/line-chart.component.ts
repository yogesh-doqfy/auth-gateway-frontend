import { Component, ElementRef, Input, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import * as d3 from 'd3';
import { LineDataPoint } from 'src/app/models/line.model';

@Component({
  selector: 'app-line-chart',
  template: '<div class="line-chart" #chart></div>',
  styleUrls: ['./line-chart.component.scss']
})
export class LineChartComponent implements OnInit {
  @Input() data: LineDataPoint[] = [];
  @ViewChild('chart', { static: true }) private chartContainer!: ElementRef;

  constructor() {}

  ngOnInit(): void {
    this.createLineChart();
  }

  createLineChart(): void {
    const element = this.chartContainer.nativeElement;
    const margin = { top: 30, right: 50, bottom: 50, left: 50 }; // Adjusted margin values
    const width = 400 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;
  
    // Create SVG element
    const svg = d3.select(element).append('svg')
      .attr('width', width + margin.left + margin.right)
      .attr('height', height + margin.top + margin.bottom)
      .append('g')
      .attr('transform', 'translate(' + margin.left + ',' + margin.top + ')');
  
    // Define scales
    const xScale = d3.scaleBand()
      .domain(this.data.map(d => d.type))
      .range([0, width])
      .padding(0.1);
  
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(this.data, d => d.value)!])
      .range([height, 0]);
  
    // Create X-axis
    const xAxis = d3.axisBottom(xScale);
    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)');
  
    // Create Y-axis
    const yAxis = d3.axisLeft(yScale);
    svg.append('g')
      .call(yAxis);
  
    // Create line function
    const line = d3.line<LineDataPoint>()
      .x(d => xScale(d.type)!)
      .y(d => yScale(d.value));
  
    // Append the line to the SVG
    svg.append('path')
      .datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', 'blue')
      .attr('stroke-width', 2)
      .attr('d', line);
      
    // X-axis label
    svg.append('text')
      .attr('transform', 'translate(' + (width / 2) + ',' + (height + margin.top + 10) + ')')
      .style('text-anchor', 'middle')
      .text('API Types');
  
    // Y-axis label
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - (height / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Values');
  }
  

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data']) {
      this.updateChart();
    }
  }

  private updateChart(): void {
    const element = this.chartContainer.nativeElement;
    const svg = d3.select(element).select('svg'); // Select existing SVG element
  
    // Clear previous content
    svg.selectAll('*').remove();
  
    const margin = { top: 20, right: 20, bottom: 40, left: 40 };
    const width = 400 - margin.left - margin.right;
    const height = 200 - margin.top - margin.bottom;
  
    // Define scales
    const xScale = d3.scaleBand()
      .domain(this.data.map(d => d.type))
      .range([0, width])
      .padding(0.1);
  
    const yScale = d3.scaleLinear()
      .domain([0, d3.max(this.data, d => d.value)!])
      .range([height, 0]);
  
    // Create X-axis
    const xAxis = d3.axisBottom(xScale);
    svg.append('g')
      .attr('transform', 'translate(0,' + height + ')')
      .call(xAxis)
      .selectAll('text')
      .style('text-anchor', 'end')
      .attr('dx', '-.8em')
      .attr('dy', '.15em')
      .attr('transform', 'rotate(-45)');
  
    // Create Y-axis
    const yAxis = d3.axisLeft(yScale);
    svg.append('g')
      .call(yAxis);
  
    // Create line function
    const line = d3.line<LineDataPoint>()
      .x(d => xScale(d.type)!)
      .y(d => yScale(d.value));
  
    // Append the line to the SVG
    svg.append('path')
      .datum(this.data)
      .attr('fill', 'none')
      .attr('stroke', 'blue')
      .attr('stroke-width', 2)
      .attr('d', line);
      
    // X-axis label
    svg.append('text')
      .attr('transform', 'translate(' + (width / 2) + ',' + (height + margin.top + 10) + ')')
      .style('text-anchor', 'middle')
      .text('API Types');
  
    // Y-axis label
    svg.append('text')
      .attr('transform', 'rotate(-90)')
      .attr('y', 0 - margin.left)
      .attr('x', 0 - (height / 2))
      .attr('dy', '1em')
      .style('text-anchor', 'middle')
      .text('Values');
  }
  
}
