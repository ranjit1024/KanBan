export default class Kanban {
  static getTasks(columnId) {
    const data = read().find(column => {
        return column.columnId == columnId;
    });
    return data.tasks;
  }

  static inserTaks(columnId, content) {

  }

  static updataTask(taskId, updatedInformation) {

  }

  static deleteTaks(taskId) {

  }

  static getAllTasks() {
    const data = read();
    return [data[0].tasks, data[1].tasks, data[2].tasks];
  }
}

function read() {
  const data = localStorage.getItem("data");
  if (!data) {
    return [
      { columnid: 0, tasks: [] },
      { columnId: 1, tasks: [] },
      { columnId: 3, tasks: [] },
    ];
  }
  return JSON.parse(data);
}

function save(){

}