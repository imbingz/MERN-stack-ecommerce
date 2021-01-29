import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingAddress } from '../actions/cartActions';
import CheckoutSteps from '../components/CheckoutSteps';

function ShippingAddressScreen(props) {
    //check if user has already signed in, if not, redirect user to signin 
    const userSignin = useSelector(state => state.userSignin);
    const { userInfo } = userSignin;
    if (!userInfo) {
        props.history.push('/signin');
    }
    //get previous shipping address used from redux store 
    const cart = useSelector(state => state.cart);
    const { shippingAddress } = cart; 
    
    //set shippingaddress as initial States 
    const [fullName, setFullName] = useState(shippingAddress.fullName);
    const [address, setAddress] = useState(shippingAddress.address);
    const [city, setCity] = useState(shippingAddress.city);
    const [zipcode, setZipcode] = useState(shippingAddress.zipcode);
    const [country, setCountry] = useState(shippingAddress.country);
    const dispatch = useDispatch();

    // handle form submission
    const submitHandler = (e) => {
        e.preventDefault();
        // dispatch save shipping address action
        dispatch(saveShippingAddress({fullName, address, city, zipcode, country}));
        //direct user to PaymentScreen
        props.history.push('/payment');
    };


    return (
        <div>
            <CheckoutSteps steps1 steps2/>
            <form className='form' onSubmit={submitHandler}>
                <div>
                    <h1> Shipping Address</h1>
                </div>
                <div>
                    <label htmlFor='fullName'>Full Name</label>
                    <input id='fullName' 
                        placeholder='Enter full name' 
                        type='text' 
                        required 
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='address'>Address</label>
                    <input id='address' 
                        placeholder='Enter address' 
                        type='text' 
                        required 
                        value={address}
                        onChange={(e) => setAddress(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='city'>City</label>
                    <input id='city' 
                        placeholder='Enter city' 
                        type='text' 
                        required 
                        value={city}
                        onChange={(e) => setCity(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='zipcode'>Zipcode</label>
                    <input id='zipcode' 
                        placeholder='Enter Zipcode' 
                        type='text' 
                        required 
                        value={zipcode}
                        onChange={(e) => setZipcode(e.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='country'>Country</label>
                    <input id='country' 
                        placeholder='Enter full country' 
                        type='text' 
                        required 
                        value={country}
                        onChange={(e) => setCountry(e.target.value)}
                    />
                </div>
                <div>
                    <label/>
                    <button className='primary' type='submit'>Continue</button>
                </div>
            </form>
        </div>
    );
}

export default ShippingAddressScreen;
