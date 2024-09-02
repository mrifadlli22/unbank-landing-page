import React from 'react';
import ReactApexChart from 'react-apexcharts';
import './USDTRate.module.css'; // Import file CSS for additional styling

class USDTChart extends React.Component {
  constructor(props) {
    super(props);

    // Dummy data for the last 24 hours
    const now = new Date().getTime();
    const dates = Array.from({ length: 24 }, (_, i) => {
      const timestamp = now - (i * 60 * 60 * 1000); // Subtracting hours
      const rate = (0.11 + (Math.random() - 0.5) * 0.01).toFixed(5); // USDT rate with random fluctuation
      return [timestamp, parseFloat(rate)];
    }).reverse(); // Reverse the data to show from start to end

    this.state = {
      series: [{
        name: 'USDT to IDR',
        data: dates
      }],
      options: {
        chart: {
          type: 'area', // Change to area chart for background
          height: 350,
          zoom: {
            type: 'x',
            enabled: true,
            autoScaleYaxis: true
          },
          toolbar: {
            autoSelected: 'zoom'
          }
        },
        dataLabels: {
          enabled: false
        },
        stroke: {
          curve: 'smooth', // Smooth curve
          width: 2 // Adjust stroke width
        },
        fill: {
          type: 'gradient', // Use gradient for area below line
          gradient: {
            shadeIntensity: 1,
            opacityFrom: 0.7, // Opacity at the top of the gradient
            opacityTo: 0.1, // Opacity at the bottom
            stops: [0, 100]
          }
        },
        title: {
          text: 'USDT Rate against IDR (Last 24 hours)',
          align: 'left'
        },
        xaxis: {
          type: 'datetime',
          title: {
            text: 'Time'
          }
        },
        yaxis: {
          title: {
            text: 'USDT Rate (IDR)'
          },
          labels: {
            formatter: function (val) {
              return val.toFixed(5); // Display value with 5 decimals
            }
          }
        },
        tooltip: {
          shared: false,
          x: {
            format: 'dd MMM yyyy HH:mm'
          },
          y: {
            formatter: function (val) {
              return val.toFixed(5);
            }
          }
        }
      }
    };
  }

  render() {
    return (
      <div className="chart-container">
        <div id="chart">
          <ReactApexChart 
            options={this.state.options} 
            series={this.state.series} 
            type="area" // Ensure area chart type for background color
            height={350} 
          />
        </div>
      </div>
    );
  }
}

export default USDTChart;
