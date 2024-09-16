import Kanban from "./kanban.js";

const todo = document.querySelector(".cards.todo");
const pending = document.querySelector(".cards.pending");
const complete = document.querySelector(".cards.completed");
const taskBox = [todo, pending, complete];
const addForm = document.querySelectorAll(".add");
const error = document.querySelectorAll(".error");
function addTaksCards(task, index) {
  
  const element = document.createElement("form");
  element.className = "card";
  element.draggable = true;
  element.dataset.id = task.taskId;
  element.innerHTML = `
  <input
                    value="${task.content}"
                    type="text"
                    name="task"
                    autocomplete="off"
                    disabled="disabled"
                  />
                  <div>
                    <span class="task-id">#${task.taskId}</span>
                    <span>
                      <button class="bi bi-pencil edit" data-id="${task.taskId}"></button>
                      <button
                        class="bi bi-check-lg update hide"
                        data-id="${task.taskId}"
                        data-column="${index}"
                      ></button>
                      <button class="bi bi-trash3 delete" data-id="${task.taskId}" data-column="${index}"></button>
                    </span>
                  </div>
  `;
 
  taskBox[index].append(element)
}

Kanban.getAllTasks().forEach((tasks, index) => {
  tasks.forEach((task) => {
    addTaksCards(task, index);
  });
});

addForm.forEach((form,index) =>{
  form.addEventListener("submit", (e)=>{
    e.preventDefault();
    if(form.task.value){
      const task = Kanban.insertTask(index, form.task.value.trim())
      addTaksCards(task, index);
      form.reset();
    }
    
  })
})

taskBox.forEach(columns =>{
  columns.addEventListener("click", (e)=>{
    e.preventDefault();
    const formInput = e.target.parentElement.parentElement.previousElementSibling;
    if(e.target.classList.contains("edit")){
      formInput.removeAttribute("disabled");
      e.target.classList.add("hide");
      e.target.nextElementSibling.classList.remove("hide");
    }

    if(e.target.classList.contains("update")){
      formInput.setAttribute("disabled","disabled");
      e.target.classList.add("hide");
      e.target.previousElementSibling.classList.remove("hide");
      console.log("ok");

      const taskId = e.target.dataset.id;
      const columnId = e.target.dataset.column;
      const content = formInput.value;
      console.log(taskId, columnId,content)
      Kanban.updataTask(taskId, {
        columnId: columnId,
        content: content
      })
    }

    if(e.target.classList.contains("delete")){
      e.preventDefault()
      Kanban.deleteTaks(e.target.dataset.id, e.target.dataset.column)
      formInput.parentElement.remove();
    }
  })
})

