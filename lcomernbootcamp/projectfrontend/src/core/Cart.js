import React, {useState, useEffect} from 'react'
import "../styles.css";
import {API} from "../backend";
import Base from './Base';
import Card from './Card';
import { loadCart } from './helper/CartHelper';




const Cart = () => {

   const [products, setProducts] = useState([]);
   const [reload, setReload] = useState(false);


   useEffect(() => {
    setProducts(loadCart());
   }, [reload])
   
  const loadAllProducts = (products) => {
        return(
            <div>
                <h2>
                    This Section is to load products
                </h2>
                {products.map((product, index) => {
                  return  <Card
                     key={index}
                     product={product}
                     removeFromCart={true}
                     addToCart={false}
                     setReload = {setReload}
                     reload = {reload}
                    />
                })}
              </div>
        );
    } ;


    const loadCheckout = () => {
        return(
            <div>
                <h2>
                    This Section is for Checkout
                </h2>
              </div>
        );
    };

    return (
        <Base effect title="My Cart" description="Ready to checkout">
            <div className="row text-center">
                <div className="col-6">
                {products.length > 0? (
                    loadAllProducts(products)
                    ) : (
                        <h3>NO PRODUCTS IN CART</h3>
                    )}
                    </div>
                <div className="col-6">
                        <h3> Section for checkout</h3>
                </div>
            </div>

        </Base>
    );
} 


export default Cart;