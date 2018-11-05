import React from "react";
import { Subscribe } from "unstated";
import { Link } from "react-router-dom";

import auth from "../containers/AuthContainer";

class Header extends React.Component {
  componentDidMount() {
    auth.getCurrentUser();
  }
  generateNavItem = (isAuthenicated, user) => {
    if (isAuthenicated && user) {
      return (
        <div>
          <li className="nav-item">
            <Link className="nav-link active" to={"/"}>
              Home
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/create"}>
              <i className="ion-compose" />
              &nbsp;New Post
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/settings"}>
              <i className="ion-gear-a" />
              &nbsp;Settings
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={`/profile/${user._id}`}>
              {user.name}
            </Link>
          </li>
        </div>
      );
    } else {
      return (
        <div>
          <li className="nav-item">
            <Link className="nav-link" to={"/register"}>
              Sign up
            </Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to={"/login"}>
              Sign in
            </Link>
          </li>
        </div>
      );
    }
  };
  render() {
    return (
      <Subscribe to={[auth]}>
        {({ state: { isAuthenicated, auth } }) => (
          <nav className="navbar navbar-light">
            <div className="container">
              <Link className="navbar-brand" to="/">
                SELF Taught
              </Link>
              <ul className="nav navbar-nav pull-xs-right">
                {this.generateNavItem(isAuthenicated, auth)}
              </ul>
            </div>
          </nav>
        )}
      </Subscribe>
    );
  }
}

export default Header;
