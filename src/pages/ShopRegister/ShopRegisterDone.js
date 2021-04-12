import React, { Component } from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

import errorHandler from "../../functions/errorHandler";

import it from "../../locales/it.json";

import Loading from "../../components/Loading/Loading";
import Header from "../../components/Header/Header";
import ShopRegisterHeader from "./ShopRegisterHeader";
import ValidateStripeAccount from "../../components/ValidateStripeAccount/ValidateStripeAccount";

export class ShopRegisterDone extends Component {
  state = {
    loading: false,
    name: null,
    chargesEnabled: false
  };

  componentDidMount = () => {
    window.scrollTo(0, 0);
    const connectedId = this.props.match.params.connectedId;
    // send request
    fetch("/shop/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ connectedId })
    })
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success) {
          this.setState({
            loading: false,
            name: jsonRes.name,
            chargesEnabled: jsonRes.chargesEnabled
          });
          if (!jsonRes.alreadyPresent) {
            this.props.dispatch({
              type: "SET-USER",
              user: {
                name: jsonRes.name,
                userProfile: jsonRes.userProfile,
                id: jsonRes.id,
                email: jsonRes.email,
                address: jsonRes.address
              }
            });
          }
        } else {
          alert(jsonRes.message);
          if (jsonRes.unauthorized) {
            this.props.history.push("/shop/register/getPayed");
          }
          if (jsonRes.serverError) errorHandler.serverError(jsonRes);
        }
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  goToDashboard = () => {
    this.setState({ loading: true });
    const connectedId = this.props.match.params.connectedId;
    fetch("/transaction/dashboard", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({
        redirectPath: `shop/register/done/${connectedId}`,
        connectedId
      })
    })
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success) window.location = jsonRes.url;
        else {
          alert(jsonRes.message);
          errorHandler.serverError(jsonRes);
        }
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  render() {
    const connectedId = this.props.match.params.connectedId;
    const body = (
      <div>
        <ShopRegisterHeader navState={5} />
        {this.state.chargesEnabled ? null : (
          <ValidateStripeAccount
            toggleLoading={() =>
              this.setState({ loading: !this.state.loading })
            }
            redirectPath={`shop/register/done/${connectedId}`}
            connectedId={connectedId}
          />
        )}

        <div className="shop-register-body">
          <div
            id="shop-register-done-panel"
            className="communication-panel big"
          >
            <p className="communication-panel-header">{it.success}</p>
            <p className="communication-panel-text">
              {it.shop_register_completed_text}
            </p>
            <p className="communication-panel-text">
              {it.shop_register_completed_buy_marketing_products_header}
            </p>
            <Link
              to="/spread"
              id="shop-register-done-marketing-button"
              className="communication-panel-button button small"
            >
              {it.buy_marketing_products_button}
            </Link>
          </div>
        </div>
      </div>
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

const mapStateToProps = state => {
  return {
    shopRegister: state.shopRegister
  };
};

export default connect(mapStateToProps)(ShopRegisterDone);
