import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { login, reset } from '../features/auth/authSlice';

function Login() {

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const [formData, setFormData] = useState({
        username: '',
        password: '',
      })

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const { user, isLoading, isError, isSuccess, message } = useSelector( (state) => state.auth )

    
      useEffect(() => {
        if (isError) {
        //   toast.error(message)
        }
    
        if (isSuccess || user) {
          navigate('/')
        }
    
        dispatch(reset())
      }, [user, isError, isSuccess, message, navigate, dispatch])
    
      const onChange = (e) => {
        setFormData((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
        }))
      }
    
      const onSubmit = (e) => {
    
        e.preventDefault()
    
        const userData = {
          username,
          password,
        }
    
        dispatch(login(userData))
      }

    return (
        <div>
            <h1 className='d-flex align-items-center justify-content-center' >- LOGIN -</h1>
             <div className="p-5 card mt-5" style={{width:'75%',margin:'auto'}}>
                <form>
                    <div className="form-group">
                        <label>Username</label>
                        <input type="text" className='form-control' placeholder='username' onChange={(e)=> setUsername(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Password</label>
                        <input type="password" className='form-control' placeholder='password' onChange={(e)=> setPassword(e.target.value)} />
                    </div>
                    <div className="text-center">
                        <button type="button" class="btn btn-blue" onClick={onSubmit}>Login</button>
                    </div>                  
                </form>
            </div>
        </div>
    );
}

export default Login;