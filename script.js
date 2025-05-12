let data = {
    mentor1:{goal: '', tasks: [], resource: []},
    mentor2:{goal: '', tasks: [], resource: []},
    mentor3:{goal: '', tasks: [], resource: []},
    selectedMentor:''
}//it for localstorage and UI

const mentorNames = {
    mentor1: 'Nurzhan Sagyndyk',
    mentor2: 'Abdybai Zhasulan',
    mentor3: 'Turar Nurtugan'
}
function saveData(){
    localStorage.setItem('MyMentorData',JSON.stringify(data))
}function loadData(){
    const savedData = localStorage.getItem("MyMentorData")
    if(savedData){
        data = JSON.parse(savedData)
    }
        ['mentor1', 'mentor2', 'mentor3'].forEach(mentorId => {
            if (!data[mentorId]) {
                data[mentorId] = { goal: '', tasks: [], resource: [] };
            }
            if (!Array.isArray(data[mentorId].tasks)) {
                data[mentorId].tasks = [];
            }
            if (!Array.isArray(data[mentorId].resource)) {
                data[mentorId].resource = [];
            }
        });
        if (!data.selectedMentor || !data[data.selectedMentor]) {
            data.selectedMentor = '';
        }

    main()
}
function main(){
    const mentor = data[data.selectedMentor] && data.selectedMentor ? data[data.selectedMentor] : null
    if(!mentor){return}
    document.getElementById("yourGoal").textContent = mentor && mentor.goal ? mentor.goal : 'target not set'
    document.querySelectorAll(".card").forEach(card =>{
        card.style.border = data.selectedMentor === card.dataset.mentor ? '1px solid gray' : 'none'

    })
    document.getElementById('mentorss').textContent = mentor ? mentorNames[data.selectedMentor] : 'None';
    const list = document.getElementById('ul-tasks')
    list.innerHTML=''
    if (mentor){
    mentor.tasks.forEach((task,index) => {
        const li = document.createElement('li')
        li.className = task.completed ? "completed" : ''
        li.innerHTML=`
        <span>${task.text}</span>
        <div>
        <button onclick='toggleTask(${index})'>${task.completed ? 'Check' : "completed"}</button>
        <button onclick='deleteTask(${index})'>Delete</button>
        </div>
        `
        list.appendChild(li)
    })
    }


    const resource = document.getElementById('ul-resource')
    resource.innerHTML=''
    if(mentor){
        mentor.resource.forEach((task,index) => {
        const li = document.createElement('li')
        li.innerHTML=`
        <a href='${task.url}' target="_blank">${task.name}</a>
        <button onclick='deleteResource(${index})'>Delete</button>
        `
        resource.appendChild(li)
    })
    }

}
function selectMentor(mentorId){//mentor1,mentor2,mentor3
    data.selectedMentor = mentorId
    saveData()
    main()
}

function setGoals(){
    const goal = document.getElementById("goals")
    let aim = goal.value.trim()
    if (!data.selectedMentor) {
        alert('Mentor first!')
        return
    }
    if(aim){
        data[data.selectedMentor].goal = aim
        goal.value = ''
        saveData()
        main()
    }
}
function addTask(){
    const taskInput = document.getElementById("tasks-input")
    const text = taskInput.value.trim()
    if(text){
        data[data.selectedMentor].tasks.push({text,completed:false})
        taskInput.value = ''
        saveData()
        main()
    }
}
function toggleTask(index) {
    const mentor = data[data.selectedMentor]
    mentor.tasks[index].completed = !mentor.tasks[index].completed;
    saveData();
    main();
}function deleteTask(index) {
    data[data.selectedMentor].tasks.splice(index, 1);
    saveData();
    main();
}function addResource(){
    const nameInput = document.getElementById("resource-input")
    const urlInput = document.getElementById("url-input")
    const name = nameInput.value.trim()
    const url = urlInput.value.trim()

    if(name&&url){
        data[data.selectedMentor].resource.push({name,url})
        nameInput.value = ''
        urlInput.value = ''
        saveData()
        main()
    }
}

function deleteResource(index) {
    data[data.selectedMentor].resource.splice(index, 1);
    saveData();
    main()
}
loadData()
window.addEventListener('DOMContentLoaded', loadData);
