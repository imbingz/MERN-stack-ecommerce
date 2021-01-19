import React from 'react';
import { Link } from 'react-router-dom';
import Rating from '../components/Rating';
import data from '../data/products';

function ProductScreen (props) {
	// console.log(props);

	//props.match.params is the url path /product/:id
	//props.match.params.id = id (1, 2 , 3 etc... )
	// only return the product info of the one being clicked
	const product = data.products.find(p => p._id === props.match.params.id);
	return (
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
											<span className='error'> Unavailable</span>
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
	);
}

export default ProductScreen;
