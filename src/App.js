import React from 'react';

import Filter from './components/Filter';
import Products from './components/Products';

import Cart from './components/Cart';

import data from "./data.json"




class App extends React.Component {
  constructor(){
    super();
    this.state = {
        products :data.products,
        size:"ALL",
        sort:"",
        cartItems : localStorage.getItem("cartItem")? JSON.parse(localStorage.getItem("cartItem")):[],
      }; 
  }

  addToCart =  (product) => {
    const cartItems = this.state.cartItems.slice();
    let itemExist = false;
    cartItems.forEach(item => {
      if(item._id === product._id){
        item.count++;
        itemExist = true;
      }
    });
    if(!itemExist){
      cartItems.push({
        ...product,
        count : 1,
      });
    }
    this.setState({cartItems});
    localStorage.setItem("cartItem",JSON.stringify(cartItems));
  }

  sortProducts = event =>{
    const sort = event.target.value;
    this.setState(state => ({
      products : state.products.slice().sort((a,b) =>(
        sort === "lowest"?
        (a.price > b.price ? 1:-1)
        :sort === "highest"?
        (a.price < b.price ? 1:-1)
        :(a._id > b._id ? 1:-1)
      )),
      sort : sort
     
    }))
  }

  filterProducts = event =>{
    console.log(event.target.value);
    this.setState({
      size :event.target.value,
      products : data.products.filter(product => 
        (event.target.value === "ALL" ? true : product.availableSizes.indexOf(event.target.value) >= 0)
        ),
    });
  }

  remove = product =>{
   const cartItems = this.state.cartItems.slice();
   this.setState({
     cartItems : cartItems.filter(x => x._id !== product._id),
   })
   localStorage.setItem("cartItem",JSON.stringify(this.state.cartItems));
  }

  createOrder= (order) =>{
    alert("New order has been create : "+order.name);
  }
  render(){
   
    return (
      <div className="grid-container">
        <header >
          <a href="/">React Shopping Cart</a>
        </header>
        <main>
        <div className="content">
          <div className="main">
            <Filter count={this.state.products.length} size={this.state.size} sort={this.state.sort} 
            sortProducts={this.sortProducts}   filterProducts={this.filterProducts} />
            <Products products={this.state.products} add={this.addToCart} ></Products>
          </div>
          <div className="sidebar">
            <Cart cartItems={this.state.cartItems}  removeFormCart={this.remove} createOrder={this.createOrder}></Cart>
          </div>
        </div>
        </main>
        <footer>
          All right is reserved.
        </footer>
      </div>
    );
  }
  
}

export default App;
