const input = document.getElementById("input");
const submitbtn = document.getElementById("submit");
const task_list = document.getElementById("list");

input.focus();

input.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        new_task();
    }
})

function new_task(){
    let val = input.value;

    if (val === ""){
        return
    }
    const new_task = document.createElement('li');
    const button = document.createElement('button');
    
    new_task.innerHTML = val;


    task_list.appendChild(new_task);
    
    input.value = "";

    new_task.appendChild(button);
    savedata();
}

task_list.addEventListener("click", function(e){
    if(e.target.nodeName=== "LI"){
        e.target.classList.toggle("marked");
        savedata();
    }
    else if(e.target.nodeName=== "BUTTON"){
        e.target.parentElement.remove();
        savedata();
    }
})

function savedata(){
    localStorage.setItem("data", task_list.innerHTML);
}

function loaddata(){
    task_list.innerHTML = localStorage.getItem("data");
}
loaddata();