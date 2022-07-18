import React from 'react'

import Chart from "react-apexcharts";

const TotalOrders = () => {
    let series = [{
        name: 'Sales',
        data: [28, 40, 36, 52, 38, 60, 38, 52, 36, 40]
      }];
    
      let options = {
        chart: {
          id: 'sparkline1',
          group: 'sparklines',
          type: 'area',
          height: 280,
          sparkline: {
            enabled: true
          },
        },
        stroke: {
          curve: 'smooth',
          width: 2
        },
        fill: {
          opacity: 1,
        },
        labels: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10'],
      yaxis: {
        min: 0
      },
      grid: {
        padding: {
          top: 125,
          right: 0,
          bottom: 36,
          left: 0
        }, 
      },
      fill: {
          type:"gradient",
          gradient: {
              type: "vertical",
              shadeIntensity: 1,
              inverseColors: !1,
              opacityFrom: .40,
              opacityTo: .05,
              stops: [45, 100]
          }
      },
      tooltip: {
        x: {
          show: false,
        },
        theme: 'dark'
      },
      colors: ['#fff']
      }
    
    
      return (
        <div className="App">
          <div className="row">
            <div className="mixed-chart">
              <Chart
                options={options}
                series={series}
                type="area" height={280}
                
              />
            </div>
          </div>
        </div>
      );
}

export default TotalOrders
