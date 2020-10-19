import React, {Component} from "react";
import formatCurrency from "../Utils";

class Cart extends Component {
    constructor(props) {
        super(props);
        this.state = {  }
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
                      <button className="button primary" >Procced</button>
                  </div>
                )}
              
            </div>
          );
    }
}
 
export default Cart ;