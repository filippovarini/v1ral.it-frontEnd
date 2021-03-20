/* PROPS:
titles: [{name, handleClick}] */

import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import errorHandler from "../../errorHandler";
import "./header.css";

import Cart from "../Cart/Cart";

export class Navigator extends Component {
  state = {
    cartHidden: true,
    cart: [],
    cartLoading: true
  };
  // redirects the user to the relative dashboard page
  redirect = username => {
    const path = username[0] === "@" ? "/user" : "/shop";
    this.props.history.push("/dashboard" + path);
  };

  /** Reguests the cart info (validating cart ids) */
  showCart = () => {
    this.setState({ cartHidden: false });
    fetch("/page/checkout")
      .then(res => res.json())
      .then(jsonRes => {
        if (!jsonRes.success) {
          if (jsonRes.cartEmpty)
            this.setState({ cart: [], cartLoading: false });
          else errorHandler.serverError();
        } else
          this.setState({
            cart: jsonRes.shops,
            cartLoading: false,
            cartHidden: false
          });
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  /** Sends request to remove from cart and then calls showCart
   * @todo optimize (single query)
   */
  removeCartItem = id => {
    this.setState({ cartLoading: true });
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
        if (jsonRes.success) {
          this.showCart();
        } else if (jsonRes.cartEmpty) {
          alert("Il carrello è già vuoto!");
          this.setState({ cartHidden: true, cartLoading: false });
        } else errorHandler.serverError(jsonRes);
      })
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  cartContainerClick = e => {
    if (e.target.id === "cart-container") {
      this.setState({ cartHidden: true });
      window.location = window.location.pathname;
    }
  };

  handleLogout = () => {
    fetch("/logout", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json"
      }
    })
      .then(res => res.json())
      .then(jsonRes => (window.location = "/"))
      .catch(e => {
        console.log(e);
        errorHandler.clientError();
      });
  };

  render() {
    const titles = this.props.user.name
      ? [
          { name: "carrello", handleClick: this.showCart },
          { name: "vision", handleClick: () => alert("vision") },
          { name: "logout", handleClick: this.handleLogout }
        ]
      : [
          { name: "carrello", handleClick: this.showCart },
          { name: "vision", handleClick: () => alert("vision") },
          {
            name: "diventa virale",
            handleClick: () => alert("diventa virale")
          },
          {
            name: "login",
            handleClick: () => this.props.history.push("/login")
          }
        ];
    return (
      <div id="header-nav" className={this.props.class}>
        <div
          id="cart-container"
          onClick={this.cartContainerClick}
          style={this.state.cartHidden ? { height: "0px" } : null}
        >
          <Cart
            loading={this.state.cartLoading}
            shops={this.state.cart}
            removeItem={this.removeCartItem}
          />
        </div>
        {titles.map((title, i) => {
          return (
            <div
              key={i}
              className="header-nav-item"
              onClick={title.handleClick}
            >
              <p className="header-nav-title">{title.name}</p>
            </div>
          );
        })}
        {this.props.user.name ? (
          <div
            key={-1}
            className="header-nav-item"
            onClick={() => this.redirect(this.props.user.name)}
          >
            <img
              src={this.props.user.userProfile}
              alt="Imagine profilo dell'utente"
              className="header-nav-title header-nav-image"
            />
          </div>
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps)(withRouter(Navigator));
