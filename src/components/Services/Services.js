import React, { Component } from "react";

/** Box showing services
 * @param services [{image, name, type}]
 * @param adding Boolean for whether user is editing
 * @param handleAddClick Function to fire if clicked add
 */
export class Services extends Component {
  render() {
    const adding = this.props.adding ? (
      <div
        className="serviceBox-container button fact-align"
        onClick={this.props.handleAddClick}
      >
        <i className="fas fa-plus fact-align-image sg-add-icon fact-title-small"></i>
        <p className="sg-add-title fact-title-small">Aggiungi</p>
      </div>
    ) : null;

    return (
      <div className="statistics-box box quick-facts quick-facts-wide quick-facts-margin">
        <p className="facts-header">privilegi</p>
        <div className="facts-container">
          {this.props.services
            ? this.props.services.map((service, i) => {
                return (
                  <div className="fact fact-align" key={i}>
                    <img
                      className={"fact-align-image " + service.type}
                      alt={"Imagine del servizio " + service.name}
                      src={service.image}
                    />

                    <p className="fact-title-small">{service.name}</p>
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
