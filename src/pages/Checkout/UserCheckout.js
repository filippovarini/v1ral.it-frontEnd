import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import errorHandler from "../../functions/errorHandler";
import CartController from "../../functions/CartController";
import "./checkout.css";

import it from "../../locales/it.json";

import Loading from "../../components/Loading/Loading";
import TransactionLoading from "../../components/Loading/TransactionLoading";
import UserCheckoutProducts from "../../components/UserCheckoutProducts/UserCheckoutProducts";
import Table from "../../components/Table/Table";
import Bill from "../../components/Bill/Bill";
import InsertUser from "../../components/InsertUser/InsertUser";
import PlaceForm from "../../components/Forms/PlaceForm";
import CheckoutForm from "../../components/Checkout/CheckoutForm";

/** Class to handle both user checkout. If user is not already logged, show
 * insertUser pop up where the user inserts its credentials. The inserted user
 * will be saved in the session (backend).
 */
export class UserCheckout extends Component {
  state = {
    insertUserHidden: false,
    user: null,
    shops: [],
    challenger: false,
    client_secret: null,
    cardElementShown: false,
    intentId: null,
    transferGroupId: null,

    loading: true,
    transactionLoading: false,
    buttonLoading: false
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

  // computes cart based on items in the cart
  computeCart = () => {
    let cart = [];
    if (this.state.shops.some(shop => shop.cartType === "pass")) {
      cart.push({
        name: it.checkout_bill_renewalPasses,
        price: this.state.shops
          .filter(shop => shop.cartType === "pass")
          .reduce((acc, shop) => shop.currentPrice + acc, 0)
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

    return cart;
  };

  /** Show cart items as table */
  formatDateForTable = shopsArray => {
    return shopsArray.map((shop, i) => {
      return {
        logo: shop.logo,
        nome: shop.name,
        prodotto: (
          <p
            className={`small-data-box dark green width-fixed ${shop.cartType}`}
          >
            {shop.cartType}
          </p>
        ),
        totale: shop.renewalPrice || shop.currentPrice,
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
        (acc, shop) => (shop.renewalPrice || shop.currentPrice) + acc,
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
      body: JSON.stringify({ shipAgain: false })
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
    let userBody = this.state.user ? (
      <div>
        <div className="form-container">
          <UserCheckoutProducts />
        </div>
        <div className="form-container">
          <PlaceForm
            city={this.state.user.city}
            province={this.state.user.province}
            street={this.state.user.street}
            postcode={this.state.user.postcode}
            readOnly={true}
            header={it.where_to_ship}
          />
        </div>
      </div>
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
        className="button lowercase checkout-button"
        style={{ cursor: "not-allowed" }}
      >
        {it.checkout_session_loading}
      </p>
    ) : (
      <p className="button checkout-button" onClick={this.handleSubmit}>
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
        <Bill items={this.computeCart()} />
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
            <Table data={this.formatDateForTable(this.state.shops)} />
          </div>
          <div id="checkout-user">{userBody}</div>
          {buttonAndBill}
        </div>
      ) : (
        emptyCart
      );

    return (
      <div className="page-wrapper">
        {this.state.loading ? <Loading class="page-loading" /> : body}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps)(UserCheckout);
