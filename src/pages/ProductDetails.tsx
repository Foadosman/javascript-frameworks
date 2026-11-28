import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Product, SingleProductApiResponse } from '../types/Product';
import { useCartStore } from '../stores/cartStore';
import { Star, ShoppingBag } from 'lucide-react';

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const addItem = useCartStore((state) => state.addItem);
    const [showToast, setShowToast] = useState(false);

    
    useEffect(() => {
        async function fetchProduct() {
            try {
                const response = await fetch(
                    `https://v2.api.noroff.dev/online-shop/${id}`
                );

                if (!response.ok) {
                    throw new Error('Could not fetch product');
                }

                const result: SingleProductApiResponse = await response.json();
                setProduct(result.data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                }
            }   finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [id]);
    if (loading) {
        return <p>Loading product</p>;
    }
    if (error) {
        return <p>Error: {error}</p>;
    }
    if (!product) {
        return <p>Product not found.</p>;
    }

    const handleAddToCart = () => {
        addItem({
            productId: product.id,
            title: product.title,
            price: product.discountedPrice
        });
        setShowToast(true);

        setTimeout(() => {
            setShowToast(false);
        }, 4000);
    };

    return (
        <section className="product-details">
            <div className="product-details-layout">
                <div className="product-details-image-container">
                {product.discountedPrice < product.price && (
                    <span className="discount-badge">
                        {Math.round(((product.price - product.discountedPrice) / product.price) * 100)}% OFF
                    </span>
                )}
            <img className="product-details-image" src={product.image.url} alt={product.image.alt} />
            </div>
            <div className="product-details-info">
            <h2>{product.title}</h2>
            <div className="product-rating">
                <Star size={16} fill="#b99543" color="#b99543" />
                <span>{product.rating} / 5</span>
            </div>
            <p className="product-description">{product.description}</p>
            {product.tags.length > 0 && (
                <div className="product-tags">
                    <h3>Tags</h3>
                    {product.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                    ))}
                </div>
            )}
            {product.discountedPrice < product.price ? (
                <div className="product-prices">
                    <p className="original-price"><del>{product.price} kr</del></p>
                    <p className="discounted-price">{product.discountedPrice} kr</p>
                </div>
            ) : (
                <p className="product-price">{product.price} kr</p>
            )}

            <button className="add-to-cart-button" onClick={handleAddToCart}>
                <ShoppingBag size={20} />
                Add to Cart</button>
            </div>
            </div>
            
            {product.reviews && product.reviews.length > 0 && (
                <div className="product-reviews">
                    <h3>Reviews</h3>
                    {product.reviews.map((review) => (
                        <div key={review.id} className="review-card">
                            <p>{review.username}</p>
                            <p>Rating: {review.rating} / 5</p>
                            <p>{review.description}</p>
                        </div>
                    ))}
                </div>
            )}
            {showToast && <p className="toast">Product added to cart!</p>}
        </section>
    );
}

export default ProductDetails;