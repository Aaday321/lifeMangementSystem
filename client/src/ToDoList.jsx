import axios from 'axios'
import Cookies from 'js-cookie';
import React, { useEffect, useState, useRef } from 'react'
import { COOKIE_INFO, SERVER_URL } from './exports';

export const listActions = {
  ADD:'addToDo'
}
export const serverResponses = {
  SUCCESS: 'success',
  DUPLICATE: 'duplicate'
}

function ToDoList({ logout, createNewToDo }) {

    const inputRef = useRef('');

    const [ list, setList ] = useState([]);
    const [ input, setInput ] = useState([]);

    const autherized = ()=>{
      if(!(Cookies.get(COOKIE_INFO.KEY) === COOKIE_INFO.VALUE)) return false;
      else return true
    }

    const fetchItems = async function(){
      if(!autherized()) return;
      const response = await axios.get(SERVER_URL+'/list');
      console.log(response.data.list)
      setList(response.data.list);
    }

    const addItem = async function(e){
      e.preventDefault();
      if(!autherized()) return;
      const content = inputRef.current.value;

      const response = await axios.post(SERVER_URL+`/list?action=${listActions.ADD}`, {content});
      switch(response?.data?.toLowerCase()){
        case serverResponses.SUCCESS:
          fetchItems(); break;
        case serverResponses.DUPLICATE:
          console.log('Duplicate entry');
      }
      setInput("");
    }

    const handleChange = e => {
      const val = e.target.value;
      setInput(val);
    }

    useEffect( ()=>{ fetchItems() },[] )

  return (
    <div>
        <form onSubmit={addItem}>
            <label htmlFor="new-to-do"> {"New Thing: "}
                <input type="text" name="new-to-do" ref={inputRef} value={input} onChange={handleChange}/>
            </label>
            <button>Add Item</button>
        </form>
        <ul>
            {list?.map((i, index)=><li key={index}>{i.title}</li>) || ['yaya']}
        </ul>
        <button onClick={logout}>LOGOUT</button>
    </div>
  )
}

export default ToDoList