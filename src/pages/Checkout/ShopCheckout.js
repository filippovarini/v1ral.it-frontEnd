import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import errorHandler from "../../functions/errorHandler";
import "./checkout.css";

// loading
import Header from "../../components/Header/Header";
import Loading from "../../components/Loading/Loading";
import Table from "../../components/Table/Table";
import Bill from "../../components/Bill/Bill";

export class Checkout extends Component {
  state = {
    loading: true,
    products: []
  };

  componentDidMount = async () => {
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

  handleSubmit = () => {
    this.setState({ loading: true });
    fetch("/transaction/shopCheckout", {
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
          alert(
            "Errore con il carrello! Carrello vuoto o contenente items non validi"
          );
          window.location = window.location.pathname;
        } else if (jsonRes.success) {
          window.location = "/success/" + jsonRes.transactionId;
        } else {
          errorHandler.serverError(jsonRes);
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

  render() {
    const body =
      this.state.products.length > 0 ? (
        <div>
          <p id="checkout-header">Checkout</p>
          <div id="checkout-cart">
            <p id="checkout-cart-header">carrello</p>
            <Table data={this.formatDateForTable(this.state.products)} />
          </div>
          <Bill items={[{ name: "Marketing", price: this.getTotalPrice() }]} />
          <p className="button checkout-button" onClick={this.handleSubmit}>
            CHECKOUT
          </p>
        </div>
      ) : (
        <div id="checkout-empty-cart" className="communication-panel">
          <p className="communication-panel-header">Il carrello è vuoto!</p>
          <p className="communication-panel-text">
            Seleziona i prodotti prima di procedere
          </p>
          <Link
            to="/spread"
            className="communication-panel-button button-small"
          >
            prodotti
          </Link>
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
  return { user: state.user };
};

export default connect(mapStateToProps)(Checkout);
