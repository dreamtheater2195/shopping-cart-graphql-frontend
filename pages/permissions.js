import React, { Component } from "react";
import Permissions from "../components/Permissions";
import PleaseSignIn from "../components/PleaseSignIn";
class PermissionsPage extends Component {
  render() {
    return (
      <PleaseSignIn>
        <Permissions />
      </PleaseSignIn>
    );
  }
}

export default PermissionsPage;
