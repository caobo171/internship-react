class Task {
  constructor(id, name, level) {
    this.id = id;
    this.name = name;
    this.level = level;
    this.done = false;
  }
}

var domUpdate = () => {
  taskListElement.innerHTML = "";
  listTask.sort((a, b) => {
    //   if (a.done && !b.done) return true;
    //   if (!a.done && b.done) return false;
    return a.level < b.level;
  });
  console.log(listTask);

  listTask.forEach(task => {
    let taskElement = document.createElement("li");
    taskElement.innerHTML = `
    <div id=${task.id} class="row">
    <div class="part1">
        <input type="checkbox" class="part1__checkbox" ${
          task.done ? "checked" : ""
        }>
        <h4 class="part1__task ${task.done ? "done" : ""}">${task.name} </h4>
    </div>
    <div class="part2">
        <select class="part2__select-box" >
            <option value="3"  ${
              task.level == 3 ? "selected" : ""
            }>High</option>
            <option value="2"  ${
              task.level == 2 ? "selected" : ""
            }>Medium</option>
            <option value="1"  ${task.level == 1 ? "selected" : ""}>Low</option>
        </select>
        <span class="part2__delete">X</span>
    </div>
    </div>
        `;
    taskListElement.appendChild(taskElement);
  });
};

var deleteElement = e => {
  var id = e.target.parentNode.parentNode.getAttribute("id");
  console.log(id);
  for (let i = 0; i < listTask.length; i++) {
    //console.log(listTask[i ]);
    if (listTask[i].id == id) {
      listTask.splice(i, 1);
      domUpdate();
    }
  }
};

var editElementDone = e => {
  var id = e.target.parentNode.parentNode.getAttribute("id");
  console.log(e.target);
  console.log(id);
  for (let i = 0; i < listTask.length; i++) {
    //console.log(listTask[i ]);
    if (listTask[i].id == id) {
      listTask[i].done = !listTask[i].done;
      console.log(listTask);
      domUpdate();
    }
  }
};

var editElementLevel = e => {
  var id = e.target.parentNode.parentNode.getAttribute("id");
  console.log(id);
  for (let i = 0; i < listTask.length; i++) {
    //console.log(listTask[i ]);
    if (listTask[i].id == id) {
      if (listTask[i].level != e.target.value) {
        listTask[i].level = e.target.value;
        domUpdate();
      }
    }
  }
};
