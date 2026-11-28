import { Link } from "react-router-dom";
import { useCartStore } from "../stores/cartStore";
import { ShoppingBag } from "lucide-react";

function Header() {
  const items = useCartStore((state) => state.items);
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  return (
    <header className="header">
      <div className="header-container">
        <Link to="/" className="logo">
          Online shop
        </Link>

        <nav className="navigation">
          <Link to="/">Home</Link>
          <Link to="/contact">Contact</Link>
          <Link to="/cart" className="cart-link">
            <ShoppingBag size={22} />
            <span>Cart ({totalItems})</span>
          </Link>
        </nav>
      </div>
    </header>
  );
}

export default Header;
