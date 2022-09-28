let elForm=document.querySelector(".site-form");
let resulTodo=document.querySelector(".result")
let elFormInput=document.querySelector(".form-input");

let toArray=[]
let todonumber=0


console.log(toArray );

elForm.addEventListener("submit",function(evt){
    evt.preventDefault();
    let inputValue=elFormInput.value;
    
    if (inputValue=="") {
        alert("You must write something")
    }else{
        let obj = {
            id: toArray.length+1,
            name: inputValue
        }
        toArray.push(obj);    
    }
    resulTodo.innerHTML=""
    
    for (const item of toArray) {
        let todoBox=document.createElement("li");
        let todoBoxStart=document.createElement("div");
        let todoBoxText=document.createElement("p");
        let todoCheced=document.createElement("input");
        let todoReWrite=document.createElement("div");
        let todoCloseList=document.createElement("button");



        resulTodo.appendChild(todoBox)
        todoBox.appendChild(todoBoxStart)
        todoBoxStart.appendChild(todoCheced)
        todoBoxStart.appendChild(todoBoxText)
        
        todoBox.appendChild(todoCloseList)

        todoBoxText.textContent=item.name
        todoCloseList.textContent="X"

        todoCloseList.className='text-white border-0 bg-transparent'
        todoBox.className='w-100 bg-dark  p-2 mt-2 rounded mx-auto d-flex align-items-center justify-content-between'
        todoBoxStart.className="d-flex  align-items-center bg-dark  text-white p-2 rounded"
        todoCheced.type="checkbox"
        
        todoCheced.className='me-2 bg-white w-0 text-dark px-2 py-2 rounded-3'
        todoBoxText.className='m-0'
        todoCheced.addEventListener("change", function() {
            if (this.checked) {
                todoBoxText.className='opacity-50 m-0'
            }else{
                todoBoxText.className='opacity-100 m-0'
            }
        })
        todoCloseList.addEventListener("click",function () {
            todoBox.className="d-none"
        })
    }





    
    elFormInput.value=""
})

