const input=document.querySelector('input')
const btn=document.querySelector('.add-btn')
const box=document.querySelector('.todos-box')
const back_to_list=document.querySelector('.back-btn')
const clear_all=document.querySelector('#clear-all')
const complete_task=document.querySelector('#complete-task')

let db=localStorage.getItem('Todos')

document.querySelector('.individual-task-info').style.display='none'
clear_all.addEventListener('click',(e)=>{
    localStorage.removeItem('Todos')
})

back_to_list.addEventListener('click',(e)=>{
    e.preventDefault()
    document.querySelector('.individual-task-info').style.display='none'
})



const loadTodos=()=>{
    if(db){
        let todos=JSON.parse(db)
        todos.map((task)=>{
            addTodoToScreen(task.task,task.task_start,task.task_id,task.task_end)
        })
    }
}


loadTodos()

function addTodo(){
    let task_start='1/1/2023'
    let task=input.value
    if (db){
        let todolist=JSON.parse(localStorage.getItem('Todos'))
        //console.log(todolist)
        let todo={
            task_id:todolist.length+1,
            task:task,
            task_start:'1/1/2023',
            iscomplete:false,
            task_end:'',

        }
        addTodoToScreen(todo.task,todo.task_start,todo.task_id,todo.task_end)
        todolist.push(todo)
        console.log(todolist)
        localStorage.setItem('Todos',JSON.stringify(todolist))
      
    }
    else{
        let todo={
            task_id:1,
            task:task,
            task_start:'1/1/2023',
            iscomplete:false,
            task_end:'',
        }
        addTodoToScreen(todo.task,todo.task_start,todo.task_id,todo.task_end)
        let todos=[]
        todos.push(todo)
        localStorage.setItem('Todos',JSON.stringify(todos))
    }
    input.value=''

}

btn.addEventListener('click',addTodo)

function addTodoToScreen(task,task_start,task_id,task_end){
    const li=document.createElement('li')
    const span=document.createElement('span')
    const div=document.createElement('div')
    const span2=document.createElement('span')
    li.classList.add('todo')
    div.classList.add('iscomplete')
    span.classList.add('todo-info')
    span2.innerText=task_start
    span.innerText=task

    li.appendChild(div)
    li.appendChild(span)
    li.appendChild(span2)
    li.addEventListener('click',(e)=>{
        e.preventDefault()
        document.querySelector('.individual-task-info').style.display='flex'
        document.querySelector('.task-id').innerText=task_id
        document.querySelector('.task-start').innerText=task_start
        document.querySelector('.task-end').innerText=task_end
        document.querySelector('#task-long-info').innerText=task
        if(task_end!=''){
            document.querySelector('.task-iscomplete').innerText='Completed'
        }
        else{
            document.querySelector('.task-iscomplete').innerText='Not Complete'
        }
       
    })
    box.appendChild(li)
}

function TaskCompletion(){
    let todolist=JSON.parse(localStorage.getItem('Todos'))
    let task_to_find=document.querySelector('.task-id').innerText
    for(let i=0;i<=todolist.length-1;i++){
        if(todolist[i].task_id==task_to_find){
            todolist[i].iscomplete=true
            todolist[i].task_end=Date()
            document.querySelector('.task-iscomplete').innerText='Completed'
            document.querySelector('.task-end').innerText=todolist[i].task_end
            localStorage.setItem('Todos',JSON.stringify(todolist))
            break;
        }
       
    }
}
complete_task.addEventListener('click',TaskCompletion)