import { CircleCheck } from "lucide-react";
import { Link } from "react-router-dom";

function CheckoutSuccess() {
  return (
    <div className="checkout-success">
      <CircleCheck size={64} color="#39845a" />
      <h2>Checkout successful!</h2>
      <p>Thank you for your purchase</p>
      <Link to="/" className="continue-shopping">
        Continue shopping
      </Link>
    </div>
  );
}

export default CheckoutSuccess;
