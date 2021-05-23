import React, { Component } from "react";
import { connect } from "react-redux";
import "./stock.css";
import it from "../../../locales/it.json";
import errorHandler from "../../../functions/errorHandler";

import Priviledges from "../../../components/Priviledge/Priviledges/Priviledges";
import ServiceForm from "./StockForm";
import RegisterHeader from "../components/ShopRegisterHeader";
import AddPrivWrapper from "./AddPriviledgeWrapper";
import Buttons from "../components/Buttons";

export class ServicesOffered extends Component {
  state = {
    priviledges: [],
    addingV1ralPass: false,
    addingStock: false,
    stockMonthDuration: null,
    stockNumber: null,
    initialPrice: null,
    check1: false,
    error: null,
    loading: false
  };

  componentDidMount = () => {
    window.scrollTo(0, 0);
    if (!this.props.shopRegister) this.props.history.push("/shop/register/bio");
    else if (!this.props.shopRegister.bio)
      this.props.history.push("/shop/register/bio");
    else if (!this.props.shopRegister.credentials)
      this.props.history.push("/shop/register/credentials");
  };

  /** Hides the box where user can add a priviledge. */
  hideAdder = () => {
    this.setState({
      addingV1ralPass: false,
      addingStock: false
    });
  };

  /** Adds priv to state */
  addPriv = priv => {
    this.setState({
      priviledges: [...this.state.priviledges, priv],
      error: null
    });
  };

  /** Removes service by position in array */
  removePriv = priv => {
    this.setState({
      priviledges: this.state.priviledges.filter(
        statePriv =>
          statePriv.title !== priv.title &&
          statePriv.description !== priv.description
      )
    });
  };

  handleChange = e => {
    this.setState({
      [e.target.id]: e.target.value,
      error: null
    });
  };

  validFields = () => {
    if (
      !this.state.stockMonthDuration ||
      !this.state.stockNumber ||
      !this.state.initialPrice
    ) {
      this.setState({ error: "Compila tutti i campi" });
      return false;
    }
    return true;
  };

  validPrivs = () => {
    if (
      this.state.priviledges.filter(priv => priv.type === "stock").length === 0
    ) {
      this.setState({ error: "Aggiungi almeno un privilegio nella Stock" });
      return false;
    } else if (
      this.state.priviledges.filter(priv => priv.type === "v1ralPass")
        .length === 0
    ) {
      this.setState({ error: "Aggiungi almeno un privilegio nel V1ral Pass" });
      return false;
    }
    return true;
  };

  validCheckboxes = () => {
    if (!this.state.check1) {
      this.setState({ error: "Spunta la casella" });
      return false;
    }
    return true;
  };

  /** Stores new shop to db in backend */
  handleSubmit = () => {
    if (this.validPrivs() && this.validCheckboxes() && this.validFields()) {
      this.setState({ loading: true });
      const stock = {
        priviledges: this.state.priviledges,
        stockNumber: this.state.stockNumber,
        initialPrice: this.state.initialPrice,
        stockMonthDuration: this.state.stockMonthDuration
      };

      const body = {
        stock,
        profile: this.props.shopRegister.bio,
        credentials: this.props.shopRegister.credentials
      };

      fetch("/shop/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Accept: "application/json"
        },
        body: JSON.stringify(body)
      })
        .then(res => res.json())
        .then(jsonRes => {
          console.log(jsonRes);
          if (jsonRes.success) {
            window.location = "/shop/register/done";
          } else {
            this.setState({ error: jsonRes.message, loading: false });
            if (jsonRes.serverError) {
              errorHandler.serverError(jsonRes);
            }
          }
        })
        .catch(e => {
          console.log(e);
          errorHandler.clientError();
        });
    }
  };

  render() {
    return (
      <div className="page-wrapper">
        <RegisterHeader navState={2} />
        <div className="shop-register-body">
          <p className="shop-register-body-header">
            {it.shop_register_stock_header}
          </p>

          <Priviledges
            priviledges={this.state.priviledges.filter(
              priv => priv.type === "v1ralPass"
            )}
            header="V1ral Pass"
            addPriviledge={() => this.setState({ addingV1ralPass: true })}
            removePriv={this.removePriv}
          />

          <Priviledges
            priviledges={this.state.priviledges.filter(
              priv => priv.type === "stock"
            )}
            header="Stock"
            addPriviledge={() => this.setState({ addingStock: true })}
            removePriv={this.removePriv}
          />

          <ServiceForm
            stockNumber={this.state.stockNumber}
            initialPrice={this.state.initialPrice}
            stockMonthDuration={this.state.stockMonthDuration}
            handleChange={this.handleChange}
            handleSubmit={this.handleSubmit}
            toggleCheck1={() =>
              this.setState({ check1: !this.state.check1, error: null })
            }
          />
          <Buttons
            handleClickNext={this.handleSubmit}
            handleClickPrev={() =>
              this.props.history.push("/shop/register/credentials")
            }
            error={this.state.error}
            loading={this.state.loading}
          />
        </div>
        <AddPrivWrapper
          hidden={!this.state.addingStock && !this.state.addingV1ralPass}
          hide={this.hideAdder}
          type={this.state.addingStock ? "stock" : "v1ralPass"}
          handleAdd={this.addPriv}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    shopRegister: state.shopRegister
  };
};

export default connect(mapStateToProps)(ServicesOffered);
