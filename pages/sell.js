import React, { Component } from "react";
import CreateItems from "../components/CreateItem";
import PleaseSignIn from "../components/PleaseSignIn";
class Sell extends Component {
  render() {
    return (
      <PleaseSignIn>
        <CreateItems />
      </PleaseSignIn>
    );
  }
}

export default Sell;
