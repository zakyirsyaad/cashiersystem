import React from "react";

export const ComponentToPrint = React.forwardRef((props, ref) => {
    const { cart, totalAmount } = props
    return (
        <div ref={ref}>
            <div className="cart_box">
                <div className="navbar_cart">
                    <p className="name_cart">#</p>
                    <p className="name_cart">name</p>
                    <p className="name_cart">Price</p>
                    <p className="name_cart">Quantity</p>
                    <p className="name_cart">Total</p>
                </div>
                <div className="list_cart">
                    {cart ? cart.map((cartProduct, Key) =>
                        <div key={Key} className="list_item">
                            <p className="item">{cartProduct.id}</p>
                            <p className="item">{cartProduct.name}</p>
                            <p className="item">${cartProduct.price}</p>
                            <p className="item">{cartProduct.quantity}pcs</p>
                            <p className="item" >{cartProduct.totalAmount}pcs</p>
                        </div>

                    )
                        : ''}
                </div>
                <p>Total Amount : ${totalAmount}</p>
            </div>
        </div >
    );
});