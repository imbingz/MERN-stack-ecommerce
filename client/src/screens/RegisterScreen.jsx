import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { register } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function SigninScreen(props) {
    // set states for email and password 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // redirect user to shipping screen after sign in 
    //first check if there is redirect query param on the url
    const redirect = props.location.search ? props.location.search.split('=')[1] : '/';

    //get userInfo from redux store 
    const userRegister = useSelector(state => state.userRegister);
    const { userInfo, loading, error } = userRegister;

    const dispatch = useDispatch();

    // handle login form submit 
    const submitHandler = (e) => {
        e.preventDefault();
        // check if password and confirm password match
        if(password !== confirmPassword) {
            alert('password and confirm password do not match');
        } else {
            // register action here
            dispatch(register(name, email, password)); 
        }
        
    };

    // if userInfo, redirect user on page load
    useEffect(() => {
        if(userInfo) {
            props.history.push(redirect);
        }
    }, [userInfo, redirect, props.history]);


    return (
        <div>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1>Create An Account</h1>
                    {
                        loading && 
                        <LoadingBox />
                    }
                    {
                        error && 
                        <MessageBox variant="danger">{error}</MessageBox>
                    }
                </div>
                <div>
                    <label htmlFor="name">Name: </label>
                    <input type="name" 
                        id="name" 
                        placeholder="Enter name" 
                        value={name}
                        required
                        onChange = {(e) => setName(e.target.value)}
                    />
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
                    <label htmlFor="confirmPassword">Confirm Password: </label>
                    <input type="password" 
                        id="confirmPassword" 
                        placeholder="Confirm password" 
                        value={confirmPassword}
                        required
                        onChange = {(e) => setConfirmPassword(e.target.value)}
                    />
                </div>
                <div>
                    <label />
                    <button className="primary" type="submit">Register</button>
                </div>
                <div>
                    <label />
                    <div>
                      Already have an account?{ ' ' }<Link to={`/signin?redirect=${redirect}`}>Sign In</Link>
                    </div>
                </div>
            </form>
        </div>
    );
}

export default SigninScreen;
