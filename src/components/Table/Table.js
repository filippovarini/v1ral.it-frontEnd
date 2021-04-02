import React, { Component } from "react";
import "./table.css";

const isLink = value => {
  return (
    String(value).startsWith("http://") || String(value).startsWith("https://")
  );
};

/** Renders a table of data
 * @param data [{name_of_column, value}]
 * @param handleClick? function to call on click by passing id as a parameter
 * @param firstId? whether the value in the objects is the id that
 * should be hidden
 */
export class Table extends Component {
  render() {
    const data = this.props.data;
    return data && data.length !== 0 ? (
      <div className={`table-wrapper ${this.props.class}`}>
        <table>
          <tbody>
            <tr>
              {Object.keys(data[0])
                .filter((_, i) => !this.props.firstId || i !== 0)
                .map((key, i) => (
                  <th key={key}>{key}</th>
                ))}
            </tr>
            {data.map((row, i1) => {
              return (
                <tr
                  key={i1}
                  className={this.props.handleClick ? "hoverable" : null}
                  onClick={
                    this.props.handleClick
                      ? () => this.props.handleClick(row.id)
                      : null
                  }
                >
                  {Object.values(row)
                    .filter((_, i2) => !this.props.firstId || i2 !== 0)
                    .map((value, i2) => {
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
      </div>
    ) : (
      <div id="empty-table">
        <p id="empty-table-header">Nessun risultato</p>
        <p id="empty-table-text">
          Prova a cambiare i tuoi parametri di ricerca
        </p>
      </div>
    );
  }
}

export default Table;
