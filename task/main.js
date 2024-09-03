const input = document.getElementById("input");
const submitbtn = document.getElementById("submit");
const list = document.getElementById("list");

input.focus();

input.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        new_task()
    }
})

function new_task(){
    let val = input.value

    if (val === ""){
        return
    }
    const new_task = document.createElement('li');
    const button = document.createElement('button');
    
    new_task.innerHTML = val;


    list.appendChild(new_task);
    
    input.value = "";

    new_task.appendChild(button);
    savedata();
}

list.addEventListener("click", function(e){
    if(e.target.nodeName=== "LI"){
        e.target.classList.toggle("marked");
        savedata();
    }
    else if(e.target.nodeName=== "BUTTON"){
        e.target.parentElement.remove();
        savedata()
    }
})

function savedata(){
    localStorage.setItem("data", list.innerHTML);
}

function loaddata(){
    list.innerHTML = localStorage.getItem("data");
}
loaddata()