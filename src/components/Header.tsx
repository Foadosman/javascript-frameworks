import { Link } from 'react-router-dom';

function Header() {
    return (
        <header>
            <h1>Online Shop</h1>

            <nav>
                <Link to="/">Home</Link>
                <Link to="/cart">Cart</Link>
                <Link to="/contact">Contact</Link>
            </nav>
        </header>
    );
}

export default Header;