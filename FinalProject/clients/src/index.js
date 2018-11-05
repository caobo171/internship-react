import React from "react";
import ReactDOM from "react-dom";
import { BrowserRouter, Route } from "react-router-dom";
import { Provider } from "unstated";
import Header from "./components/Header";

import Settings from "./components/Settings";
import Article from "./components/Article";
import CreateArticle from "./components/CreateArticle";
import Footer from "./components/Footer";
import Home from "./components/Home";
import Register from "./components/Register";
import Profile from "./components/Profile";
import Login from "./components/Login";
import EditArticle from "./components/EditArticle";

class App extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <div>
          <Header />
          <Route exact path={"/"} component={Home} />
          <Route exact path={"/create"} component={CreateArticle} />
          <Route exact path={"/login"} component={Login} />
          <Route exact path={"/register"} component={Register} />
          <Route exact path={"/profile/:id"} component={Profile} />
          <Route exact path={"/settings"} component={Settings} />
          <Route exact path={"/post/:id"} component={Article} />
          <Route exact path={"/edit/:id"} component={EditArticle} />
          <Footer />
        </div>
      </BrowserRouter>
    );
  }
}

ReactDOM.render(
  <Provider>
    <App />
  </Provider>,
  document.getElementById("app")
);
