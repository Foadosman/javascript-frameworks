import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import type { Product } from '../types/Product';

function ProductDetails() {
    const { id } = useParams();
    const [product, setProduct] = useState<Product | null>(null);
    useEffect(() => {
        async function fetchProduct() {
            const response = await fetch(
                `https://v2.api.noroff.dev/online-shop/${id}`
            );

            const result = await response.json();
            setProduct(result.data);
        }

        fetchProduct();
    }, [id]);
    if (!product) {
        return <p>Loading product</p>
    }
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
            {product.discountedPrice < product.price ? (
                <div>
                    <p><del>{product.price} kr</del></p>
                    <p>{product.discountedPrice} kr</p>
                </div>
            ) : (
                <p>{product.price} kr</p>
            )}
        </section>
    );
}

export default ProductDetails;