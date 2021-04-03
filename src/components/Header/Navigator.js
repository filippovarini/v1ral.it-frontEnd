import React, { Component } from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import errorHandler from "../../functions/errorHandler";
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
    this.props.history.push(path + "/dashboard");
  };

  showCart = () => {
    this.setState({ cartHidden: false });
    fetch("/transaction/cart")
      .then(res => res.json())
      .then(jsonRes => {
        if (!jsonRes.success) {
          if (jsonRes.cartEmpty)
            this.setState({ cart: [], cartLoading: false });
          else errorHandler.serverError();
        } else
          this.setState({
            cart: jsonRes.items,
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
   * @param id of cart item to be removed
   */
  removeCartItem = id => {
    this.setState({ cartLoading: true });
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
    let titles = this.props.user.name
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
      <div id="header-nav">
        <div
          id="cart-container"
          className="slidebar-background-click"
          onClick={this.cartContainerClick}
          style={this.state.cartHidden ? { height: "0px" } : null}
        >
          <Cart
            isShop={this.props.user.name && this.props.user.name[0] === "#"}
            items={this.state.cart}
            loading={this.state.cartLoading}
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
