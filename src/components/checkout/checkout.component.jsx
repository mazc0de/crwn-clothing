import { useContext } from "react";
import { CartContext } from "../../contexts/cart.context";
import CheckoutItem from "../checkout-item/checkout-item.component";

import "./checkout.style.scss";

const Checkout = () => {
    const { cartItems, cartTotal } = useContext(CartContext);
    console.log(cartItems);

    const checkoutMenus = ["Product", "Description", "Quantity", "Price", "Remove"];

    return (
        <>
            <div className="checkout-container">
                <div className="checkout-header">
                    {checkoutMenus.map((checkoutMenu, index) => {
                        return (
                            <div className="header-block" key={index}>
                                {checkoutMenu}
                            </div>
                        );
                    })}
                </div>
                {cartItems.map((cartItem) => {
                    return <CheckoutItem key={cartItem.id} cartItem={cartItem} />;
                })}
                <span className="total">Total : $ {cartTotal}</span>
            </div>
        </>
    );
};

export default Checkout;
