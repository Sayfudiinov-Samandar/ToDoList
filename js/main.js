let elForm = document.querySelector(".site-form");
let resulTodo = document.querySelector(".result")
let elFormInput = document.querySelector(".form-input");

let allList =document.querySelector(".all_list");
let checkedList =document.querySelector(".checked_list");
let uNcheckedList =document.querySelector(".un-checked__list");


let elSearchForm=document.querySelector(".search-form");
let elSearchInput=document.querySelector(".search-input");


let elDbClick=document.querySelector(".db-click-js");
let elDelClick=document.querySelector(".del-click-js");

let elDeletList=document.querySelector(".delet_list");
// console.log(uNcheckedList);

let toArray = JSON.parse(window.localStorage.getItem("array")) || []
let todonumber = 0




console.log(toArray);

elForm.addEventListener("submit", function (evt) {
    evt.preventDefault();
    let inputValue = elFormInput.value;

    let obj = {
        id: toArray.length > 0 ? toArray[toArray.length - 1].id + 1 : 1,
        name: inputValue,
        isComplete: false,
    }

    if (inputValue !== "") {
        toArray.push(obj);
    } else {
        alert("You must write something")
    }

    window.localStorage.setItem("array", JSON.stringify(toArray));
    elFormInput.value = ""
    numbersList(toArray)
    makeList(toArray, resulTodo)
    
})

function makeList(array, element) {
    element.innerHTML = ""

    for (const item of array) {
        let todoBox = document.createElement("li");
        let todoBoxStart = document.createElement("div");
        let todoBoxText = document.createElement("p");
        let todoCheced = document.createElement("input");


        let todoReWriteBox = document.createElement("div");
        let todoReWriteBtn = document.createElement("button");
        let todoReWrtiteText = document.createElement("input");
        let todoReWriteBtnImg = document.createElement("img");
        let todoCloseList = document.createElement("button");


        resulTodo.appendChild(todoBox);
        todoBox.appendChild(todoBoxStart);
        todoBoxStart.appendChild(todoCheced);
        todoBoxStart.appendChild(todoBoxText);


        todoBox.appendChild(todoReWriteBox);
        todoReWriteBtn.appendChild(todoReWriteBtnImg);
        todoReWriteBox.appendChild(todoCloseList);

        
            todoBoxText.className = "p-0 m-0  text-todo-list"
            todoBoxText.textContent = item.name
            todoBoxText.dataset.id = item.id

        todoCloseList.textContent = "X"
        todoCloseList.className = 'text-white border-0 bg-transparent close-btn'
        todoCloseList.dataset.arrayPlase = item.id;

        
        todoReWriteBtnImg.src = "img/icons8-pencil-64.png"
        todoReWriteBtnImg.className = 're-write-img'
        
        todoReWrtiteText.className = 'bg-transparent border-0  text-white'
        
        todoReWriteBox.className = 'd-flex w-auto'
        todoReWriteBtn.className = 'rewrite-btn bg-transparent  border-0'
        todoBox.className = 'w-100 bg-dark  p-2 mt-2 rounded mx-auto d-flex align-items-center justify-content-between'
        todoBoxStart.className = "d-flex  align-items-center bg-dark  text-white p-2 rounded"
        
        
        todoCheced.type = "checkbox";
        todoCheced.dataset.id = item.id;
        todoCheced.className = 'me-2 bg-white w-0 text-dark px-2 py-2 rounded-3 checked-js'
        
        if (item.isComplete) {
            todoCheced.checked=true;
            todoBoxText.style.textDecoration="line-through"
            todoBoxText.className="text-danger p-0 m-0 text-todo-list"
        }        
    }
    todoBoxText.className = 'm-0'
    
}

elSearchForm.addEventListener("keyup", function(){
    let searchInputValue=elSearchInput.value.toLowerCase()
    let searcharray=toArray.filter(item => {
       return item.name.toLowerCase().includes(searchInputValue)
    });
    makeList(searcharray, resulTodo)
})

 
let deletTodo;
resulTodo.addEventListener("click", function (evt) {
    if (evt.target.matches(".close-btn")) {
        audioClick(elDelClick)
        let btnId = Number(evt.target.dataset.arrayPlase)
        let itemPlas = toArray.findIndex(item => item.id == btnId);
        deletTodo=toArray.filter(obj => obj.id == btnId);
        
        if (confirm("Do you wont delet?")) {
            elDeletList.innerHTML=""
        }else{
            makeList(elDeletList, deletTodo)
        }
        
        toArray.splice(itemPlas, 1);
        window.localStorage.setItem("array", JSON.stringify(toArray));
        makeList(toArray,resulTodo);
        numbersList(toArray)
        
    }
    
    if (evt.target.matches(".checked-js")) {
        let inputId = Number(evt.target.dataset.id);
        let inputArrayPlase=toArray.find(item => item.id === inputId);
        inputArrayPlase.isComplete = !inputArrayPlase.isComplete;
        window.localStorage.setItem("array", JSON.stringify(toArray));
        makeList(toArray,resulTodo);
        numbersList(toArray)
    }
})

// list number boxes
function numbersList(lists){
    allList.textContent=`All list number: ${lists.length}`

    let listChecked=lists.filter(obj=> obj.isComplete === false);
    checkedList.textContent= `List is un-checked: ${listChecked.length}`
    window.localStorage.setItem("checked", JSON.stringify(listChecked));
    

    let checkedUnList=lists.filter(obj=> obj.isComplete === true);
    uNcheckedList.textContent= `List is checked: ${checkedUnList.length}`
    window.localStorage.setItem("unChecked", JSON.stringify(checkedUnList));

    allList.addEventListener("click", function(){
        makeList(toArray, resulTodo)
    })


    checkedList.addEventListener("click",function(){
        window.localStorage.setItem("checked", JSON.stringify(listChecked));
        makeList(listChecked, resulTodo)
    })
    uNcheckedList.addEventListener("click",function(){
        window.localStorage.setItem("checked", JSON.stringify(checkedUnList));
        makeList(checkedUnList, resulTodo)
    })
}

resulTodo.addEventListener("dblclick",function(evt) {
    audioClick(elDbClick)
    if (evt.target.matches(".text-todo-list")) {
        let textValue=evt.target.textContent;
        let eLprompt=prompt("Enter your chenge:",textValue);
        let textId= Number(evt.target.dataset.id);
        let textPlaseId=toArray.find(obj => obj.id === textId);
        
        if(eLprompt==null){
            textPlaseId.name==textValue
            window.localStorage.setItem("array", JSON.stringify(toArray));
            makeList(toArray, resulTodo)

        }
        console.log(eLprompt);
        if (eLprompt!=="") {
            textPlaseId.name = eLprompt
            window.localStorage.setItem("array", JSON.stringify(toArray));
            makeList(toArray, resulTodo)
        }
        
    }

})

function audioClick(element) {
    element.play()
}

new Sortable(resulTodo,{
    animation: 150,
    ghostClass: `blue-background-class`
})

numbersList(toArray)
makeList(toArray,resulTodo);