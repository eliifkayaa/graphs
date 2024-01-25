import { Component, OnInit, AfterViewInit, ViewChild, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HighchartsChartModule } from 'highcharts-angular';
import * as Highcharts from 'highcharts';
import highcharts3d from 'highcharts/highcharts-3d';
import { FormsModule } from '@angular/forms';
highcharts3d(Highcharts);

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, RouterOutlet, FormsModule, HighchartsChartModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent implements OnInit, AfterViewInit {
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }

  private chart: Highcharts.Chart | null = null; 
  private secondChart: Highcharts.Chart | null = null; 

  data: any[] = [
    {
      label: 'Bugün',
      data: '2.2%',
      symbol: 'symbol1',
      color: '#E6A73A',
    },
    {
      label: 'Günü Geçen',
      data: '0.0%',
      symbol: 'symbol2',
      color: '#D02420',
    },
    {
      label: 'Gelecek',
      data: '97.8%',
      symbol: 'symbol3',
      color: '#808080',
    }
  ];

  data2: any[] = [
    {
      label: 'Toplam Limit',
      data: '52.0%',
      symbol: 'symbol1',
      color: '#D61D24',
    },
    {
      label: 'Toplam Risk',
      data: '48.0%',
      symbol: 'symbol2',
      color: '#3CA5DC',
    }
  ];

  ngOnInit() {
    this.chart = new Highcharts.Chart({
      chart: {
        renderTo: 'pie-chart',
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 45,
          beta: 0,
        },
      },
      title: {
        text: 'Borç Durumu',
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          depth: 35,
          dataLabels: {
            enabled: true,
            format: '{point.name}',
          },
        },
      },
      series: [
        {
          type: 'pie',
          name: '',
          data: [
            {
              name: 'Gelecek',
              y: 97.8,
              color:'#808080'
            },
            {
              name: 'Bugün',
              y: 2.2,
              color:'#E6A73A'
            },
          ],
        },
      ],
    });

    // İkinci Grafik
    this.secondChart = new Highcharts.Chart({
      chart: {
        renderTo: 'second-pie-chart',
        type: 'pie',
        options3d: {
          enabled: true,
          alpha: 45,
          beta: 0,
        },
      },
      title: {
        text: 'Limit / Risk Durumu',
      },
      accessibility: {
        point: {
          valueSuffix: '%',
        },
      },
      tooltip: {
        pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>',
      },
      plotOptions: {
        pie: {
          allowPointSelect: true,
          cursor: 'pointer',
          depth: 35,
          dataLabels: {
            enabled: true,
            format: '{point.name}',
          },
        },
      },
      series: [
        {
          type: 'pie',
          name: '',
          data: [
            {
              name: 'Toplam Risk',
              y: 48.0,
              color:'#3CA5DC'
            },
            {
              name: 'Toplam Limit',
              y: 52.0,
              color:'#D61D24'
            },
          ],
        },
      ],
    });

    

    document.querySelectorAll('#sliders input').forEach((input) => {
      input.addEventListener('input', (e: any) => {
        if (e.target instanceof HTMLInputElement) {
          this.chart?.options?.chart?.options3d?[e.target.id] = e.target.value:
          this.showValues();
          this.chart?.redraw(false);
        }
      });
    });
  }

  private showValues(): void {
    const alphaValueElement = document.getElementById('alpha-value');
    const betaValueElement = document.getElementById('beta-value');
  
    if (alphaValueElement && betaValueElement && this.chart?.options?.chart?.options3d) {
      alphaValueElement.innerHTML = String(this.chart.options.chart.options3d.alpha || 'default value');
      betaValueElement.innerHTML = String(this.chart.options.chart.options3d.beta || 'default value');
    }
  }
}

