import React, {useState} from 'react';
import axios from 'axios';

function Register(props){
  const [user, setUser]= useState({})

  const changeHandler = (e) => {
      setUser({...user, [e.target.name]:e.target.value})
  }

  const onSubmit = (e) => {
    e.preventDefault();
    const server = 'http://localhost:5001/api/auth/register'
    axios.post(server, user)
    .then(res => {
      props.history.push('/login')
    })
    .catch(err => {
      console.log(err);
    })
  }
  return (
    <div>
      <form>
        <input name='username' type='text' placeholder='Username' onChange={changeHandler}></input>
        <input name='password' type='password' placeholder='Password' onChange={changeHandler}></input>
        <button onClick={()=> {onSubmit()}} type='submit'>Register</button>
      </form>

    </div>

  )
}

export default Register;