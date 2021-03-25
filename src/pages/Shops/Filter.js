import React, { Component } from "react";

import errorHandler from "../../functions/errorHandler";

import Loading from "../../components/Loading/Loading";

/** Component to filter cities
 * @param hide
 * @param hidden
 * @param buttons
 * @param isCity? on whether the filter is for city or for category
 */
export class Filter extends Component {
  state = {
    loading: false
  };

  postUpdate = data => {
    this.setState({ loading: true });
    const filter = this.props.isCity ? { city: data } : { category: data };
    fetch("/shop/updateSI", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ shopSI: filter })
    })
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success) {
          window.location = "/shops";
        } else {
          errorHandler.serverError(jsonRes);
        }
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  render() {
    return (
      <div
        className="popUp-background"
        style={this.props.hidden ? { display: "none" } : null}
      >
        <div
          style={this.props.hidden ? { display: "none" } : null}
          className="shops-filter-container popUp"
        >
          {this.state.loading ? (
            <Loading />
          ) : (
            <div>
              <i
                className="fas fa-times hide-cross"
                onClick={this.props.hide}
              ></i>
              {this.props.data.map((data, i) =>
                this.props.default && data === this.props.default ? (
                  <p key={i} className="shop-filter-default">
                    {data}
                  </p>
                ) : (
                  <p
                    key={i}
                    className="shops-filter"
                    onClick={() => this.postUpdate(data)}
                  >
                    {data}
                  </p>
                )
              )}
              {this.props.default ? (
                <p
                  className="button-small shops-filter-reset"
                  onClick={() => this.postUpdate(null)}
                >
                  annulla filtri
                </p>
              ) : null}
            </div>
          )}
        </div>
      </div>
    );
  }
}

export default Filter;
