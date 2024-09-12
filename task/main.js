const input = document.getElementById("input");
const submitbtn = document.getElementById("submit");
const task_list = document.getElementById("list");
const deadline = document.getElementById("deadline");
const dropbox = document.getElementById("dropbox");
const sort_node = document.getElementById("sort");

let task_obj_list = []

input.focus();

function process_input(){
    if (input.value === ""){return};
    var user_input = get_input();
    generate_task_with_obj(user_input);
    input.value = ""
    deadline.value = ""

    
}

function get_input(){
    var time = new Date();
    const task_name = input.value;
    const dued = deadline.value;
    const publish = (time.getFullYear()).toString() + "-" + (time.getMonth() + 1).toString() + "-" + (time.getDate()).toString();
    return [task_name, publish, dued]
}

function generate_task_with_obj(list , is_obj = false){
    var currentdate = new Date();
    var date_due = new Date(list[2])
    const parent = document.createElement('tr');
    const title = document.createElement('td');
    const publish = document.createElement('td');
    const due_date = document.createElement('td');
    const delete_button = document.createElement('button');
    const delete_td = document.createElement('td');

    delete_td.appendChild(delete_button);
    delete_button.onclick = "delete_task()";
    delete_button.className = "delete"

    publish.innerHTML = list[1];
    title.innerHTML = list[0]; 
    if (deadline.value === ""){
        due_date.innerHTML = (currentdate.getFullYear()).toString() + "-" + (currentdate.getMonth() + 1).toString() + "-" + (currentdate.getDate()).toString()}
    else{due_date.innerHTML = list[2]}
    
    if (currentdate < due_date){

    }

    parent.appendChild(title);
    parent.appendChild(publish);
    parent.appendChild(due_date);
    parent.appendChild(delete_td);

    task_list.appendChild(parent);

    if (!is_obj){
        parent.id = list[0] + (task_obj_list.length);
        var task_obj = new Task(list[0], list[1], deadline.innerHTML, parent.id);
        task_obj_list.push(task_obj);
        }
    
    alert(task_obj_list);

    //savedata();
}

function sortby(sort, obj_list){
    clear_all()
    if (sort === "publish"){
        var sorted_list = obj_list.sort((a, b) => {
            if (a.get_publish() < b.get_publish()) {return -1;}
            else if (a.get_publish() > b.get_publish()) {return 1;}
            else {return 0;}
        });
        for (let i = 0; i < obj_list.length; i++){
            generate_task_with_obj(task_obj_list[i].get_info() , true)}}
    if (sort === "due"){
        var sorted_list = obj_list.sort((a, b) => {
            if (a.get_deadline() < b.get_deadline()) {return -1;}
            else if (a.get_deadline() > b.get_deadline()) {return 1;}
            else {return 0;}});
        for (let i = 0; i < obj_list.length; i++){
            generate_task_with_obj(task_obj_list[i].get_info() , true)}}}

function check_if_past_due(obj){
    const currentdate = new Date()
    if(obj.get_deadline()< currentdate ){

    }
}

function clear_all(){
    var first_child = task_list.children[0];
    while(task_list.firstChild !== first_child){
        task_list.removeChild(task_list.firstChild);
    }
}

function ms(tr_id){
    const my_object = (task_obj_list.find(obj => obj.get_id()===tr_id));
    my_object.toggle_mark();
}
    

sort_node.addEventListener('change', function() {
    
    const option = sort_node.value 
    sortby(sort_node.value, task_obj_list)
})

task_list.addEventListener("click", function(e){
    if(e.target.parentElement.firstChild.nodeName === "TD"){
        var obj_id = e.target.parentElement.id
        alert(obj_id)
        ms(obj_id)
        e.target.classList.toggle("marked");
        //savedata();
    }
    else if(e.target.nodeName=== "BUTTON"){
        var element_id = e.target.parentElement.parentElement.id;
        task_obj_list = task_obj_list.filter(obj => obj.get_id() !== element_id);
        e.target.parentElement.parentElement.remove();
        alert((task_obj_list))
        //savedata();
    }
})

input.addEventListener("keydown", function(e){
    if(e.key === "Enter"){
        process_input();
    }
})

window.onload = function (){

}

/*
function savedata(){
    localStorage.setItem("data", task_list.innerHTML);
}

function loaddata(){
    task_list.innerHTML = localStorage.getItem("data");
} 
loaddata();*/

class Task{
    constructor(name,publish , deadline, id){
        this.name = name
        this.deadline = deadline
        this.id = id
        this.publish = publish
        this.mark = false
    }
    toggle_mark(){
        if(this.mark){
            this.mark = false
        }
        else{
            this.mark = true
        }
    }

    check_marked(){return this.mark}
    get_id(){return this.id}
    get_info(){return [this.name, this.publish, this.deadline]}
    get_deadline(){return new Date(this.deadline).getTime()}
    get_publish(){return new Date(this.publish).getTime()}
}