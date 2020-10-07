// const fs = require("fs");

// const loadData = () => {
//   let todoList = fs.readFileSync("data.json").toString();
//   todoList = JSON.parse(todoList);
//   return todoList;
// };

// const createTodo = () => {
//   const todoList = loadData();
//   todoList.push({ todo: "Eat lunch", status: false });
//   const todoJSON = JSON.stringify(todoList);
//   fs.writeFileSync("data.json", todoList);
// };

// if (process.argv[2] === "list") {
//   console.log("you call list command");
//   //get data from data.json and show at console
//   const list = loadData();
//   console.log(list);
// } else if (process.argv[2] === "create") {
//   console.log("you call create command");
//   createTodo();
// } else {
//   console.log("command not defind");
// }
//1. make the command of create data
//2. get data from data.json
//3. add one more item
//4. save it

const yargs = require("yargs");
const todoController = require("./controller");
const chalk = require("chalk");

yargs.command({
  command: "list",
  describe: "Show the todo List",
  handler: function () {
    let data = todoController.loadData();
    for (let i = 0; i < data.length; i++) {
      console.log(
        "data is",
        data[i].status
          ? chalk.black.bgMagenta.inverse("I've DONE") +
              " " +
              data[i].todo +
              " " +
              chalk.green(data[i].status)
          : chalk.black.bgCyan.inverse("I've NOT-DONE") +
              " " +
              chalk.yellow(data[i].todo) +
              " " +
              chalk.red(data[i].status)
      );
    }
  },
});

yargs.command({
  command: "create",
  describe: "create the new todo",
  builder: {
    todo: {
      type: "String",
      demandOption: true,
      describe: "the thing todo",
    },
    status: {
      type: "boolean",
      demandOption: true,
      describe: "complete or not",
      default: false,
    },
  },
  handler: function (arg) {
    todoController.createTodo(arg.todo, arg.status);
  },
});
yargs.command({
  command: "delete",
  builder: {
    id: { type: "number", demandOption: true, describe: "delete at id" },
  },
  handler: function (obj) {
    console.log(obj);
    let newList = todoController.deleteTodo(obj.id);
    console.log("newlist after delete", newList);
  },
});

yargs.command({
  command: "toggle",
  describe: "change status",
  handler: function (obj) {
    let newStatusList = todoController.toggle(obj.id);
    console.log("after change status list", newStatusList);
  },
});

yargs.command({
  command: "toggle-many",
  describe: "change status",
  builder: {
    ids: {
      type: "array",
      demandOption: true,
      describe: "toggle many at one time",
    },
  },
  handler: function (obj) {
    console.log(obj.ids);
    let newStatusList = todoController.toggleMany(obj.ids);
    console.log("after change status list", newStatusList);
  },
});

yargs.parse();
