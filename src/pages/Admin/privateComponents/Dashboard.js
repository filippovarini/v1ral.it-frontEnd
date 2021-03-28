import React, { Component } from "react";

/** Display website dashboard with key data
 * @param userStats
 * @param shopOrders
 * @param userOrders
 */
export class Dashboard extends Component {
  render() {
    return this.props.userStats ? (
      <div id="dashboard">
        <div className="statistics-box box quick-facts quick-facts-wide quick-facts-margin">
          <p className="facts-header">Utenti</p>
          <div className="facts-container">
            <div className="fact fact-align-between">
              <p className="fact-title">Challengers Registrati</p>
              <p className="fact-data">
                {this.props.userStats.totalChallengers}
              </p>
            </div>
            <div className="fact fact-align-between">
              <p className="fact-title">Di cui Virali</p>
              <p className="fact-data">
                {this.props.userStats.viralChallengers}
              </p>
            </div>
            <div className="fact fact-align-between">
              <p className="fact-title">Shops Registrati</p>
              <p className="fact-data">{this.props.userStats.shops}</p>
            </div>
            <div className="fact fact-align-between">
              <p className="fact-title">Utenti Totali</p>
              <p className="fact-data">
                {this.props.userStats.totalChallengers +
                  this.props.userStats.shops}
              </p>
            </div>
          </div>
        </div>
        <div className="statistics-box box quick-facts quick-facts-wide quick-facts-margin">
          <p className="facts-header">Sessioni</p>
          <div className="facts-container">
            <div className="fact fact-align-between">
              <p className="fact-title">Challengers</p>
              <p className="fact-data">0</p>
            </div>
            <div className="fact fact-align-between">
              <p className="fact-title">Di cui Virali</p>
              <p className="fact-data">0</p>
            </div>
            <div className="fact fact-align-between">
              <p className="fact-title">Shops</p>
              <p className="fact-data">0</p>
            </div>
            <div className="fact fact-align-between">
              <p className="fact-title">Utenti Totali</p>
              <p className="fact-data">0</p>
            </div>
          </div>
        </div>
        <div className="statistics-box box quick-facts quick-facts-wide quick-facts-margin">
          <p className="facts-header">Fatturato</p>
          <div className="facts-container">
            <div className="fact fact-align-between">
              <p className="fact-title">Challengers</p>
              <p className="fact-data">{this.props.userOrders} €</p>
            </div>
            <div className="fact fact-align-between">
              <p className="fact-title">Shops</p>
              <p className="fact-data">{this.props.shopOrders} €</p>
            </div>
            <div className="fact fact-align-between">
              <p className="fact-title">Totale</p>
              <p className="fact-data">
                {this.props.userOrders + this.props.shopOrders} €
              </p>
            </div>
          </div>
        </div>
      </div>
    ) : null;
  }
}

export default Dashboard;
