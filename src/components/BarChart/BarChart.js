import React, { Component } from "react";
import { Bar } from "react-chartjs-2";
import "./barChart.css";

import graphColors from "../../Style/graphColors";

const totalMargin = 50;
const quickFactsWidth = 250;
const screenHeight = 300;
const screenShortHeight = 220;
const pageMargin = 250;

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

/** Returns a barchart to display info
 * @param cases [{date, number}]
 */
export class BarChart extends Component {
  state = {
    width: 0,
    height: 0
  };

  componentDidMount = () => this.updateGraphSize();

  updateGraphSize = () => {
    if (window.innerWidth <= 700) {
      this.setState({
        width: window.innerWidth - totalMargin,
        height: 300
      });
    } else
      this.setState({
        width: window.innerWidth - totalMargin - quickFactsWidth - pageMargin,
        height: Math.round((window.innerHeight * 4) / 10)
      });
  };

  render() {
    return (
      <div
        id="bar-chart-container"
        className=""
        style={{ width: this.state.width }}
      >
        <div
          id="bar-chart-resize"
          className="flex-line"
          onClick={this.updateGraphSize}
        >
          <i className="fas fa-sync-alt"></i>
          <p id="resize-text">resize</p>
        </div>
        <Bar
          height={
            window.innerWidth <= 700 && this.props.short
              ? screenShortHeight
              : screenHeight
          }
          width={this.state.width}
          data={{
            labels: this.props.cases.map(dailyReport => dailyReport.date),
            datasets: [
              {
                label: "Casi giornalieri",
                data: this.props.cases.map(dailyReport => dailyReport.number),
                backgroundColor: graphColors.background,
                hoverBackgroundColor: graphColors.hover,
                borderColor: graphColors.border,
                borderWidth: 1,
                barPercentage: 1
              },
              {
                label: "Media ogni 7 giorni",
                data: getMovingAverage(this.props.cases),
                fill: false,
                pointBackgroundColor: "rgba(0,0,0,0)",
                pointBorderColor: "rgba(0,0,0,0)",
                pointHoverBorderColor: graphColors.pointBorder,
                pointHoverBackgroundColor: graphColors.pointBackground,
                borderColor: ["rgba(255, 99, 132, 1)"],
                borderWidth: 3,
                type: "line"
              }
            ]
          }}
          options={{
            responsive: true,
            maintainAspectRatio: false,
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
                    padding: -5,
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
