import React, { Component } from "react";
import ResetPassword from "../components/Reset";
class ResetPage extends Component {
  render() {
    return <ResetPassword resetToken={this.props.query.resetToken} />;
  }
}

export default ResetPage;
