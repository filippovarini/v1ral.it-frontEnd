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
    return (
      <table>
        <tbody>
          <tr>
            {Object.keys(data[0]).map(key => {
              return <th key={key}>{key}</th>;
            })}
          </tr>
          {data.map(row => {
            return (
              <tr key={data.indexOf(row)}>
                {Object.values(row).map(value => {
                  let content = value;
                  if (isLink(value)) {
                    content = (
                      <img src={value} className="table-image" alt="logo" />
                    );
                  }
                  return (
                    <td key={Object.values(row).indexOf(value)}>{content}</td>
                  );
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    );
  }
}

export default Table;
