import { Component, ElementRef, Input, AfterViewInit, ViewChild, OnChanges, SimpleChanges } from '@angular/core';
import Chart from 'chart.js/auto';

@Component({
  selector: 'app-dounut-chart',
  template: '<canvas #circularChart></canvas>',
  styles: [],
})
export class DounutChartComponent implements AfterViewInit, OnChanges {
  @Input() data: number[] = [];
  @Input() labels: string[] = [];
  @ViewChild('circularChart') canvasRef!: ElementRef<HTMLCanvasElement>;
  chartInstance: Chart | null = null;
  isSmall = false
  // Add properties to hold the width and height of the canvas
  canvasWidth: number = 180;
  canvasHeight: number = 180;

  checkScreenWidth(): void {
    this.isSmall = (window.innerWidth <= 500);
    if (this.isSmall){
      this.canvasWidth= 250;
  this.canvasHeight= 250;
    }
    // this.isSmallScreen = true
  }


  ngAfterViewInit(): void {
    this.checkScreenWidth()
    this.createChart();
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['data'] || changes['labels']) {
      this.updateChart();
    }
  }

  createChart(): void {
    const canvas = this.canvasRef.nativeElement;
    const ctx = canvas.getContext('2d');

    if (ctx) {
      // Set the width and height of the canvas
      canvas.width = this.canvasWidth;
      canvas.height = this.canvasHeight;

      this.chartInstance = new Chart(ctx, {
        type: 'doughnut',
        data: {
          labels: this.labels,
          datasets: [
            {
              data: this.data,
              backgroundColor: ['#000842', '#94AAF6'],
            },
          ],
        },
        options: {
          cutout: '70%',
          aspectRatio: 1.5,
          
          plugins: {
            legend: {
              display: true,
              position: 'left',
              labels: {
                usePointStyle: true,
                boxWidth: 8,
                font: {
                  size: 10,
                  weight: 700,
                  family: 'Poppins',
                },
                // color: '#000842',
                color:"black"
                // padding: 10,
                // boxWidth: 50
                
              },
            },
          },
          layout: {
            padding: {
              right: 10, // Adjust left padding to add space between labels and chart
              left:10
            },
          },
        },
      });
    }
  }

  updateChart(): void {
    if (this.chartInstance) {
      this.chartInstance.data.labels = this.labels;
      this.chartInstance.data.datasets[0].data = this.data;
      this.chartInstance.update();
    }
  }
}
