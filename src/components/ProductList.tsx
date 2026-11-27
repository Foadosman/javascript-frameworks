import { useEffect, useState } from 'react';
import type { Product, ApiResponse } from '../types/Product';
import {Link} from 'react-router-dom';

function ProductList() {
    const [products, setProducts] = useState<Product[]>([]);
    const [search, setSearch] = useState('');
    const [sort, setSort] = useState('default');
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProducts() {
            try{
                setLoading(true);
                setError(null);
                const response = await fetch('https://v2.api.noroff.dev/online-shop');
                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }
                const result: ApiResponse = await response.json();
                setProducts(result.data);
            } catch (error) {
                if (error instanceof Error) {
                    setError(error.message);
                } else {
                    setError('An unkown error occurred');
                }
            }
            finally {
                setLoading(false);
            }
        }

        fetchProducts();
    }, []);

    if (loading) return <p>Loading products...</p>;
    if (error) return <p>Error loading products: {error}</p>;

    const filteredProducts = products.filter((product) =>
            product.title.toLowerCase().includes(search.trim().toLowerCase())
        );

    const sortedProducts = [...filteredProducts];
        if (sort === 'price-low') {
            sortedProducts.sort((a, b) => a.discountedPrice - b.discountedPrice);
        }

        else if (sort === 'price-high') {
            sortedProducts.sort((a, b) => b.discountedPrice - a.discountedPrice);
        }

        else if (sort === 'name') {
            sortedProducts.sort((a, b) => a.title.localeCompare(b.title));
        }



    return (
        <section>
            <h2>Products</h2>
            <input
                type="text"
                placeholder="Search products..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            
            <select
                value={sort}
                onChange={(e) => setSort(e.target.value)}
            >
                <option value="default">Default sorting</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to low</option>
                <option value="name">Name: A to Z</option>
            </select>
            
            <div className="product-grid">
                {sortedProducts.map((product) => (
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