import React from 'react';
import data from './data/products';
import { AiFillStar } from 'react-icons/ai';

function App() {
  return (
    <div className="grid-container">
      <header className="row">
        <div>
          <a className="brand" href="index.html">amazona</a>
        </div>
        <div>
          <a href="/cart">Cart</a>
          <a href="/signin">Sign In</a>
        </div>
      </header>
      <main>
        <div>
          <div className="row center">
              {data.products.map(product => (<div className="card">
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
            </div>))}         
          </div>
        </div>
      </main>
      <footer className="row center">All right reserved</footer>
    </div>
  );
}

export default App;
