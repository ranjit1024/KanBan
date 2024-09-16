export default class Kanban {
  static getTasks(columnId) {
    const data = read().find(column => {
        return column.columnId == columnId;
    });
    
    if(!data){
        return [];
    }else{
        return data.tasks;
    }
  }

  static insertTask(columnId, content) {
    const data = read();
    const column = data.find(column => {
        console.log(column.columnId == columnId)
        return column.columnId == columnId;
    })
    if(!data){
        return [];
    }

    const task = {
        taskId : Math.floor(Math.random()*100000),
        content:content
    }

    column.tasks.push(task);
    save(data)
    return task;
  }

  static updataTask(taskId, updatedInformation) {
    const data =  read();

    function findColumnTask(){
      for(const column of data){
        const task = column.tasks.find(item => {
          return item.taskId == taskId;
        })
        if(task){
          console.log(task)
          return [task,column];
        }
        
      }
    }
    // console.log(findColumnTask())
    const[task, curretnColumn] = findColumnTask();
    console.log(findColumnTask())
    console.log(task, curretnColumn)
    const targetColumn = data.find(column => {
      return column.columnId == updatedInformation.columnId;
    });
    
    
    task.content = updatedInformation.content;
    curretnColumn.tasks.splice(curretnColumn.tasks.indexOf(task),1);
    targetColumn.tasks.push(task);
    save(data);
}

  static deleteTaks(taskId, columnId) {
    const data = read();
    for(const column of data){
      const task = column.tasks.find(item =>{
        return item.taskId == taskId;
      })
      if(task){
        column.tasks.splice(column.tasks.indexOf(task),1)
      }
    }
    save(data)
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
function columnCount(){
  const data = read();

  const todo = document.querySelector("span.todo");
  todo.textContent = data[0].tasks.length;

  const pending = document.querySelector("span.pending");
  pending.textContent = data[1].tasks.length;
  

  const completed = document.querySelector("span.completed");
  completed.textContent = data[2].tasks.length;
}

function save(data){
  localStorage.setItem("data", JSON.stringify(data));
  columnCount();
}
columnCount();
