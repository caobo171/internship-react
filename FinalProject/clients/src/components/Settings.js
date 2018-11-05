import React from "react";
import { Subscribe } from "unstated";
import userContainer from "../containers/UserContainer";
import auth from "../containers/AuthContainer";

class Settings extends React.Component {
  imgInput = React.createRef();
  nameInput = React.createRef();
  aboutInput = React.createRef();
  emailInput = React.createRef();
  passwordInput = React.createRef();
  handleClick = updateUser => () => {
    let imgUrl = this.imgInput.current.value;
    let name = this.nameInput.current.value;
    let about = this.aboutInput.current.value;
    let email = this.emailInput.current.value;
    let password = this.passwordInput.current.value;
    updateUser({
      imgUrl: imgUrl,
      name: name,
      about: about,
      email: email,
      password: password
    });
  };
  render() {
    return (
      <Subscribe to={[userContainer, auth]}>
        {({ updateUser }, { state: { auth }, logOut }) => (
          <div className="settings-page">
            <div className="container page">
              <div className="row">
                <div className="col-md-6 offset-md-3 col-xs-12">
                  <h1 className="text-xs-center">Your Settings</h1>
                  <fieldset>
                    <fieldset className="form-group">
                      <input
                        className="form-control"
                        type="text"
                        placeholder="URL of profile picture"
                        defaultValue={auth.imgUrl ? auth.imgUrl : ""}
                        ref={this.imgInput}
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Your Name"
                        defaultValue={auth.name}
                        ref={this.nameInput}
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <textarea
                        className="form-control form-control-lg"
                        rows="8"
                        placeholder="Short bio about you"
                        defaultValue={auth.about ? auth.about : ""}
                        ref={this.aboutInput}
                      />
                    </fieldset>
                    <fieldset className="form-group">
                      <input
                        className="form-control form-control-lg"
                        type="text"
                        placeholder="Email"
                        defaultValue={auth.email}
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
                      onClick={this.handleClick(updateUser)}
                    >
                      Update Settings
                    </button>
                  </fieldset>
                </div>
              </div>
            </div>
            <hr />
            <button
              className="btn btn-danger text-center"
              onClick={() => {
                logOut(this.props.history);
              }}
            >
              Click Here To Log Out
            </button>
          </div>
        )}
      </Subscribe>
    );
  }
}

export default Settings;
