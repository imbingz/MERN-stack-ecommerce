import React from 'react'
import { AiFillStar } from 'react-icons/ai';

function Product(props) {

    const { product } = props
    return (
        <div className="card">
              <a href={`/product/${product._id}`}>
               
                <img className="medium" src={product.image} alt="product" />
              </a>
              <div className="card-body">
                <a href={`/product/${product._id}`}>
                  <h2>{product.name}</h2>
                </a>
                <div className="rating">
                  <span> < AiFillStar/> </span>
                  <span> < AiFillStar/> </span>  
                  <span> < AiFillStar/> </span>
                  <span> < AiFillStar/> </span>
                  <span> < AiFillStar/> </span>
                </div>
                <div className="price">${product.price}</div>
              </div>
            </div>
    )
}

export default Product
