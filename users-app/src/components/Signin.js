import React, {useState} from 'react';
import axios from 'axios';

function Signin(props) {
  const [user, setUser] = useState({})
  const changeHandler = (e)=>{
      {setUser({...user,[e.target.name]:e.target.value})}
  }
  return (
      <div>
          <form>
              <input name='username' onChange={changeHandler} placeholder='Username'></input>
              <input name='password' onChange={changeHandler}placeholder='Password'></input>
              <button type='submit' onClick={(e)=>{}}>Login</button>
          </form>
      </div>
  );
}
export default Signin;