import axios from 'axios';
import React from 'react'
import { useState, useEffect } from 'react'
import { SERVER_URL } from './exports';
import Cookies from 'js-cookie'
import { COOKIE_INFO } from './exports';

function LogIn({logInState}) {

  const [ password, setPassword ] = useState();
  const [ msg, setMsg ] = useState();

  //Clicked the log in button and then this function runs
  async function handleSubmit(e) {
    e.preventDefault();
    if(!password) return;

    const response = await axios({
      method: 'post',
      url: SERVER_URL + '/login',
      data: { password },
      credentials: 'include'
    })

    if(response.data.msg === COOKIE_INFO.VALUE){
      console.log(response.data);
      logInState[1](true); //Logs you into parent component
      Cookies.set(COOKIE_INFO.KEY, COOKIE_INFO.VALUE);
      console.log(Cookies.get(COOKIE_INFO.KEY)); 
    }else{
      setMsg(response.data.msg);
    }
  }



  return (
    <form onSubmit={handleSubmit}> 
        <h1>Ade's to do list</h1>
        <input type="text" placeholder='password' onChange={e=>setPassword(e.target.value)} value={password}/>
        <button>Log In</button>
        <p>{msg}</p>
    </form>
  )
}

export default LogIn