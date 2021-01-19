import React, { useState, useEffect  } from 'react';
import axios from 'axios';
import Product from '../components/Product';

function HomeScreen () {
    const [ products, setproducts ] = useState([]);

    //set loading screen 
    const [ loading, setLoading ] = useState(false)




    //When page first load, fetch product data from backend 
    useEffect(() => {
        const fetchData = async () => {
            // deconstruct product data array from response obj 
            const  { data } = await axios.get('/api/products');
            // console.log(data);
            setproducts(data)
        }
        fetchData();
    }, [])

	return (
		<div>
			<div className='row center'>
				{ products.map(product => <Product key={product._id} product={product} />)}
			</div>
		</div>
	);
}

export default HomeScreen;
