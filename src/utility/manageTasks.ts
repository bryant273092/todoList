export type Task = {
    text: string,
    id: number,
    completed: boolean
}
export const createTask = (input: string) => {
  let tasks = getTasks();
  //date object is created to create a unique id for each task
  const UID = new Date()
  const newTask = { text: input, id: UID.getTime(), completed: false };
  tasks = [newTask].concat(tasks)
  localStorage.setItem("tasks", JSON.stringify(tasks))

};

export const getTasks = () => {
    //returns current tasks, or array if localstorage is empty
    return JSON.parse(localStorage.getItem("tasks") || '[]');
};

export const updateTask = (input: string, id: number) => {
  let tasks = getTasks()
  tasks.forEach((task: Task)=> {
    if(task.id == id) {
      task.text = input
    }
  })
  localStorage.setItem("tasks", JSON.stringify(tasks))
};

export const deleteTask = (id: number) => {
  let tasks = getTasks()
  const filtered = tasks.filter((task: Task)=>{
    return task.id != id
  })
  localStorage.setItem("tasks", JSON.stringify(filtered))
  
};

export const updateTaskStatus = (id: number) => {
  let tasks = getTasks()
  tasks.forEach((task: Task)=> {
    if(task.id == id) {
      //updates to inverse of what status was before
      task.completed = !task.completed
    }
  })
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

export const sortTasks = (tasks: Array<Task>) => {
  tasks.sort((task) => -task.id)
  console.log(tasks)
  return tasks
}
