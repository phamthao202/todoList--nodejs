const fs = require("fs");
const loadData = () => {
  let todoList = fs.readFileSync("data.json").toString();
  todoList = JSON.parse(todoList);
  return todoList;
};

const saveData = (todoList) => {
  const todoJSON = JSON.stringify(todoList); //convert js object to JSON object
  fs.writeFileSync("data.json", todoJSON); //write todoJSON to data.json file
};

const createTodo = (a, b) => {
  console.log("b:", b);
  const todoList = loadData();
  todoList.push({ todo: a, status: b });
  saveData(todoList);
};

const deleteTodo = (i) => {
  const todoList = loadData();
  console.log("xoa cai nay:", todoList[i]);
  todoList.splice(i, 1);
  saveData(todoList);
  return todoList;
};

const toggle = (i) => {
  let todoList = loadData();
  if (todoList[i]) todoList[i].status = !todoList[i].status;
  saveData(todoList);
  return todoList;
};

const toggleMany = (array) => {
  let todoList = loadData();
  for (i = 0; i < array.length; i++) {
    if (todoList[i]) {
        todoList[i].status = !todoList[i].status};
  }
  saveData(todoList);
  return todoList;
};


module.exports = {
  loadData: loadData,
  createTodo: createTodo,
  deleteTodo: deleteTodo,
  toggle: toggle,
  toggleMany: toggleMany,
};
