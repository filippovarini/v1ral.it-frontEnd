import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import errorHandler from "../../functions/errorHandler";
import "./checkout.css";

import it from "../../locales/it.json";

// loading
import Header from "../../components/Header/Header";
import Loading from "../../components/Loading/Loading";
import Table from "../../components/Table/Table";
import Bill from "../../components/Bill/Bill";
import CheckoutForm from "../../components/Checkout/CheckoutForm";

export class Checkout extends Component {
  state = {
    loading: true,
    products: [],
    buttonLoading: false,
    cardElementShowing: false,
    client_secret: null,
    intentId: null,
    transactionLoading: false // pop up with loading
  };

  componentDidMount = async () => {
    window.scrollTo(0, 0);
    fetch("/page/checkout/shop")
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.success) {
          this.setState({
            products: jsonRes.products,
            loading: false
          });
        } else if (jsonRes.cartEmpty) {
          this.setState({ loading: false, products: [] });
        } else {
          if (jsonRes.serverError) errorHandler.serverError(jsonRes);
          else {
            // some other error
            alert(jsonRes.message);
            this.props.history.push("/");
          }
        }
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  getTotalPrice = () => {
    if (this.state.products.length !== 0) {
      return this.state.products.reduce(
        (acc, product) => acc + product.price,
        0
      );
    } else return 0;
  };

  removeItem = id => {
    fetch("/transaction/cart", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ item: id })
    })
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.cartEmpty) alert("Carrello vuoto");
        if (jsonRes.success) window.location = window.location.pathname;
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  formatDateForTable = productsArray => {
    return productsArray.map(product => {
      return {
        imagine: product.images[0],
        nome: product.name,
        totale: product.price,
        rimuovi: (
          <i
            className="fas fa-times pointer"
            onClick={() => this.removeItem(product.id)}
          ></i>
        )
      };
    });
  };

  // submit order intent
  handleSubmit = () => {
    this.setState({ buttonLoading: true });
    fetch("/transaction/paymentIntent/shop", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({})
    })
      .then(res => res.json())
      .then(jsonRes => {
        if (jsonRes.unauthorized) {
          alert(jsonRes.message);
          window.location = window.location.pathname;
        } else if (jsonRes.success) {
          this.setState({
            cardElementShowing: true,
            buttonLoading: false,
            client_secret: jsonRes.client_secret,
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
    fetch("/transaction/paymentSuccess/shop", {
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ intentId: this.state.intentId })
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
    const checkoutBody = (
      <div>
        <p id="checkout-header">Checkout</p>
        <div id="checkout-cart">
          <p id="checkout-cart-header">carrello</p>
          <Table data={this.formatDateForTable(this.state.products)} />
        </div>
        <Bill items={[{ name: "Marketing", price: this.getTotalPrice() }]} />
        <div className="checkout-buttons-container">
          {this.state.cardElementShowing ? (
            <CheckoutForm
              client_secret={this.state.client_secret}
              billing_details={
                this.props.user
                  ? {
                      email: this.props.user.email,
                      address: this.props.user.address,
                      name: this.props.user.name.slice(1)
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
              className="button checkout-button lowercase"
              style={{ cursor: "not-allowed" }}
            >
              {it.checkout_session_loading}
            </p>
          ) : (
            <p className="button checkout-button" onClick={this.handleSubmit}>
              {it.checkout_confirm_button}
            </p>
          )}
        </div>
        <div
          className="transaction-loading centering"
          style={this.state.transactionLoading ? {} : { display: "none" }}
        >
          <div className="transaction-loading-contained">
            <p className="transaction-loading-header">
              Attendi il completamento della transazione...
            </p>
            <Loading />
          </div>
        </div>
      </div>
    );

    const emptyBody = (
      <div id="checkout-empty-cart" className="communication-panel">
        <p className="communication-panel-header">Il carrello è vuoto!</p>
        <p className="communication-panel-text">
          Seleziona i prodotti prima di procedere
        </p>
        <Link to="/spread" className="communication-panel-button button small">
          prodotti
        </Link>
      </div>
    );
    const body = this.state.products.length > 0 ? checkoutBody : emptyBody;
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

export default connect(mapStateToProps)(Checkout);
