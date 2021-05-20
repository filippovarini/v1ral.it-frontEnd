import React, { Component } from "react";
import "./registerDone.css";
import { Link } from "react-router-dom";
import it from "../../../locales/it.json";
import successImage from "../../../images/success.png";
import errorHandler from "../../../functions/errorHandler";

import PageDescription from "../../../components/PageDescription/PageDescription";
import ValidateStripeAccount from "../../../components/ValidateStripeAccount/ValidateStripeAccount";
import Loading from "../../../components/Loading/Loading";

export class RegisterDone extends Component {
  state = {
    connectedId: null,
    shopId: null,
    chargesEnabled: null,
    loading: true
  };

  componentDidMount = () => {
    fetch("/page/registerDone")
      .then(res => res.json())
      .then(jsonRes => {
        console.log(jsonRes);
        if (jsonRes.success) {
          this.setState({
            loading: false,
            connectedId: jsonRes.connectedId,
            shopId: jsonRes.loginId,
            chargesEnabled: jsonRes.chargesEnabled
          });
        } else if (jsonRes.unauthorized) {
          window.location = "/";
        } else {
          alert(jsonRes.message);
          this.setState({ loading: false });
          if (jsonRes.serverError) errorHandler.serverError(jsonRes);
        }
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  render() {
    return (
      <div className="page-wrapper">
        {this.state.loading ? (
          <Loading class="page-loading" />
        ) : (
          <div className="shop-register-body">
            <PageDescription
              header={it.shop_register_done_title}
              text={it.shop_register_done_text}
              image={successImage}
            />

            {this.state.chargesEnabled ? null : (
              <ValidateStripeAccount
                shopId={this.state.shopId}
                connectedId={this.state.connectedId}
                redirectPath={window.location.pathname}
              />
            )}

            <div style={{ marginTop: "20px" }} className="box body-box">
              <p className="body-box-header">
                {it.shop_buy_our_marketing_products}
              </p>
              <p className="body-box-text">
                {it.shop_register_completed_buy_marketing_products_header}
              </p>
              <Link to="/spread" id="spread-link" className=" button small">
                {it.buy_marketing_products_button}
              </Link>
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default RegisterDone;
