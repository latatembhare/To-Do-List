var form = document.getElementById("form")
var input = document.getElementById("input")
var submit = document.getElementById("submit")
var ul = document.getElementById("ul")
var update = document.getElementById("update")
var userArray = [];
update.style.display = "none"

// 3 get data from locale storage if it is empty then return empty array of there is data it fetch from local storage
var intialTask = getUserData();
console.log(intialTask)
if(intialTask.length > 0){
    userArray = intialTask
    showList(userArray)
}
console.log(userArray)
function getUserData(){
    if(localStorage.getItem("setTask")){
        return JSON.parse(localStorage.getItem("setTask"))
    }
    return [];
}

//4 - id  crate id of each  new task enter
function uuid() {
    var dt = new Date().getTime();
    var uuid = "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        var r = (dt + Math.random() * 16) % 16 | 0;
        dt = Math.floor(dt / 16);
        return (c == "x" ? r : (r & 0x3) | 0x8).toString(16);
      }
    );
    return uuid;
  }
  console.log(uuid())
  //1 crate function to add task and add in locale storage
function onCreate(e){
  e.preventDefault();
     
    var Taskobj = {addTask: input.value,
        Id : uuid()
    }
    console.log(Taskobj) 
    // above console shows the fetch locale storage data with id and new create data with id
    userArray.push(Taskobj)
    localStorage.setItem("setTask", JSON.stringify(userArray))
    console.log(userArray)
    form.reset();
    showList(userArray);
}
form.addEventListener("submit" , onCreate)

//   4 Edit 
function onEdit(e){
    var getId = e.getAttribute("data-id")
    localStorage.setItem("setId",getId)
    var getLocalData = getUserData();
    update.style.display = "inline-block";
  submit.style.display = "none";
    var getObj = getLocalData.find((user)=>getId === user.Id)
    input.value = getObj.addTask
}
// 5 update 
function onUpdate(){
    var getId = localStorage.getItem("setId")
    console.log(getId)
    // above console give id of those that we click edit button 
    var getLocalData = getUserData();
    var getObj= getLocalData.find((user)=>getId === user.Id)
    console.log(getObj)
    if(getObj){
        getObj.addTask= input.value;
        localStorage.setItem("setTask",JSON.stringify(getLocalData))
        form.reset();
        update.style.display = "inline-block"
        submit.style.display = "none"
        showList(getLocalData);
        console.log(getObj)
        //  updated data store in list as well as local storage
    }
    submit.style.display = "inline-block"
    update.style.display = "none"

}
update.addEventListener("click",onUpdate)

//6
function onDelete(a) {
    var getId = a.getAttribute("data-id");
    console.log(getId)
    var getLocalData = getUserData();
    var modifiedData = getLocalData.filter((user) => getId !== user.Id);
    localStorage.setItem("setTask", JSON.stringify(modifiedData));
    showList(modifiedData);
    window.location.reload();
  }
  // 7 completed task
  function onComplete(e){
    var getId = e.getAttribute("data-id")
    var getLocalData = getUserData();
    var completeData = getLocalData.filter((user) => getId !== user.Id);
    console.log(completeData)
    completeData.addTask= input.value;

  }
// / 2 list

function showList(e){
    var result = ""
   e.map((user,i)=>{
    result += `<li><input data-id = ${user.Id} onclick="onComplete(this)"
    type ="radio" class=" mr-3 from-check from-check-input " id ="radio" value ="option1">${i+1}. ${user.addTask} <button   data-id = ${user.Id} onclick="onEdit(this)" class="btn btn-success btn-sm fa-regular fa-pen-to-square float-right mr-2" id ="onclick"></button><button data-id = ${user.Id} onclick="onDelete(this)" class="btn btn-danger mr-1 btn-sm fa-sharp fa-regular fa-trash float-right" id ="onclick"></button> 
    </li> `
   })
   ul.innerHTML = result;
}



