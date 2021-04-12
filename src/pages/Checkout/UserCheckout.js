import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import errorHandler from "../../functions/errorHandler";
import CartController from "../../functions/CartController";
import "./checkout.css";

import it from "../../locales/it.json";

// loading
import Header from "../../components/Header/Header";
import Loading from "../../components/Loading/Loading";
import Table from "../../components/Table/Table";
import InsertUser from "../../components/InsertUser/InsertUser";
import UserLoggedInfo from "./components/StaticUser";
import TransactionLoading from "../../components/Loading/TransactionLoading";
import Bill from "../../components/Bill/Bill";
import CheckoutForm from "../../components/Checkout/CheckoutForm";

/** Class to handle both user checkouts (user already logged and user that is
 * registering)
 */
export class UserCheckout extends Component {
  state = {
    insertUserHidden: false,
    loading: true,
    user: null,
    shops: [],
    isLogged: false,
    challenger: false,
    client_secret: null,
    cardElementShown: false,
    buttonLoading: false,
    intentId: null,
    transactionLoading: false,
    transferGroupId: null,
    shipAgain: false
  };

  /** Fetch user and shops selected */
  componentDidMount = async () => {
    window.scrollTo(0, 0);
    fetch("/page/checkout/user")
      .then(res => res.json())
      .then(jsonRes => {
        console.log(jsonRes);
        if (jsonRes.serverError) errorHandler.serverError(jsonRes);
        else {
          if (jsonRes.success) {
            if (!jsonRes.challenger && !jsonRes.isLogged) {
              alert(
                "Per accedere al checkout devi essere stato sfidato o aver effettuato il login"
              );
              window.location = "/";
            } else {
              this.setState({
                shops: jsonRes.items,
                isLogged: jsonRes.isLogged,
                challenger: jsonRes.challenger,
                user: jsonRes.user
              });
            }
          }
          //   loading false even if unauthorized (cart empty)
          this.setState({ loading: false });
        }
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  /** Removes item from the cart */
  removeItem = async (id, type) => {
    this.setState({ loading: true });
    const jsonRes = await CartController.delete(id, type);
    if (jsonRes.cartEmpty) alert("Carrello vuoto");
    if (jsonRes.success) window.location = window.location.pathname;
  };

  /** Show cart items as table */
  formatDateForTable = shopsArray => {
    return shopsArray.map((shop, i) => {
      return {
        logo: shop.logourl,
        nome: shop.name,
        prodotto: (
          <p
            className={`small-data-box dark green width-fixed ${shop.cartType}`}
          >
            {shop.cartType}
          </p>
        ),
        totale: shop.renewalPrice || shop.currentprice,
        rimuovi: (
          <i
            className="fas fa-times pointer"
            onClick={() => this.removeItem(shop.id, shop.cartType)}
          ></i>
        )
      };
    });
  };

  /** Get total cart price of shops */
  getShopsPrice = () => {
    if (this.state.shops.length !== 0) {
      return this.state.shops.reduce(
        (acc, shop) => (shop.renewalPrice || shop.currentprice) + acc,
        0
      );
    } else return 0;
  };

  // posts payment intent request
  handleSubmit = () => {
    this.setState({ buttonLoading: true });
    fetch("/transaction/paymentIntent/user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ shipAgain: this.state.shipAgain })
    })
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.unauthorized) {
          alert(jsonRes.message);
          window.location = window.location.pathname;
        } else if (jsonRes.success) {
          this.setState({
            buttonLoading: false,
            client_secret: jsonRes.client_secret,
            cardElementShown: true,
            transferGroupId: jsonRes.transferGroupId,
            intentId: jsonRes.intentId
          });
        } else {
          errorHandler.serverError(jsonRes);
        }
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  // save transaction and data associated with it
  saveTransaction = () => {
    let body = {
      intentId: this.state.intentId,
      transferGroupId: this.state.transferGroupId
    };
    if (this.state.newUser && this.state.newUser.username)
      body = { ...body, newUser: this.state.newUser };

    fetch("/transaction/paymentSuccess/user", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify(body)
    })
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success)
          window.location = "/success/" + jsonRes.transactionId;
        else {
          this.setState({ transactionLoading: false });
          alert(
            "Pagamento invalido. Ti consigliamo di riprovare. Se il problema persiste non esitare a contattarci."
          );
          if (jsonRes.serverError) {
            errorHandler.serverError(jsonRes);
          }
        }
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  render() {
    const cart = [];

    if (this.state.shops.some(shop => shop.cartType === "pass")) {
      cart.push({
        name: it.checkout_bill_renewalPasses,
        price: this.state.shops
          .filter(shop => shop.cartType === "pass")
          .reduce((acc, shop) => shop.currentprice + acc, 0)
      });
    }

    if (this.state.shops.some(shop => shop.cartType === "renewal")) {
      cart.push({
        name: it.checkout_bill_renewalPasses,
        price: this.state.shops
          .filter(shop => shop.cartType === "renewal")
          .reduce((acc, shop) => shop.renewalPrice + acc, 0)
      });
    }

    if (this.state.shipAgain) cart.push({ name: "Spedizione carta", price: 5 });

    let userBody = this.state.user ? (
      <UserLoggedInfo
        defaultInfo={this.state.user}
        toggleShipAgain={() =>
          this.setState({ shipAgain: !this.state.shipAgain })
        }
        shipAgain={this.state.shipAgain}
      />
    ) : null;

    const button = this.state.cardElementShown ? (
      <CheckoutForm
        client_secret={this.state.client_secret}
        billing_details={
          this.props.user && this.props.user.name
            ? {
                email: this.props.user.email,
                address: this.props.user.address,
                name: this.props.user.name.slice(1)
              }
            : this.state.newUser
            ? {
                email: this.state.newUser.email,
                address: `${this.state.newUser.street}, ${this.state.newUser.city}`,
                name: this.state.newUser.username
              }
            : null
        }
        saveTransaction={this.saveTransaction}
        toggleLoading={() =>
          this.setState({
            transactionLoading: !this.state.transactionLoading
          })
        }
      />
    ) : this.state.buttonLoading ? (
      <p
        id="checkout-confirm"
        className="button lowercase"
        style={{ cursor: "not-allowed" }}
      >
        {it.checkout_session_loading}
      </p>
    ) : (
      <p id="checkout-confirm" className="button" onClick={this.handleSubmit}>
        {it.checkout_confirm_button}
      </p>
    );

    const emptyCart = (
      <div id="checkout-empty-cart" className="communication-panel">
        <p className="communication-panel-header">{it.checkout_empty_cart}</p>
        <p className="communication-panel-text">
          {it.user_checkout_empty_cart_text}
        </p>
        <Link to="/shops" className="communication-panel-button button small">
          {it.shops}
        </Link>
      </div>
    );

    //  hide button and bill if still have to insert user
    const buttonAndBill = (
      <div>
        <Bill items={cart} />
        <div className="checkout-buttons-container">{button}</div>
      </div>
    );

    const body =
      this.state.shops.length > 0 ? (
        <div>
          {this.state.transactionLoading ? <TransactionLoading /> : null}
          <InsertUser
            hide={() => {
              window.location = window.location.pathname;
            }}
            hidden={this.state.user}
            challenger={this.state.challenger}
          />
          <p id="checkout-header">{it.checkout_page_header}</p>
          <div id="checkout-cart">
            <p id="checkout-cart-header">{it.cart}</p>
            <Table data={this.formatDateForTable(this.state.shops)} />
          </div>
          <div id="checkout-user">{userBody}</div>
          {buttonAndBill}
        </div>
      ) : (
        emptyCart
      );

    return (
      <div>
        <Header />
        <div className="page-wrapper">
          {this.state.loading ? <Loading class="page-loading" /> : body}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps)(UserCheckout);
