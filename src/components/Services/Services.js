import React, { Component } from "react";

/** Box showing services
 * @param: services: [{image, name, type}]
 */
export class Services extends Component {
  render() {
    return (
      <div className="statistics-box box quick-facts quick-facts-wide quick-facts-margin">
        <p className="facts-header">privilegi</p>
        <div className="facts-container">
          {this.props.services.map((service, i) => {
            return (
              <div className="fact fact-align" key={i}>
                <img
                  className={"fact-align-image " + service.type}
                  src={service.image}
                />

                <p className="fact-title-small">{service.name}</p>
              </div>
            );
          })}
        </div>
      </div>
    );
  }
}

export default Services;
