import React from 'react';
import Filter from './components/Filter';
import Products from './components/Products';
import data from "./data.json"



class App extends React.Component {
  constructor(){
    super();
    this.state = {
        products :data.products,
        size:"ALL",
        sort:"",
      };
    
  }
  s
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
            <Products products={this.state.products} />
          </div>
          <div className="sidebar">Sidebar</div>
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
