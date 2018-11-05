import React from "react";
import DropTask from "./DropTask";
import DropList from "./DropList";

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      title: "",
      listDropArea: ["To Do", "Processing"],
      listTask: [
        {
          id: 1,
          type: "To Do",
          name: "Learn mathematics"
        },
        {
          id: 2,
          type: "To Do",
          name: "Learn "
        }
      ]
    };
  }

  saveState = () => {
    localStorage.setItem("state", JSON.stringify({ ...this.state, title: "" }));
  };

  componentDidMount() {
    const state = JSON.parse(localStorage.getItem("state"));
    this.setState(state);
  }

  addDropList = e => {
    e.preventDefault();
    let listDropArea = this.state.listDropArea;
    listDropArea.push(this.state.title);
    this.setState({ listDropArea }, () => this.saveState());
  };
  onChangeHandle = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  addDropTask(name, type) {
    let listTask = this.state.listTask;
    console.log(listTask);
    let id = listTask[listTask.length - 1].id + 1;
    listTask.push({ type, name, id });
    this.setState({ listTask }, () => this.saveState());
  }

  editTask(id, changeType) {
    console.log("edited");
    console.log(`${id}, ${changeType}`);
    let listTask = this.state.listTask.filter(task => {
      if (task.id == id) {
        task.type = changeType;
      }
      return task;
    });
    console.log(listTask);
    this.setState({ ...this.state, listTask }, () => this.saveState());
  }

  generateListDropArea = () => {
    let listTask = this.state.listTask;
    let listDropAreaElement = [];
    this.state.listDropArea.forEach((title, i) => {
      listDropAreaElement.push(
        <DropList
          key={i}
          title={title}
          dropList={listTask.filter(task => task.type == title)}
          addDropTask={this.addDropTask.bind(this)}
          editTask={this.editTask.bind(this)}
        />
      );
    });
    return listDropAreaElement;
  };

  render() {
    return (
      <div onDrop={this.drop} onDragOver={this.allowDrop}>
        <form onSubmit={this.addDropList}>
          <input
            type="text"
            name="title"
            placeholder="title"
            onChange={this.onChangeHandle}
          />
          <button type="submit">Add Another List</button>
        </form>
        {this.generateListDropArea()}
      </div>
    );
  }
}

export default App;
