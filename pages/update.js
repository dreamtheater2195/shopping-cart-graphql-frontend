import React, { Component } from "react";
import UpdateItem from "../components/UpdateItem";
class Update extends Component {
  render() {
    return <UpdateItem id={this.props.query.id} />;
  }
}

export default Update;
