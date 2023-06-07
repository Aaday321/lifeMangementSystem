import { useState, useEffect } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import {
  useQuery,
  useMutation,
  useQueryClient,
  QueryClient,
  QueryClientProvider,
} from 'react-query'
import axios from 'axios'
import LogIn from './LogIn'
import ToDoList from './ToDoList'
import Cookies from 'js-cookie'
import { COOKIE_INFO, SERVER_URL } from './exports'

const queryClient = new QueryClient();

function App() {

  const logInState = useState(false);
  const [ loggedIn, setLoggedIn ] = logInState;

  function validCookie(){
    if(Cookies.get(COOKIE_INFO.KEY) === COOKIE_INFO.VALUE) return Cookies.get(COOKIE_INFO.KEY);
    else return false;
  }

  function autoLogIn(){
    if(!validCookie()) return;
    else setLoggedIn(true);
    console.log("AUTO LOG-IN ACTIVATED");
  }

  function logout(){
    Cookies.set(COOKIE_INFO.KEY, 'Nah bruh, quit looking at the damn cookies and mind your bidness');
    setLoggedIn(false);
  }
 
  
  function createToDoItem(){

  }

  function getToDoItems() {
    axios.get({
      
    })
  }

  function recheckForNewToDos(){

  }

  useEffect(()=>{autoLogIn()},[])

  return (
    <>
    { loggedIn === false &&
     <LogIn logInState={ logInState }/>
    }
    {
      loggedIn === true &&
      <ToDoList logout={ logout }/>
    }
    </>
  )
}

export default App
