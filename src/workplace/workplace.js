import React, { Component } from "react";
import { connect } from "react-redux";
import "./workplace.css";

import Services from "../components/Services/Services";
import Goals from "../components/Goals/Goals";

export class workplace extends Component {
  shit = () => {
    this.props.dispatch({
      type: "SET-USER",
      user: { name: "Filippo", userProfile: "oirgnoerwgnowon" }
    });
  };
  render() {
    return (
      <div id="workplace">
        <p onClick={this.shit}>click me</p>
        <p>{this.props.user.name}</p>
        <p>{this.props.user.userProfile}</p>
        <Services
          services={[
            {
              shop: 1,
              name: "test service 1",
              image:
                "https://asclepion.com/wp-content/uploads/2014/10/Asclepion-Laser-Technologies-Services-and-Support.jpg",
              type: "standard"
            },
            {
              shop: 1,
              name: "test service 2",
              image:
                "https://asclepion.com/wp-content/uploads/2014/10/Asclepion-Laser-Technologies-Services-and-Support.jpg",
              type: "standard"
            },
            {
              shop: 1,
              name: "test service 3",
              image:
                "https://asclepion.com/wp-content/uploads/2014/10/Asclepion-Laser-Technologies-Services-and-Support.jpg",
              type: "standard"
            },
            {
              shop: 1,
              name: "test service 4",
              image:
                "https://asclepion.com/wp-content/uploads/2014/10/Asclepion-Laser-Technologies-Services-and-Support.jpg",
              type: "viral"
            }
          ]}
        />
        <Goals
          goals={[
            {
              shop: 1,
              name: "Riassumere i miei dipendenti",
              amount: 2000
            },
            {
              shop: 1,
              name: "Ristrutturare",
              amount: 2000
            }
          ]}
        />
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};

export default connect(mapStateToProps)(workplace);
