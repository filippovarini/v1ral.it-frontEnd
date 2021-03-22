import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import errorHandler from "../../functions/errorHandler";

import Loading from "../../components/Loading/Loading";
import Header from "../../components/Header/Header";

export class TransactionSuccess extends Component {
  state = {
    loading: true,
    success: false
  };

  componentDidMount = () => {
    fetch("/page/success/" + this.props.match.params.transactionId)
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success) this.setState({ success: true });
        this.setState({ loading: false });
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  render() {
    const body = this.state.success ? (
      <div>
        Transazione completata con successo! Il tuo codice transazione è:{" "}
        {this.props.match.params.transactionId}
      </div>
    ) : (
      <div>Codice transazione non valida!</div>
    );
    return (
      <div>
        <Header />
        <div className="page-wrapper">
          {this.state.loading ? <Loading /> : body}
        </div>
      </div>
    );
  }
}

export default withRouter(TransactionSuccess);
