import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { detailsUser } from '../actions/userAction';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function ProfileScreen() {
    // get userinfo from redux store 
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;

    // const loading = false;
    // const error = false;
    
    // get userDetails from redux store 
    const userDetails = useSelector(state => state.userDetails);
    const { loading, error, user } = userDetails;

    console.log('user obj:', user);

    //dispatch userDetail action when page load 
    const dispatch = useDispatch();
    useEffect(() => {
        //dispatch actions to get user details 
        dispatch(detailsUser(userInfo._id));
    }, [dispatch, userInfo._id]);

    const submitHandler = (e) => {
        e.preventDefault();
        //disptach update profile

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
                                    <div>
                                        <label htmlFor="name">Name</label>
                                        <input type="text" id="name" value={userInfo.name}/>
                                    </div>
                                    <div>
                                        <label htmlFor="email">Email</label>
                                        <input type="email" id="email" value={userInfo.email}/>
                                    </div>
                                    <div>
                                        <label htmlFor="password">Password</label>
                                        <input type="password" id="password" placeholder='Change Password'/>
                                    </div>
                                    <div>
                                        <label htmlFor="confirmPassword">Confirm Password</label>
                                        <input type="password" id="confirmPassword" placeholder='Confirm Password' />
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
