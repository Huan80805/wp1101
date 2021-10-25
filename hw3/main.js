let next_id = 0
all_data = [] //saving all list elemnts
filter = 'all' // all/active/completed
// initialize
const foot_node = document.getElementById("todo-footer")
const list = document.getElementById("todo-list")
foot_node.style.display = "none"
list.style.display = "none"
list.innerHTML = ""
//footer event  (not completed)
// const all = document.getElementById("button_all")
// const active = document.getElementById("button_active")
// const complete = document.getElementById("button_complete")
// const clear = document.getElementById("clear")
// all.addEventListener("click", delete_complete)
// active.addEventListener("click", delete_complete)
// complete.addEventListener("click", delete_complete)
// clear.addEventListener("click", delete_complete)
//input task
const todo_input = document.getElementById("todo-input")
todo_input.addEventListener('keyup', function (e) {
    if (e.key != 'Enter') return
    if (todo_input.value.trim().length === 0) {
        alert("Input cant'be empty")
        return
        }
    next_id += 1
    const todo = {id: next_id, checked: false, value: todo_input.value}
    all_data = [...all_data, todo]
    todo_input.value = ""
    add_todo(todo)
    })


const add_todo = function(todo){
    // li[div(class:checkbox), h1(class:item_detail), img(item_x)]
    // checkbox[input id, label]
    const list = document.getElementById("todo-list")
    const li_node = document.createElement("li")
    li_node.className =  "todo-app__item"
    li_node.id = `item-${todo.id}`
    const div_node = document.createElement("div")
    div_node.className = "todo-app__checkbox"
    const input_node = document.createElement("input")
    input_node.type = "checkbox"
    input_node.id = todo.id
    input_node.checked = todo.checked
    input_node.addEventListener("click", change_todo_state)
    const label_node = document.createElement("label")
    label_node.htmlFor = todo.id
    div_node.appendChild(input_node)
    div_node.appendChild(label_node)
    // item_detail
    const h1_node = document.createElement("h1")
    h1_node.className = "todo-app__item-detail"
    h1_node.innerText = todo.value
    h1_node.id = `h1-${todo.id}`
    // item-x
    const img_node = document.createElement("img")
    img_node.className = "todo-app__item-x"
    img_node.src = "img/x.png"
    img_node.id = `img-${todo.id}`    
    
    li_node.appendChild(div_node)
    li_node.appendChild(h1_node)
    li_node.appendChild(img_node)
    list.appendChild(li_node)
    img_node.addEventListener("click", delete_todo)
    refresh()    
}
const debug = function(){ alert('?')}
const change_todo_state = (event) => {
    const input_node = event.currentTarget
    const h1_node = document.getElementById(`h1-${input_node.id}`)
    if (input_node.checked){
        h1_node.style.textDecoration = "line-through"
        h1_node.style.opacity = 0.5
        }
    else{
        h1_node.style.textDecoration = ""
        h1_node.style.opacity = 1
    }
    for (var i=0; i<all_data.length; i++){
        if (all_data[i].id === input_node.id*1){
            all_data[i].checked = input_node.checked
        }
    }
    refresh()
    }

const delete_todo = (event) => {
    const img_node = event.currentTarget
    const id = img_node.id.substring(4,img_node.id.length)
    const li_node = document.getElementById(`item-${id}`)
    li_node.remove()
    all_data = all_data.filter((element) =>{return element.id !== id*1})
    refresh()
}

const refresh = function() {
    if (all_data.length === 0){
        foot_node.style.display = "none"
        list.style.display = "none"
    }else{
        foot_node.style.display = "flex"
        list.style.display = "block"
    }
    const left = all_data.filter((element)=>{return !element.checked}).length
    const left_node = document.getElementById("todo-app__total")
    left_node.innerText = `${left} left`
    // alert('refreshing')
    // if (filter==="all"){
    //     all_data.map((element)=>{
    //         const todo = document.getElementById(`item-${element.id}`)            
    //         todo.style.display = "flex"
    //     })
    // }
    // else if (filter==="active"){
    //     all_data.map((element)=>{
    //         const todo = document.getElementById(`item-${element.id}`)            
    //         if (element.checked === false){
    //             todo.style.display = "flex"
    //         }
    //         else{todo.style.display = 'none'}
    //     })
        
    // }
    // else {// complete
    //     all_data.map((element)=>{
    //         const todo = document.getElementById(`item-${element.id}`)            
    //         if (element.checked === true){
    //             todo.style.display = "flex"
    //         }
    //         else{todo.style.display = 'none'}
    //     })        
    // }
    
}

const delete_complete = function(){

}



