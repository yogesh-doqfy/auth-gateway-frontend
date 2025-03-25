import { Component, Input, OnInit, SimpleChanges } from '@angular/core';
import { ChartDataset, ChartOptions } from 'chart.js';


@Component({
  selector: 'app-apex-line-chart',
  templateUrl: './apex-line-chart.component.html',
  styleUrls: ['./apex-line-chart.component.scss']
})
export class ApexLineChartComponent implements OnInit {
  @Input() data: any[] = [];
  @Input() label?: string;
  @Input() chartLabel: any[] = [];
  chartData: ChartDataset[] = [];
  chartLabels: string[] = [];
  
  chartOptions: ChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      xAxis: {
        display: false,
        grid: {},
      },
      yAxis: {
          display: true, // Hide the y-axis if you don't want it to be visible
        },
      },
    plugins: {
      legend: {
        display: false,
      },
  
      tooltip: {
        backgroundColor: '#D9D9D9',
        displayColors: false, // removes unnecessary legend
        padding: 10,
        titleColor: '#000842',
        titleFont: {
          size: 15
        },
        bodyColor: '#000842',
        bodyFont: {
          size: 13
        }
      }
    }
  };

  constructor() { }

  ngOnInit(): void {
    this.updateChartData();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes["data"] || changes["label"] || changes["chartLabel"]) {
      this.updateChartData();
    }
  }

  private updateChartData(): void {
    this.chartData= [
      {
        // ⤵️ Add these
        label: this.label,
        data: this.data,
        pointHitRadius: 15, // expands the hover 'detection' area
        pointHoverRadius: 8,
        pointRadius: 2,
        borderColor: '#2D2F33', // main line color aka $midnight-medium from @riapacheco/yutes/seasonal.scss
        pointBackgroundColor: '#2D2F33',
        pointHoverBackgroundColor: '#2D2F33',
        borderWidth: 2, // main line width
        hoverBorderWidth: 0, // borders on points
        pointBorderWidth: 0, // removes POINT borders
        tension: 0.3, 
      },
    ];
    this.chartLabels = this.chartLabel;
  
  }


}
