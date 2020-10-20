import React, {Component} from "react";
import formatCurrency from "../Utils";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            name :"",
            email : "",
            adresse : "",
            checkout : false,
        }
    }
    handleInput = (event) =>{
        this.setState({[event.target.name]:event.target.value});
    }
    createOrder = (e) =>{
        e.preventDefault();
        const order ={
            name:this.state.name,
            email:this.state.email,
            adresse:this.state.adresse,
            cartItem:this.props.cartItem,
        };
        this.props.createOrder(order);
    }
    render() { 
        const {cartItems} = this.props;
        return (
            <div>
                {cartItems.length === 0?
                (<div className="cart cart-header" >Cart is empty </div>)
                :(<div className="cart cart-header" >You have {cartItems.length} in the Cart {" "} </div>)
                }
                <div>
                    <ul className="cart-item">
                        {cartItems.map(item => (
                            <li key={item._id}>
                            <div>
                           <div>
                               <img src={item.image} alt={item.title}></img>
                           </div>
                           <div>
                               <div>{item.title}</div>
                               <div className="rght">
                                   {formatCurrency(item.price)} * {item.count}{" "}
                                   <button className="button" onClick={() => this.props.removeFormCart(item)}>Remove</button>
                               </div>
                               
                           </div>
                        </div>
                        </li>
                        ))}
                    </ul>
                </div>
                {cartItems.length > 0 && (
                      <div className="cart">
                      <div className="total">
                          <div>
                              Total : {" "}
                              {formatCurrency(cartItems.reduce((a,b) => (a + (b.price*b.count)),0))}
                          </div>
                      </div>
                      <button className="button primary" onClick={() =>{this.setState({checkout:true})}} >Procced</button>
                  </div>
                )}
              {this.state.checkout && (
                <div className="form-container">
                    <form onSubmit={this.createOrder}  >
                        <ul>
                            <li>
                                <label>Name :</label>
                                <input type="text" required="required" name="name" onChange={this.handleInput}></input>
                            </li>
                            <li>
                                <label>email :</label>
                                <input type="email" required="required" name="adresse" onChange={this.handleInput} ></input>
                            </li>
                            <li>
                                <label>adresse :</label>
                                <input type="text" required="required" name="adresse" onChange={this.handleInput}></input>
                            </li>
                            <li>
                        <button className="button primary" type="submit" >Create Order</button>
                        </li>
                        </ul>
                    </form>
                </div>
                   )}
            </div>
          );
    }
}
 
export default Cart ;