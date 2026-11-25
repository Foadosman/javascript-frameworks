import { Link } from 'react-router-dom';
import { useCartStore } from '../stores/cartStore';

function Header() {
    const items = useCartStore((state) => state.items);
    const totalItems = items.reduce((total, item) => total + item.quantity, 0);
    return (
        <header>
            <h1>Online Shop</h1>

            <nav>
                <Link to="/">Home</Link>
                <Link to="/cart">Cart ({totalItems})</Link>
                <Link to="/contact">Contact</Link>
            </nav>
        </header>
    );
}

export default Header;