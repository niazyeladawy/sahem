import React from 'react'
import Chart from "react-apexcharts";

const DailySales = () => {
    let series = [{
        name: 'Sales',
        data: [44, 55, 41, 67, 22, 43, 21]
    }, {
        name: 'Last Week',
        data: [13, 23, 20, 8, 13, 27, 33]
    }];

    let options = {
        chart: {
            height: 160,
            type: 'bar',
            stacked: true,
            stackType: '100%',
            toolbar: {
                show: false,
            }
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: true,
            width: 1,
        },
        colors: ['#e2a03f', '#e0e6ed'],
        responsive: [{
            breakpoint: 480,
            options: {
                legend: {
                    position: 'bottom',
                    offsetX: -10,
                    offsetY: 0
                }
            }
        }],
        xaxis: {
            labels: {
                show: false,
            },
            categories: ['Sun', 'Mon', 'Tue', 'Wed', 'Thur', 'Fri', 'Sat'],
        },
        yaxis: {
            show: false
        },
        fill: {
            opacity: 1
        },
        plotOptions: {
            bar: {
                horizontal: false,
                endingShape: 'rounded',
                columnWidth: '25%',
            }
        },
        legend: {
            show: false,
        },
        grid: {
            show: false,
            xaxis: {
                lines: {
                    show: false
                }
            },
            padding: {
                top: 10,
                right: 0,
                bottom: -40,
                left: 0
            },
        },
    }


    return (
        <div className="App">
            <div className="row">
                <div className="mixed-chart">
                    <Chart
                        options={options}
                        series={series}
                        type="bar" height={160}
                        
                    />
                </div>
            </div>
        </div>
    );
}

export default DailySales
