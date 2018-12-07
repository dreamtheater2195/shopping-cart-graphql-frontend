import React, { Component } from "react";
import Items from "../components/Items";
class Home extends Component {
  render() {
    return <Items page={parseInt(this.props.query.page || 1)} />;
  }
}

export default Home;
