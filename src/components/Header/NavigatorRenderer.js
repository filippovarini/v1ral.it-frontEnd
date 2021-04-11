import React, { Component } from "react";
import { connect } from "react-redux";
import removeCartItem from "../../functions/cart/remove";
import errorHandler from "../../functions/errorHandler";
import Navigator from "./Navigator";
import Cart from "../Cart/Cart";

export class NavigatorRenderer extends Component {
  state = {
    menuHidden: true,
    cartHidden: true,
    cart: [],
    cartLoading: true
  };

  toggleMenu = () => {
    this.setState({ menuHidden: !this.state.menuHidden });
  };

  handleWrapperClick = e => {
    if (e.target.id !== "nav-menu-icon") this.setState({ menuHidden: true });
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
  removeCartItem = async (id, type) => {
    this.setState({ cartLoading: true });
    const jsonRes = await removeCartItem(id, type);
    if (jsonRes.success) {
      this.showCart();
    } else if (jsonRes.cartEmpty) {
      alert("Il carrello è già vuoto!");
      this.setState({ cartHidden: true, cartLoading: false });
    } else errorHandler.serverError(jsonRes);
  };

  cartContainerClick = e => {
    if (e.target.id === "cart-container") {
      this.setState({ cartHidden: true });
      window.location = window.location.pathname;
    }
  };

  render() {
    return (
      <div className="nav-renderer flex-line">
        <div
          id="cart-container"
          className="slidebar-background-click"
          onClick={this.cartContainerClick}
          style={this.state.cartHidden ? { display: "none" } : null}
        >
          <Cart
            isShop={this.props.user.name && this.props.user.name[0] === "#"}
            items={this.state.cart}
            loading={this.state.cartLoading}
            removeItem={this.removeCartItem}
          />
        </div>
        <i
          id="nav-cart"
          onClick={this.showCart}
          className="fas fa-shopping-cart"
        ></i>
        {window.innerWidth > 800 ? (
          <Navigator />
        ) : (
          <div id="nav-menu">
            <i
              id="nav-menu-icon"
              className="fas fa-bars"
              onClick={this.toggleMenu}
            ></i>
            <div
              id="nav-menu-wrapper"
              onClick={this.handleWrapperClick}
              style={this.state.menuHidden ? { display: "none" } : null}
            >
              <Navigator />
            </div>{" "}
          </div>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps)(NavigatorRenderer);
