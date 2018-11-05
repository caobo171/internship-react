import React from "react";
import DropTask from "./DropTask";

class DropList extends React.Component {
  constructor() {
    super();
    this.state = {
      taskName: ""
    };
  }

  drop = e => {
    e.preventDefault();
    let id = e.dataTransfer.getData("id");
    console.log(id);
    console.log(document.getElementById(id));
    console.log(document.getElementById(id));
    console.log(e.target);
    try {
      this.props.editTask(id, this.props.title);
    } catch (e) {
      console.log(e);
    }
  };
  allowDrop = e => {
    e.preventDefault();
  };
  onChangeHandle = e => {
    this.setState({ [e.target.name]: e.target.value }, console.log(this.state));
  };
  generateListDrop = () => {
    let dropListElement = [];
    this.props.dropList.forEach((task, i) => {
      //dropListElement.push(<DropTask key={i} task={task} />);
      dropListElement.push(
        <div
          id={task.id}
          key={task.id}
          draggable="true"
          data-name={task.name}
          onDragStart={this.drag}
        >
          {task.name}
        </div>
      );
    });
    return dropListElement;
  };

  addDropTask = event => {
    event.preventDefault();
    this.props.addDropTask(this.state.taskName, this.props.title);
  };

  drag = e => {
    e.dataTransfer.setData("id", e.target.id);
    console.log(e.target);
    console.log(e.target.dataset.name);
    // e.dataTransfer.setData("name", this.props.task.name);
    // e.dataTransfer.setData("type", this.props.task.type);
  };

  render() {
    return (
      <div>
        <strong>{this.props.title}</strong>
        <div
          className="drop-area"
          onDrop={this.drop}
          onDragOver={this.allowDrop}
        >
          {this.generateListDrop()}
        </div>

        <form onSubmit={this.addDropTask}>
          <input
            type="text"
            name="taskName"
            placeholder="title"
            onChange={this.onChangeHandle}
          />
          <button type="submit">Add Task...</button>
        </form>
      </div>
    );
  }
}

export default DropList;
