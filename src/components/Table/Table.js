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
    const data = this.props.data;
    return data ? (
      <table>
        <tbody>
          <tr>
            {Object.keys(data[0]).map(key => {
              return <th key={key}>{key}</th>;
            })}
          </tr>
          {data.map((row, i1) => {
            return (
              <tr key={i1}>
                {Object.values(row).map((value, i2) => {
                  let content = value;
                  if (isLink(value)) {
                    content = (
                      <img src={value} className="table-image" alt="logo" />
                    );
                  }
                  return <td key={i2}>{content}</td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    ) : null;
  }
}

export default Table;
