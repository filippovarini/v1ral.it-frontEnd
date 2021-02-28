/* PROPS
data: [{}] */

import React, { Component } from "react";

const isLink = value => {
  return (
    String(value).startsWith("http://") || String(value).startsWith("https://")
  );
};

export class Table extends Component {
  render() {
    return (
      <table>
        <tr>
          {Object.keys(this.props.data[0]).map(key => {
            return <th key={key}>{key}</th>;
          })}
        </tr>
        {this.props.data.map(data => {
          return (
            <tr>
              {Object.values(data).map(value => {
                if (isLink(value)) {
                  return (
                    <td>
                      <img src={value} className="table-image" alt="logo" />
                    </td>
                  );
                }
                return <td>{value}</td>;
              })}
            </tr>
          );
        })}
      </table>
    );
  }
}

export default Table;
