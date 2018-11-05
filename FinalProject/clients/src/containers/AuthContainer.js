import { Container } from "unstated";
import axios from "axios";
import setAuthToken from "../utils/setAuthToken";
import jwt_decode from "jwt-decode";
import postContainer from "./PostContainer";

class AuthContainer extends Container {
  state = {
    isAuthenicated: false,
    auth: "",
    errors: false
  };

  setCurrentUser = async (resData, history) => {
    localStorage.setItem("jwtToken", resData.data.token);
    setAuthToken(resData.data.token);
    let user = await axios.get("http://localhost:5000/api/user/me");
    console.log(user);
    if (user.data.name) {
      this.setState(
        {
          isAuthenicated: true,
          auth: user.data,
          errors: false
        },
        () => {
          console.log(this.state);
          history.push("/");
        }
      );
    }
  };

  registerUser = async (data, history) => {
    console.log(data);
    let resData = await axios.post(
      "http://localhost:5000/api/user/register",
      data
    );
    this.setCurrentUser(resData, history);
  };

  loginUser = async (data, history) => {
    console.log(data);
    let resData = await axios.post(
      "http://localhost:5000/api/user/login",
      data
    );
    if (resData.data.name) {
      this.setCurrentUser(resData, history);
      this.setState({ errors: true });
    } else {
      this.setState({ errors: true });
    }
  };

  getCurrentUser = async () => {
    let token = localStorage.getItem("jwtToken");
    setAuthToken(token);
    if (token && token.length > 3) {
      let user = await axios.get("http://localhost:5000/api/user/me");
      if (user.data.name) {
        this.setState(
          {
            isAuthenicated: true,
            auth: user.data
          },
          () => {
            console.log(this.state);
          }
        );
      }
    }
  };

  logOut = history => {
    localStorage.removeItem("jwtToken");
    setAuthToken(false);
    this.setState(
      {
        isAuthenicated: false,
        userId: " "
      },
      () => {
        history.push("/");
      }
    );
  };

  addFavorite = async idPost => {
    console.log(`addFavorite ${idPost}`);
    let resData = await axios.post(
      `http://localhost:5000/api/action/favorite/${idPost}`
    );
    this.setState({ auth: resData.data.user }, () => {
      console.log(this.state.auth);
      postContainer.setState({ post: resData.data.post });
    });
  };

  addFollow = async idUser => {
    console.log(`addFavorite ${idUser}`);
    let resData = await axios.post(
      `http://localhost:5000/api/action/follow/${idUser}`
    );
    this.setState({ auth: resData.data }, () => {
      console.log(this.state.auth);
    });
  };

  deleteFavorite = async idPost => {
    console.log(`deleteFavorite ${idPost}`);
    let resData = await axios.delete(
      `http://localhost:5000/api/action/favorite/${idPost}`
    );
    this.setState({ auth: resData.data.user }, () => {
      console.log(this.state.auth);
      postContainer.setState({ post: resData.data.post });
    });
  };

  deleteFollow = async idUser => {
    console.log(`deleteFavorite ${idUser}`);
    let resData = await axios.delete(
      `http://localhost:5000/api/action/follow/${idUser}`
    );
    this.setState({ auth: resData.data }, () => {
      console.log(this.state.auth);
    });
  };
}
let auth = new AuthContainer();
export default auth;
