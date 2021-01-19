import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Product from '../components/Product';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

function HomeScreen () {
    const [ products, setproducts ] = useState([]);
    //set loading screen 
    const [ loading, setLoading ] = useState(false);
    //set error screen 
    const [ error, setError ] = useState('');

    //When page first load, fetch product data from backend 
    useEffect(() => {
        const fetchData = async () => {
            try {
                //setLoading true when start fetching data
                setLoading(true);
                // deconstruct product data array from response obj 
                const { data } = await axios.get('/api/products');
                // console.log(data);
                setproducts(data);
                setLoading(false);
            } catch(err) {
                console.error(err);
                setError(err.message);
                setLoading(false);
            }         
        };
        fetchData();
    }, []);

    return (
        <div>
            {
                loading ? <LoadingBox></LoadingBox> 
                    : error ? <MessageBox variants="danger"> {error} </MessageBox> 
                        : ( <div className='row center'>
			    	{ products.map(product => <Product key={product._id} product={product} />)}
			    </div> )
            }
			
        </div>
    );
}

export default HomeScreen;
