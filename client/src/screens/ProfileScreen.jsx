import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { detailsUser, updateUserProfile } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { USER_UPDATE_PROFILE_RESET } from '../constants/userConstants';

function ProfileScreen() {
    //set States for form inputs 
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');

    // get userinfo from redux store 
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    // const loading = false;
    // const error = false;

    // get userDetails from redux store 
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    // get updated userInfo from redux store 
    const userUpdatedProfile = useSelector(state => state.userUpdateProfile);
    const { success: successUpdate, loading: loadingUpdate, error: errorUpdate } = userUpdatedProfile;

    //dispatch userDetail action when page load 
    const dispatch = useDispatch();
    useEffect(() => {
        if(!user) {
            //reset user profile update 
            dispatch({type:USER_UPDATE_PROFILE_RESET});
            //dispatch actions to get user details 
            dispatch(detailsUser(userInfo._id));
        } else {
            setName(user.name);
            setEmail(user.email);
        }
    }, [dispatch, userInfo._id, user]);

    //handler profile update 
    const submitHandler = (e) => {
        e.preventDefault();
        //check whether passwords match
        if(password !== confirmPassword) {
            alert('Password and confirm password do not match');
        } else {
            //disptach update profile
            dispatch(updateUserProfile({ userId: user._id, name, email, password }));
        }
    };


    return (
        <div>
            <form className='form'
                onSubmit={submitHandler}
            >
                <div>
                    <h1>User Prodile</h1>
                </div>
                {
                    loading ? <LoadingBox />
                        : error ? <MessageBox> {error} </MessageBox>
                            : (
                                <>
                                    { loadingUpdate && < LoadingBox /> }
                                    { errorUpdate && < MessageBox variant='danger'> { errorUpdate } </MessageBox>}
                                    { successUpdate && < MessageBox variant='success'> Profile updated successfully </MessageBox>}
                                    <div>
                                        <label htmlFor="name">Name</label>
                                        <input type="text" id="name" value={name}
                                            onChange={(e)=> setName(e.target.value)}
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input type="email" id="email" value={email}
                                            onChange={ (e) => setEmail(e.target.value) }
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="password">Password</label>
                                        <input type="password" id="password" placeholder='Change Password'
                                            onChange={ (e) => setPassword(e.target.value) }
                                        />
                                    </div>
                                    <div>
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <input type="password" id="confirmPassword" placeholder='Confirm Password' 
                                            onChange={ (e) => setConfirmPassword(e.target.value) }
                                        />
                                    </div>
                                    <div>
                                        <label />
                                        <button className='primary' type='submit'
                                        >Update</button>
                                    </div>
                                </>
                            )
                }
            </form>
        </div>
    );
}

export default ProfileScreen;
