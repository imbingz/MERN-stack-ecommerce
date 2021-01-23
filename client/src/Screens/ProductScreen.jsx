import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import Rating from '../components/Rating';
import { detailsProduct } from '../actions/productActions';
// import data from '../data/products';

function ProductScreen (props) {
    // console.log(props);

    const dispatch = useDispatch();
    //props.match.params is the url path /product/:id
    //props.match.params.id = id (1, 2 , 3 etc... )
    // only return the product info of the one being clicked
    const productId = props.match.params.id;

    // use store productDetails to replace product from seed data
    const productDetails = useSelector(state => state.productDetails);
    // decontruct product, loading, error from productDetails 
    const { product, loading, error } = productDetails;

    // console.log(productDetails);

    useEffect(() => {
        dispatch(detailsProduct(productId));
    
    }, [dispatch, productId]); 
   

    return (
        <div>
            {
                loading ? <LoadingBox />
                    : error ? <MessageBox variants="danger"> { error } </MessageBox>
                        : (
                            <div>
                                {/* back to result link  */}
                                <Link to='/'> Back To Result</Link>

                                <div className='row top'>
                                    {/* product image */}
                                    <div className='col-2'>
                                        <img className='large' src={product.image} alt={product.name} />
                                    </div>

                                    {/* description */}
                                    <div className='col-1'>
                                        <ul>
                                            <li>
                                                <h1>{product.name}</h1>
                                            </li>
                                            <li>
                                                <Rating rating={product.rating} numReviews={product.numReviews} />
                                            </li>
                                            <li>Price: ${product.price}</li>
                                            <li>
                                                Description:
                                                <p>{product.description} </p>
                                            </li>
                                        </ul>
                                    </div>

                                    {/* action */}
                                    <div className='col-1'>
                                        <div className='card car-body'>
                                            <ul>
                                                <li>
                                                    <div className='row'>
                                                        <div>Price </div>
                                                        <div className='price'>${product.price}</div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <div className='row'>
                                                        <div>Status </div>
                                                        <div>
                                                            {
                                                                product.countInStock > 0 ? <span className='success'> In Stock</span> :
                                                                    <span className='danger'> Unavailable</span>
                                                            }
                                                        </div>
                                                    </div>
                                                </li>
                                                <li>
                                                    <button className='primary block'>Add to Cart</button>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )}
        </div>
    );
}

export default ProductScreen;
