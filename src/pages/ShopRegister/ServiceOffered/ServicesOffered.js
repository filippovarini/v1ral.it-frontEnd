import React, { Component } from "react";
import { connect } from "react-redux";
import "./serviceOffered.css";
import it from "../../../locales/it.json";
import Header from "../../../components/Header/Header";
import ServiceForm from "./ServicePriceForm";
import RegisterHeader from "../ShopRegisterHeader";
import Services from "../../../components/Services/Services";
import AddPrivWrapper from "./AddPriviledgeWrapper";

export class ServicesOffered extends Component {
  state = {
    maxPremiums: null,
    initialPrice: null,
    passExpiry: null,
    services: [],
    addInfoHidden: true,
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

  toggleAddService = () => {
    this.setState({
      addInfoHidden: !this.state.addInfoHidden
    });
  };

  /** Adds service to state */
  addInfo = service => {
    this.setState({
      services: [...this.state.services, service]
    });
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
      <div>
        <Header />
        <div className="page-wrapper">
          <RegisterHeader navState={2} />
          <div className="shop-register-body">
            <p className="register-warning">
              {it.shop_register_choose_priviledges}
            </p>
            <div className="shop-register-body">
              <div id="serviceOffered-body" className="flex-line">
                <Services
                  services={this.state.services}
                  adding={true}
                  handleAddClick={this.toggleAddService}
                  deleteService={this.removeService}
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
                <AddPrivWrapper
                  hidden={this.state.addInfoHidden}
                  hide={this.toggleAddService}
                  handleAdd={this.addInfo}
                />
              </div>
              <p
                className="button shop-register-button"
                onClick={this.handleSubmit}
              >
                PROSEGUI
              </p>
            </div>
          </div>
        </div>
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
