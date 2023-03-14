import axios from "axios";
import { Component, useEffect, useRef, useState } from "react";
import { useReactToPrint } from "react-to-print";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { ComponentToPrint } from "../component/ComponentToPrint";

export default function Cashier() {
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(false)
    const [cart, setCart] = useState([])
    const [totalAmount, setTotalAmount] = useState(0)

    const fetchProducts = async () => {
        setIsLoading(true)
        const result = await axios.get('products')
        setProducts(await result.data)
        setIsLoading(false)
    }
    const addProductsToCart = async (product) => {
        let findProductInCart = await cart.find(i => {
            return i.id === product.id
        })

        if (findProductInCart) {
            let newCart = [];
            let newItem;


            cart.forEach(cartItem => {
                if (cartItem.id === product.id) {
                    newItem = {
                        ...cartItem,
                        quantity: cartItem.quantity + 1,
                        totalAmount: cartItem.price * (cartItem.quantity + 1)
                    }
                    newCart.push(newItem)
                } else {
                    newCart.push(cartItem)
                }
            })
            setCart(newCart)
            toast(`added ${newItem.name} to cart`, {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })

        } else {
            let addingProduct = {
                ...product,
                'quantity': 1,
                'totalAmount': product.price,
            }
            setCart([...cart, addingProduct])
            toast(`added ${product.name} to cart`, {
                position: "top-left",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            })

        }
    }

    const removeProduct = async (product) => {
        const newCart = cart.filter(cartItem => cartItem.id !== product.id)
        setCart(newCart)
    }
    const componentRef = useRef()

    const handleReactToPrint = useReactToPrint({
        content: () => componentRef.current,
    })

    const handlePrint = () => {
        handleReactToPrint()
    }

    useEffect(() => {
        fetchProducts()
    }, [])

    useEffect(() => {
        let newTotalAmount = 0
        cart.forEach(icart => {
            newTotalAmount = newTotalAmount + parseInt(icart.totalAmount)
        })
        setTotalAmount(newTotalAmount)
    }, [cart])

    useEffect(() => {
        console.log(products)
    }, [products])
    return (
        <div className="cashier">
            <p className="cashier_header">Cashier Menu</p>
            <div className="cashier_container">
                <div className="cashier_menu">
                    {isLoading ? 'loading' :
                        <div className="cashier_menu">
                            {
                                products.map((product, key) =>
                                    <div key={key} className="menu_container">
                                        <div className="menu" onClick={() => addProductsToCart(product)}>
                                            <p>{product.name}</p>
                                            <img src={product.image} alt={product.name} className='image_menu'></img>
                                            <p>{product.price}</p>
                                        </div>
                                    </div>
                                )
                            }
                        </div>
                    }
                </div>
                <div className="cart_menu">
                    <div style={{ display: "none" }}>
                        <ComponentToPrint cart={cart} totalAmount={totalAmount} ref={componentRef} />
                    </div>
                    <p className="cart_header">Cart Menu</p>
                    <div className="cart_box">
                        <div className="navbar_cart">
                            <p className="name_cart">#</p>
                            <p className="name_cart">name</p>
                            <p className="name_cart">Price</p>
                            <p className="name_cart">Quantity</p>
                            <p className="name_cart">Total</p>
                            <p className="name_cart">Action</p>
                        </div>
                        <div className="list_cart">
                            {cart ? cart.map((cartProduct, Key) =>
                                <div key={Key} className="list_item">
                                    <p className="item">{cartProduct.id}</p>
                                    <p className="item">{cartProduct.name}</p>
                                    <p className="item">${cartProduct.price}</p>
                                    <p className="item">{cartProduct.quantity}pcs</p>
                                    <p className="item" >{cartProduct.totalAmount}pcs</p>
                                    <button onClick={() => removeProduct(cartProduct)}>remove</button>
                                </div>

                            )
                                : 'No Item in Cart'}
                        </div>
                        <p>Total Amount : ${totalAmount}</p>
                    </div>

                    <div>
                        {totalAmount !== 0 ?
                            <div>
                                <button onClick={handlePrint}>Pay Now</button>
                            </div> : 'please add a product to the cart'
                        }
                    </div>
                </div>
            </div>
            <ToastContainer />
        </div >
    );
}