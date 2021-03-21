import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import errorHandler from "../../errorHandler";
import "./checkout.css";

// loading
import Header from "../../components/Header/Header";
import Loading from "../../components/Loading/Loading";
import Table from "../../components/Table/Table";
import InsertUser from "./components/InsertUser";

export class Checkout extends Component {
  state = {
    loading: true,
    shops: [],
    isLogged: false,
    challenger: false
  };

  componentDidMount = () => {
    fetch("/page/checkout")
      .then(res => res.json())
      .then(jsonRes => {
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
                shops: jsonRes.shops,
                isLogged: jsonRes.isLogged,
                challenger: jsonRes.challenger
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

  removeItem = id => {
    fetch("/shop/removeFromCart", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      },
      body: JSON.stringify({ shopId: id })
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

  formatDateForTable = shopsArray => {
    return shopsArray.map(shop => {
      return {
        logo: shop.logourl,
        nome: shop.name,
        categoria: shop.category,
        totale: shop.currentprice,
        rimuovi: (
          <i
            className="fas fa-times pointer"
            onClick={() => this.removeItem(shop.id)}
          ></i>
        )
      };
    });
  };

  render() {
    const body =
      this.state.shops.length > 0 ? (
        <div>
          <p id="checkout-header">Checkout</p>
          <div id="checkout-cart">
            <p id="checkout-cart-header">carrello</p>
            <Table data={this.formatDateForTable(this.state.shops)} />
          </div>
          <div id="checkout-user">
            {this.state.isLogged ? null : (
              <InsertUser challenger={this.state.challenger} />
            )}
          </div>
        </div>
      ) : (
        <div id="checkout-empty-cart" className="communication-panel">
          <p className="communication-panel-header">Il carrello è vuoto!</p>
          <p className="communication-panel-text">
            Seleziona dei focolai in cui contagiarti per continuare
          </p>
          <Link to="/shops" className="communication-panel-button button-small">
            focolai
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
