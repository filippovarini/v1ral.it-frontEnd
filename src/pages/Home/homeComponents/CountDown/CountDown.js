import React, { Component } from "react";
import "./countdown.css";

import it from "../../../../locales/it.json";

// translations
const [sec, min, h, day] = [1000, 60, 60, 24];
const secToDay = sec * min * h * day;
const secToHour = 1000 * 60 * 60;
const secToMin = 1000 * 60;

export class CountDown extends Component {
  state = {
    target: new Date("Jun 25, 2021").getTime(),
    days: null,
    hours: null,
    minutes: null,
    seconds: null
  };

  updateCountDown = () => {
    const now = new Date().getTime();
    const distance = this.state.target - now;
    const days = Math.floor(distance / secToDay);
    const hours = Math.floor((distance % secToDay) / secToHour);
    const minutes = Math.floor((distance % secToHour) / secToMin);
    const seconds = Math.floor((distance % secToMin) / sec);
    this.setState({ days, hours, minutes, seconds });
  };

  render() {
    setInterval(this.updateCountDown, sec);
    return (
      <div id="countdown">
        <p id="countdown-header" className=" ">
          {it.countdown}
        </p>
        <div id="countdown-container">
          <div className="countdown-date-container">
            <p className="countdown-date">{this.state.days}</p>
            <p className="countdown-description">giorni</p>
          </div>
          <div className="countdown-date-container">
            <p className="countdown-date">{this.state.hours}</p>
            <p className="countdown-description">ore</p>
          </div>
          <div className="countdown-date-container">
            <p className="countdown-date">{this.state.minutes}</p>
            <p className="countdown-description">minuti</p>
          </div>
          <div className="countdown-date-container">
            <p className="countdown-date">{this.state.seconds}</p>
            <p className="countdown-description">secondi</p>
          </div>
        </div>
      </div>
    );
  }
}

export default CountDown;
