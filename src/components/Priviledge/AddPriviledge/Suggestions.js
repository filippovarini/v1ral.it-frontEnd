import React, { Component } from "react";
import PrivBox from "../Priviledges/PrivBox";
import it from "../../../locales/it.json";

// faq data
const choosenPriviledges = [
  {
    title: "Test priviledge 1",
    description:
      "Est velit in dolore Lorem fugiat fugiat id sit ad sint pariatur mollit amet fugiat. Lorem qui exercitation amet velit commodo Lorem ut culpa "
  },
  {
    title: "Test priviledge 1",
    description:
      "Est velit in dolore Lorem fugiat fugiat id sit ad sint pariatur mollit amet fugiat. Lorem qui exercitation amet velit commodo Lorem ut culpa "
  },
  {
    title: "Test priviledge 1",
    description:
      "Est velit in dolore Lorem fugiat fugiat id sit ad sint pariatur mollit amet fugiat. Lorem qui exercitation amet velit commodo Lorem ut culpa "
  },
  {
    title: "Test priviledge 1",
    description:
      "Est velit in dolore Lorem fugiat fugiat id sit ad sint pariatur mollit amet fugiat. Lorem qui exercitation amet velit commodo Lorem ut culpa "
  }
];

/** Renders priv suggestions based on type and shop category
 * @param type
 * @param category
 */
export class Suggestions extends Component {
  render() {
    return (
      <div id="suggestions">
        <p id="suggestions-header">
          {it.shop_register_suggested_privs}{" "}
          <i
            style={{ position: "relative", top: "2px" }}
            className="fas fa-chevron-down"
          ></i>
        </p>
        <div className="flex-line dark-box-body">
          {choosenPriviledges.map((priv, i) => (
            <PrivBox priv={priv} key={i} />
          ))}
        </div>
      </div>
    );
  }
}

export default Suggestions;
