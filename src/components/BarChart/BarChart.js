/* props:
cases: [{date, number}] 
*/

import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import "./barChart.css";

import colors from "../../style/colors";

const getMovingAverage = cases => {
  const movingAverage = [];
  for (let i = 0; i < cases.length; i++) {
    if (i < 6) {
      movingAverage.push(cases[i].number);
    } else {
      const weekStart = i - 6;
      const week = cases
        .slice(weekStart, i + 1)
        .map(dailyCase => dailyCase.number);
      const sum = week.reduce((x, y) => x + y);
      movingAverage.push(Math.round(sum / 7));
    }
  }
  return movingAverage;
};

export class BarChart extends Component {
  render() {
    return (
      <div id="bar-chart-container">
        <p id="bar-chart-title">Positivi Giornalieri</p>
        <Bar
          data={{
            labels: this.props.cases.map(dailyReport => dailyReport.date),
            datasets: [
              {
                label: "Casi giornalieri",
                data: this.props.cases.map(dailyReport => dailyReport.number),
                backgroundColor: colors.graph.background,
                hoverBackgroundColor: colors.graph.hover,
                borderColor: colors.graph.border,
                borderWidth: 1,
                barPercentage: 1
              },
              {
                label: "Media ogni 7 giorni",
                data: getMovingAverage(this.props.cases),
                fill: false,
                pointBackgroundColor: "rgba(0,0,0,0)",
                pointBorderColor: "rgba(0,0,0,0)",
                pointHoverBorderColor: colors.graph.pointBorder,
                pointHoverBackgroundColor: colors.graph.pointBackground,
                borderColor: ["rgba(255, 99, 132, 1)"],
                borderWidth: 3,
                type: "line"
              }
            ]
          }}
          options={{
            legend: {
              display: false
            },
            scales: {
              yAxes: [
                {
                  ticks: {
                    beginAtZero: true
                  }
                }
              ],
              xAxes: [
                {
                  scaleLabel: {
                    display: false,
                    labelString: "shit"
                  },
                  gridLines: {
                    display: false
                  },
                  ticks: {
                    autoSkip: true,
                    autoSkipPadding: 100,
                    fontSize: 10,
                    maxRotation: 0,
                    callback: (value, index, values) => {
                      if (index !== 0) {
                        return value;
                      }
                    }
                  }
                }
              ]
            }
          }}
        />
      </div>
    );
  }
}

export default BarChart;
