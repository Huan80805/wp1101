//import logo from './logo.svg';
import './App.css';
import './styles.css';
import pic from './x.png'
import React, { useState } from 'react';

function Add(props) {
    const [undone,setUndone] = useState(0)
    const [todo,setTodo] = useState("")
    const [todoList,setTodoList] = useState([])
    const [showActive, setShowActive] = useState(false)
    const [showDone, setShowDone] = useState(false)



    const undone_p = () => setUndone(undone + 1)
    const undone_m = () => setUndone(undone - 1)
    const showDone_t = () => setShowDone(true)
    const showDone_f = () => setShowDone(false)
    const showActive_t = () => setShowActive(true)
    const showActive_f = () => setShowActive(false)
    const input_clear = () => setTodo("")

    const addtolist = () => setTodoList(todoList => [ ...todoList, [todo,0]]);

    const add_new = (e) => {
      if (e.code === "Enter" && e.target.value !== ""){
        addtolist()
        undone_p() 
        e.target.value = ""
        input_clear()
    } }

    const press_button = index => e => {
      let temp = todoList[index] 
      let temp_a = todoList

      if(temp[1] ===1){
        temp_a[index]  = [temp[0], 0]  
        undone_p()
      }
      else{
        temp_a[index]  = [temp[0], 1]
        undone_m()
    }
    setTodoList(temp_a)
  } 
      

    const press_close = index => e =>{
      const temp = todoList[index]   
      setTodoList( todoList.filter((e) => (e !== temp)))
      console.log(temp)
      if (temp[1] === 0)
        {undone_m()}
    }

    const show_all = () =>{
    showDone_f() 
    showActive_f() 
    }
    const show_done = () =>{
      showDone_t() 
      showActive_f() 
    }
    const show_undone = () =>{
      showDone_f() 
      showActive_t() 
    }
    const clear = () =>{
      const todelete = todoList
      const towork = todelete.filter(e => e[1]===0)
      console.log(todoList)
      console.log(towork)
      setTodoList(towork)
  }
    

    return( 
     
     <div className = "todo-app__root">
      <header className = "todo-app__header">
        <h1 className = "todo-app__title">TODOS</h1>
      </header>

      <section className = "todo-app__main">
        <input className = "todo-app__input"  placeholder = "what do you plan to do today?" onChange={e => setTodo(e.target.value )} onKeyUp = {add_new}/>
        <ul className = "todo-app__list" id = "todo-list" >     
          {todoList.map ( (todo,index) => (      
            <li className= "todo-app__item" key= {todo[0]+index} style = {{ display: showActive === true ? (todoList[index][1] === 1 ? 'none' : 'flex' ): showDone === true ? (todoList[index][1] === 0 ? 'none' : 'flex' ) : 'flex'}}>
              <div className="todo-app__checkbox" onClick = {press_button(index)} >
                <input id ="2" type = "checkbox" />
                <label htmlFor = {todo[0]} style = {{ backgroundColor: todoList[index][1] === 0 ? '#ddd'  : 'rgb(10, 219, 10)'}}/>
              </div>     
              <h1 className="todo-app__item-detail" style = {{ textDecorationLine: todoList[index][1] === 0 ? 'none' : 'line-through', opacity: todoList[index][1] === 0 ?'1':'0.5'}}> {todo[0]} </h1>
              <img src = {pic} alt = "X" className = "todo-app__item-x" onClick = {press_close(index)}/>   
            </li>
          ))}
        </ul>
      </section>

      <footer className = "todo-app__footer" id="todo-footer" style = {{display: todoList.length === 0 ?  'none' : 'flex'}}>
        <div className = "todo-app__total">{undone} left</div>
        <ul className = "todo-app__view-buttons">
          <button className = "todo-app__view-buttons_all" onClick = {show_all}>All</button>
          <button className = "todo-app__view-buttons_active" onClick = {show_undone}>Active</button>
          <button className = "todo-app__view-buttons_completed" onClick = {show_done}>Completed</button>
    
        </ul>
        <div className = "todo-app__clean">          
          <button className = "todo-app__clean_clear" onClick = {clear}>Clear completed</button>
        </div>
      </footer>
      </div>
     )
}

export default Add;
