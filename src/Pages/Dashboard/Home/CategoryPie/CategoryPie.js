import React from 'react'
import Chart from "react-apexcharts";

const CategoryPie = () => {
    let series = [985, 737, 270];
    let options = {
        colors: ['#5c1ac3', '#e2a03f', '#e7515a', '#e2a03f'],
        chart: {
            type: 'donut',
        },
        labels: ['Apparel', 'Electronic', 'Others'],
        responsive: [{
            breakpoint: 1599,
            options: {
                chart: {
                    width: '350px',
                    height: '400px'
                },
                legend: {
                    position: 'bottom'
                }
            },

            breakpoint: 1439,
            options: {
                chart: {
                    width: '250px',
                    height: '390px'
                },
                legend: {
                    position: 'bottom'
                },
                plotOptions: {
                    pie: {
                        donut: {
                            size: '65%',
                        }
                    }
                }
            },
        }],
        dataLabels: {
            enabled: false
        },
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            fontSize: '14px',
            markers: {
                width: 10,
                height: 10,
            },
            itemMargin: {
                horizontal: 0,
                vertical: 8
            }
        },
        plotOptions: {
            pie: {
                donut: {
                    size: '65%',
                    background: 'transparent',
                    labels: {
                        show: true,
                        name: {
                            show: true,
                            fontSize: '29px',
                            fontFamily: 'Nunito, sans-serif',
                            color: undefined,
                            offsetY: -10
                        },
                        value: {
                            show: true,
                            fontSize: '26px',
                            fontFamily: 'Nunito, sans-serif',
                            color: '20',
                            offsetY: 16,
                            formatter: function (val) {
                                return val
                            }
                        },
                        total: {
                            show: true,
                            showAlways: true,
                            label: 'Total',
                            color: '#888ea8',
                            formatter: function (w) {
                                return w.globals.seriesTotals.reduce(function (a, b) {
                                    return a + b
                                }, 0)
                            }
                        }
                    }
                }
            }
        },
        stroke: {
            show: true,
            width: 25,
        },
    };



    return (
        <div className="App">
            <div className="row">
                <div className="mixed-chart">
                    <Chart
                        options={options}
                        series={series}
                        type="donut"

                        width="500"
                    />
                </div>
            </div>
        </div>
    );
}


export default CategoryPie
