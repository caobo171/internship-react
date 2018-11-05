import { Container } from "unstated";
import axios from "axios";

class UserContainer extends Container {
  state = {
    user: {}
  };
  updateUser = async data => {
    console.log(data);
    let resData = await axios.post(
      "http://localhost:5000/api/user/settings",
      data
    );
    console.log(resData.data);
  };

  getUser = async id => {
    let resData = await axios.get(`http://localhost:5000/api/user/get/${id}`);
    this.setState({ user: resData.data });
  };
}

let userContainer = new UserContainer();
export default userContainer;
