import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import CartScreen from './screens/CartScreen';

function App () {
    return (
        <BrowserRouter>
            <div className='grid-container'>
                <header className='row'>
                    <div>
                        <a className='brand' href='/'>
							Zankoo
                        </a>
                    </div>
                    <div>
                        <a href='/cart'>Cart</a>
                        <a href='/signin'>Sign In</a>
                    </div>
                </header>
                <main>                  
                    <Route path='/cart/:id?' component={CartScreen} />
                    <Route path='/product/:id' component={ProductScreen} />
                    <Route exact path='/' component={HomeScreen} />
                </main>
                <footer className='row center'>All right reserved</footer>
            </div>
        </BrowserRouter>
    );
}

export default App;
