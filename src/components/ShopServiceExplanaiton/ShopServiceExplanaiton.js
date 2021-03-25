import React, { Component } from "react";

import Services from "../Services/Services";
import Goals from "../Goals/Goals";

/** Returns the body of "where does the money go?" showing services and goals
 * @param services
 * @param goals
 */
export class ShopServiceExplanaiton extends Component {
  render() {
    return (
      <div>
        {" "}
        <p id="service-explanaiton" className="box">
          Contagiandoti in questo focolaio, aiuti questa impresa a rialzarsi
          dall'impatto del Covid-19 e acquisisci uno status di{" "}
          <b>cliente elite</b>. I clienti elite hanno diritto ai{" "}
          <b>privilegi</b> specificati.
          <br />I soldi saranno utilizzati per raggiungere gli <b>
            obbiettivi
          </b>{" "}
          specificati.
        </p>
        <div id="boxes-container" className="flex-line">
          <Services services={this.props.services || []} />
          <Goals goals={this.props.goals || []} />
        </div>
      </div>
    );
  }
}

export default ShopServiceExplanaiton;
