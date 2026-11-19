import { useEffect, useState } from 'react';
import type { Product } from '../types/Product';
import {Link} from 'react-router-dom';

function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    useEffect(() => {
        async function fetchProducts() {
            const response = await fetch('https://v2.api.noroff.dev/online-shop');
            const result = await response.json();

            setProducts(result.data);
        }

        fetchProducts();
    }, []);

    return (
        <section>
            <h2>Products</h2>
            <div className="product-grid">
                {products.map((product) => (
                    <div key={product.id} className="product-card">
                        {product.discountedPrice < product.price && (
                            <span>
                                {Math.round(
                                    ((product.price - product.discountedPrice) / product.price) * 100
                                )}% OFF
                            </span>
                        )}
                        <img
                        src={product.image.url}
                        alt={product.image.alt}
                        width="200"
                        />
                        <Link to={`/products/${product.id}`}>
                            <h3>{product.title}</h3>
                        </Link>
                        <p>Rating: {product.rating} / 5</p>
                        {product.discountedPrice < product.price ? (
                            <div>
                                <p>
                                    <del>{product.price} kr</del>
                                </p>
                                <p>{product.discountedPrice} kr</p>
                            </div>
                        ) : (
                            <p>{product.price} kr</p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ProductList;