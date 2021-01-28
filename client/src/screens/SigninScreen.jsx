import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { signin } from '../actions/userAction';

function SigninScreen() {
    // set states for email and password 
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useDispatch();

    // handle login form submit 
    const submitHandler = (e) => {
        e.preventDefault();
        // signin action here
        dispatch(signin(email, password));
        
    };


    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Sign In</h1>
                </div>
                <div>
                    <label htmlFor="email">Email: </label>
                    <input type="email" 
                        id="email" 
                        placeholder="Enter email" 
                        value={email}
                        required
                        onChange = {(e) => setEmail(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor="password">Password: </label>
                    <input type="password" 
                        id="password" 
                        placeholder="Enter password" 
                        value={password}
                        required
                        onChange = {(e) => setPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Sign In</button>
                </div>
                <div>
                    <label />
                    <div>
                      New customer?{ ' ' }<Link to='/register'>Create your account</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SigninScreen;
