import React from "react";
import AuthContainer from "../containers/AuthContainer";
import { Subscribe } from "unstated";
import { Link } from "react-router-dom";

class Register extends React.Component {
  nameInput = React.createRef();
  emailInput = React.createRef();
  passwordInput = React.createRef();
  handleClick = registerUser => () => {
    let name = this.nameInput.current.value;
    let email = this.emailInput.current.value;
    let password = this.passwordInput.current.value;
    //console.log({ name: name, email: email, password: password });
    registerUser(
      { name: name, email: email, password: password },
      this.props.history
    );
  };
  render() {
    return (
      <Subscribe to={[AuthContainer]}>
        {({ registerUser }) => (
          <div className="auth-page">
            <div className="container page">
              <div className="row">
                <div className="col-md-6 offset-md-3 col-xs-12">
                  <h1 className="text-xs-center">Sign up</h1>
                  <p className="text-xs-center">
                    <Link to={"/login"}>Have an account?</Link>
                  </p>

                  {/* <ul className="error-messages">
                    <li>That email is already taken</li>
                  </ul> */}

                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Your Name"
                      ref={this.nameInput}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="text"
                      placeholder="Email"
                      ref={this.emailInput}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      className="form-control form-control-lg"
                      type="password"
                      placeholder="Password"
                      ref={this.passwordInput}
                    />
                  </fieldset>
                  <button
                    className="btn btn-lg btn-primary pull-xs-right"
                    onClick={this.handleClick(registerUser)}
                  >
                    Sign up
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </Subscribe>
    );
  }
}

export default Register;
