import React, { Component, Fragment } from "react";
import { Query, Mutation } from "react-apollo";
import Error from "./ErrorMessage";
import gql from "graphql-tag";
import Table from "./styles/Table";
import SickButton from "./styles/SickButton";
const ALL_USERS_QUERY = gql`
  query {
    users {
      id
      name
      email
      permission
    }
  }
`;

const UPDATE_PERMISSIONS_MUTATION = gql`
  mutation UPDATE_PERMISSIONS_MUTATION(
    $permissions: [Permission]
    $userId: ID!
  ) {
    updatePermissions(permissions: $permissions, userId: $userId) {
      id
      permission
      name
      email
    }
  }
`;

const POSSIBLE_PERMISSIONS = [
  "ADMIN",
  "USER",
  "ITEMCREATE",
  "ITEMUPDATE",
  "ITEMDELETE",
  "PERMISSIONUPDATE"
];
const Permissions = props => (
  <Query query={ALL_USERS_QUERY}>
    {({ data, loading, error }) => {
      return (
        <div>
          <Error error={error} />
          <div>
            <h2>Manage Permissions</h2>
            <Table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  {POSSIBLE_PERMISSIONS.map(pms => (
                    <th key={pms}>{pms}</th>
                  ))}
                  <th />
                </tr>
              </thead>
              <tbody>
                {data.users.map(user => (
                  <UserPermissions user={user} key={user.id} />
                ))}
              </tbody>
            </Table>
          </div>
        </div>
      );
    }}
  </Query>
);

class UserPermissions extends Component {
  state = {
    permissions: this.props.user.permission
  };
  handlePermissionChange = e => {
    const checkbox = e.target;
    let updatedPermissions = [...this.state.permissions];
    if (checkbox.checked) {
      updatedPermissions.push(checkbox.value);
    } else {
      updatedPermissions = updatedPermissions.filter(
        pms => pms !== checkbox.value
      );
    }
    this.setState({
      permissions: updatedPermissions
    });
  };
  render() {
    const { user } = this.props;
    return (
      <Mutation
        mutation={UPDATE_PERMISSIONS_MUTATION}
        variables={{
          permissions: this.state.permissions,
          userId: user.id
        }}
      >
        {(updatePermissions, { loading, error }) => (
          <Fragment>
            {error && (
              <tr>
                <td colSpan={8}>
                  <Error error={error} />
                </td>
              </tr>
            )}
            <tr>
              <td>{user.name}</td>
              <td>{user.email}</td>
              {POSSIBLE_PERMISSIONS.map(pms => (
                <td key={pms}>
                  <label htmlFor={`${user.id}-permission-${pms}`}>
                    <input
                      id={`${user.id}-permission-${pms}`}
                      type="checkbox"
                      checked={this.state.permissions.includes(pms)}
                      value={pms}
                      onChange={this.handlePermissionChange}
                    />
                  </label>
                </td>
              ))}
              <td>
                <SickButton
                  onClick={updatePermissions}
                  disabled={loading}
                  type="button"
                >
                  {loading ? "Updating" : "Update"}
                </SickButton>
              </td>
            </tr>
          </Fragment>
        )}
      </Mutation>
    );
  }
}

export default Permissions;
