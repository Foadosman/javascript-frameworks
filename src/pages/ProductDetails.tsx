import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Product } from '../types/Product';
import { useCartStore } from '../stores/cartStore';

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
                    throw new Error('Coult not fetch product');
                }

                const result = await response.json();
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
        <section>
            <h2>Product Details</h2>
            <img src={product.image.url} alt={product.image.alt} width="300" />
            <h3>{product.title}</h3>
            <p>{product.description}</p>
            {product.tags.length > 0 && (
                <div>
                    <h3>Tags</h3>
                    {product.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                    ))}
                </div>
            )}
            {product.reviews && product.reviews.length > 0 && (
                <div>
                    <h3>Reviews</h3>
                    {product.reviews.map((review) => (
                        <div key={review.id}>
                            <p>{review.username}</p>
                            <p>Rating: {review.rating} / 5</p>
                            <p>{review.description}</p>
                        </div>
                    ))}
                </div>
            )}
            {product.discountedPrice < product.price ? (
                <div>
                    <p><del>{product.price} kr</del></p>
                    <p>{product.discountedPrice} kr</p>
                </div>
            ) : (
                <p>{product.price} kr</p>
            )}

            <button onClick={handleAddToCart}>Add to Cart</button>
            {showToast && <p>Product added to cart!</p>}
        </section>
    );
}

export default ProductDetails;