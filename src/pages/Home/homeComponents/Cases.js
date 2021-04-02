/* find
shops: [{logo, name, category, goalsDone (correct format), cases}] */

import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import errorHandler from "../../../functions/errorHandler";

// language
import it from "../../../locales/it.json";

import Table from "../../../components/Table/Table";
import Loading from "../../../components/Loading/Loading";
import ViralTick from "../../../components/ViralUserTick/ViralUserTick";

export class Shops extends Component {
  state = {
    loading: true,
    originalUsers: null,
    displayingUsers: null,
    userSearchSI: null
  };

  componentDidMount = () => {
    if (!this.state.displayingUsers) {
      fetch("page/home/users")
        .then(res => res.json())
        .then(jsonRes => {
          if (jsonRes.success)
            this.setState({
              displayingUsers: jsonRes.userList,
              originalUsers: jsonRes.userList
            });
          else errorHandler.serverError(jsonRes);
          this.setState({ loading: false });
        })
        .catch(e => {
          console.log(e);
          errorHandler.clientError();
        });
    }
  };

  /** Formats data for the table */
  formatDataForTable = () => {
    if (!this.state.displayingUsers) return null;
    else
      return this.state.displayingUsers.map(infoObj => {
        return {
          id: infoObj.username,
          [it.user_profile_image]: infoObj.profileurl,
          [it.user_username]: (
            <p>
              {infoObj.username}
              {infoObj.type === "viral" ? <ViralTick class="small" /> : null}
            </p>
          ),
          [it.rt_index_contracted]: infoObj.rt,
          [it.user_shops_supported]: infoObj.number
        };
      });
  };

  handleChange = e => {
    const searchWords = e.target.value.split(" ");
    const filteredUsers = this.state.originalUsers.filter(userObj => {
      let matchAllSearchWords = true;
      searchWords.forEach(word => {
        if (!userObj.username.toLowerCase().includes(word.toLowerCase())) {
          matchAllSearchWords = false;
        }
      });
      return matchAllSearchWords;
    });
    this.setState({
      displayingUsers: filteredUsers
    });
    this.setState({ userSearchSI: e.target.value });
  };

  handleSubmit = e => {
    e.preventDefault();
    alert(this.state.userSearchSI);
  };

  /** Click a table row (user) to see a user */
  handleClick = username => {
    this.props.history.push("/user/profile/" + username);
  };

  render() {
    return (
      <div id="shops-container" className={this.props.class}>
        <form
          className="flex-line home-search-bar"
          // onSubmit={this.handleSubmit}
        >
          <input
            type="text"
            onChange={this.handleChange}
            className="home-search-input"
            placeholder="cerca contagiato"
          />
        </form>
        {!this.state.loading && this.state.displayingUsers ? (
          <Table
            data={this.formatDataForTable()}
            firstId={true}
            handleClick={this.handleClick}
            class="overflow"
          />
        ) : (
          <Loading />
        )}
      </div>
    );
  }
}

export default withRouter(Shops);
