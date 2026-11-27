import { useCartStore } from '../stores/cartStore';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

function Cart() {
    const items = useCartStore((state) => state.items);
    const removeItem = useCartStore((state) => state.removeItem); 
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const totalItems = items.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = items.reduce((total, item) => {
        const productPrice = item.price;
        return total + (item.quantity * productPrice);
    }, 0);
    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const clearCart = useCartStore((state) => state.clearCart);
    const handleCheckout = () => {
        clearCart();
        navigate('/checkout-success');
    };
    const handleRemoveItem = (productId: string) => {
        removeItem(productId);
        setShowToast(true);

        setTimeout(() => {
            setShowToast(false);
        }, 4000);
    }

    if (items.length === 0) {
        return(
            <section>
                {showToast && <p>Product removed from cart!</p>}
                <p>Your cart is empty.</p>
            </section> 
        );
    }

    return (
        <section>
            <h2>Shopping Cart</h2>
            {showToast && <p>Product removed from cart!</p>}
            <p>Total items: {totalItems}</p>
            <ul>
                {items.map((item) => (
                    <li key={item.productId}>
                        <h3>{item.title}</h3>
                        <p>Price: {item.price} kr:</p>
                        <p>Quantity: {item.quantity}</p>
                        <button onClick={() => {
                            if (item.quantity === 1) {
                                handleRemoveItem(item.productId);
                            } else {
                                updateQuantity(item.productId, item.quantity - 1);
                            }
                        }}>
                            -
                        </button>
                        <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                            +
                        </button>
                        <button onClick={() => handleRemoveItem(item.productId)}>
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
            <p>Total Price: <strong>{totalPrice} kr</strong></p>
            <button onClick={handleCheckout}>Checkout</button>
        </section>
    );
}

export default Cart;