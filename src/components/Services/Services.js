import React, { Component } from "react";

import it from "../../locales/it.json";

import ViralTick from "../ViralUserTick/ViralUserTick";

/** Box showing services
 * @param services [{image, name, type}]
 * @param adding? Boolean for whether user is editing
 * @param deleteService()? delete priviledge (only when adding)
 * @param handleAddClick Function to fire if clicked add
 */
export class Services extends Component {
  render() {
    const adding = this.props.adding ? (
      <div
        className=" button fact-align small style3"
        onClick={this.props.handleAddClick}
      >
        <i className="fas fa-plus fact-align-image sg-add-icon fact-title-small"></i>
        <p className="sg-add-title fact-title-small">Aggiungi</p>
      </div>
    ) : null;

    return (
      <div className=" box quick-facts wide quick-facts-margin">
        <p className="facts-header">{it.shop_priviledges_offered}</p>
        <div className="facts-container">
          {this.props.services
            ? this.props.services
                .sort((a, b) => {
                  return a.type.localeCompare(b.type);
                })
                .map((service, i) => {
                  return (
                    <div className="fact fact-align" key={i}>
                      <div id="fact-align-image-wrapper">
                        <img
                          className="fact-align-image "
                          alt={"Imagine del servizio " + service.name}
                          src={service.image}
                        />
                        {service.type === "viral" ? (
                          <div className="fact-image-viral">
                            <ViralTick />
                          </div>
                        ) : null}
                      </div>
                      <p className="fact-title-small">{service.name}</p>
                      {this.props.adding ? (
                        <i
                          className="fas fa-times hide-cross"
                          onClick={() => this.props.deleteService(i)}
                        ></i>
                      ) : null}
                    </div>
                  );
                })
            : null}
          {adding}
        </div>
      </div>
    );
  }
}

export default Services;
