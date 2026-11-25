import { useCartStore } from '../stores/cartStore';

function Cart() {
    const items = useCartStore((state) => state.items);
    const removeItem = useCartStore((state) => state.removeItem); 
    const updateQuantity = useCartStore((state) => state.updateQuantity);
    const totalItems = items.reduce((total, item) => total + item.quantity, 0);
    const totalPrice = items.reduce((total, item) => {
        const productPrice = item.price;
        return total + (item.quantity * productPrice);
    }, 0);

    return (
        <section>
            <h2>Shopping Cart</h2>
            <p>Total items: {totalItems}</p>
            <ul>
                {items.map((item) => (
                    <li key={item.productId}>
                        <h3>{item.title}</h3>
                        <p>Price: {item.price} kr:</p>
                        <p>Quantity: {item.quantity}</p>
                        <button onClick={() => updateQuantity(item.productId, item.quantity - 1)}>
                            -
                        </button>
                        <button onClick={() => updateQuantity(item.productId, item.quantity + 1)}>
                            +
                        </button>
                        <button onClick={() => removeItem(item.productId)}>
                            Remove
                        </button>
                    </li>
                ))}
            </ul>
            <p>Total Price: <strong>{totalPrice} kr</strong></p>
        </section>
    );
}

export default Cart;