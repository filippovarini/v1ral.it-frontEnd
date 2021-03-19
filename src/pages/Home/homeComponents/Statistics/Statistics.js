import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import errorHandler from "../../../../errorHandler";
import "./statistics.css";

import QuickFacts from "./QuickFacts";
import BarChart from "../../../../components/BarChart/BarChart";
import Loading from "../../../../components/Loading/Loading";

import cases from "../../../../faqData/casesGraph";

const totalMargin = 40;
const quickFactsWidth = 250;
const graphSize = {
  width: window.innerWidth - totalMargin - quickFactsWidth - 200,
  height: Math.round((window.screen.height * 4) / 10)
};

const getDailyIncrement = totalCases => {
  const [predDay, currDay] = totalCases.slice(-2);
  return Math.round((100 * (currDay.number - predDay.number)) / predDay.number);
};

export class Statistics extends Component {
  state = {
    loading: true,
    info: null
  };

  componentDidMount = () => {
    if (!this.state.info) {
      fetch("page/home/quickFacts")
        .then(res => res.json())
        .then(jsonRes => {
          if (jsonRes.success) this.setState({ info: jsonRes.info });
          else errorHandler.serverError(jsonRes);
          this.setState({ loading: false });
        })
        .catch(e => {
          console.log(e);
          errorHandler.clientError();
        });
    }
  };

  render() {
    const info = this.state.info;
    const body = info ? (
      <div id="statistics">
        <QuickFacts
          totalCases={info.totalCases.reduce((acc, day) => acc + day.number, 0)}
          dailyCases={info.dailyCases}
          dailyIncrement={
            info.totalCases.length >= 2
              ? getDailyIncrement(info.totalCases)
              : info.dailyCases
          }
          rtIndex={info.rtIndex}
          supportedShops={info.financedShops}
          supportIncrement={info.dailyFinancedShops}
        />
        <BarChart cases={cases} statisticsDimensions={graphSize} />
      </div>
    ) : null;
    return (
      <div id="statistics-container" className={this.props.class}>
        {this.state.loading ? <Loading /> : body}
      </div>
    );
  }
}

export default withRouter(Statistics);
