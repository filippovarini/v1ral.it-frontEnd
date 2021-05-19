import React, { Component } from "react";
import { connect } from "react-redux";
import "./stock.css";
import it from "../../../locales/it.json";

import Priviledges from "../../../components/Priviledges/Priviledges";
import ServiceForm from "./StockForm";
import RegisterHeader from "../components/ShopRegisterHeader";
import AddPrivWrapper from "./AddPriviledgeWrapper";

export class ServicesOffered extends Component {
  state = {
    priviledges: [
      {
        type: "stock",
        title: "Sconto del 10% il sabato",
        description:
          "Irure deserunt velit amet est anim sunt est ea velit. Aliqua eiusmod aliqua Lorem ex culpa amet. Do elit duis dolor consequat ipsum quis deserunt incididunt anim ea pariatur."
      },
      {
        type: "stock",
        title: "Sconto del 10% il sabato",
        description:
          "Irure deserunt velit amet est anim sunt est ea velit. Aliqua eiusmod aliqua Lorem ex culpa amet. Do elit duis dolor consequat ipsum quis deserunt incididunt anim ea pariatur."
      },
      {
        type: "v1ralPass",
        title: "Sconto del 10% il sabato",
        description:
          "Irure deserunt velit amet est anim sunt est ea velit. Aliqua eiusmod aliqua Lorem ex culpa amet. Do elit duis dolor consequat ipsum quis deserunt incididunt anim ea pariatur."
      },
      {
        type: "v1ralPass",
        title: "Sconto del 10% il sabato",
        description:
          "Irure deserunt velit amet est anim sunt est ea velit. Aliqua eiusmod aliqua Lorem ex culpa amet. Do elit duis dolor consequat ipsum quis deserunt incididunt anim ea pariatur."
      },
      {
        type: "v1ralPass",
        title: "Sconto del 10% il sabato",
        description:
          "Irure deserunt velit amet est anim sunt est ea velit. Aliqua eiusmod aliqua Lorem ex culpa amet. Do elit duis dolor consequat ipsum quis deserunt incididunt anim ea pariatur."
      }
    ],
    addingV1ralPass: false,
    addingStock: false,

    maxPremiums: null,
    initialPrice: null,
    passExpiry: null,
    error: null,
    check1: false
  };

  componentDidMount = () => {
    window.scrollTo(0, 0);
    if (!this.props.shopRegister) this.props.history.push("/shop/register/bio");
    else if (!this.props.shopRegister.bio)
      this.props.history.push("/shop/register/bio");
    else if (!this.props.shopRegister.credentials)
      this.props.history.push("/shop/register/credentials");
    else if (
      this.props.shopRegister.services &&
      this.props.shopRegister.services.maxPremiums
    ) {
      this.setState({
        services: this.props.shopRegister.services.services,
        maxPremiums: this.props.shopRegister.services.maxPremiums,
        initialPrice: this.props.shopRegister.services.initialPrice,
        passExpiry: this.props.shopRegister.services.passExpiry
      });
    }
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
    console.log(priv);
    this.setState({
      priviledges: [...this.state.priviledges, priv]
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
      !this.state.maxPremiums ||
      !this.state.initialPrice ||
      !this.state.passExpiry
    ) {
      this.setState({ error: "Compila tutti i campi" });
      return false;
    }
    return true;
  };

  validServices = () => {
    if (this.state.services.length === 0) {
      this.setState({ error: "Aggiungi almeno un privilegio" });
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

  /** Removes service by position in array */
  removeService = position => {
    this.setState({
      services: this.state.services.filter((_, i) => i !== position)
    });
  };

  handleSubmit = () => {
    if (this.validCheckboxes() && this.validFields() && this.validServices()) {
      this.props.dispatch({
        type: "SET-SERVICES",
        services: {
          services: this.state.services,
          maxPremiums: this.state.maxPremiums,
          initialPrice: this.state.initialPrice,
          passExpiry: this.state.passExpiry
        }
      });
      this.props.history.push("/shop/register/goals");
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
          />

          <Priviledges
            priviledges={this.state.priviledges.filter(
              priv => priv.type === "stock"
            )}
            header="Stock"
            addPriviledge={() => this.setState({ addingStock: true })}
          />

          <ServiceForm
            handleChange={this.handleChange}
            error={this.state.error}
            handleSubmit={this.handleSubmit}
            maxPremiums={this.state.maxPremiums}
            initialPrice={this.state.initialPrice}
            passExpiry={this.state.passExpiry}
            toggleCheck1={() =>
              this.setState({ check1: !this.state.check1, error: null })
            }
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
