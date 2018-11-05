import React from "react";
import AuthContainer from "../containers/AuthContainer";
import { Subscribe } from "unstated";
import { Link } from "react-router-dom";

class Login extends React.Component {
  emailInput = React.createRef();
  passwordInput = React.createRef();
  handleClick = loginUser => () => {
    let email = this.emailInput.current.value;
    let password = this.passwordInput.current.value;
    //console.log({ name: name, email: email, password: password });
    loginUser({ email: email, password: password }, this.props.history);
  };
  render() {
    return (
      <Subscribe to={[AuthContainer]}>
        {({ state: { errors }, loginUser }) => (
          <div className="auth-page">
            <div className="container page">
              <div className="row">
                <div className="col-md-6 offset-md-3 col-xs-12">
                  <h1 className="text-xs-center">Sign in</h1>
                  <p className="text-xs-center">
                    <Link to={"/register"}>
                      Don't have account? Register now
                    </Link>
                  </p>
                  {errors ? (
                    <ul className="error-messages">
                      <li>That email or password is not true</li>
                    </ul>
                  ) : (
                    ""
                  )}

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
                    onClick={this.handleClick(loginUser)}
                  >
                    Login
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

export default Login;
