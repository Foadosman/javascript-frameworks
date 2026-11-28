import { useEffect, useState } from 'react';
import type { Product, ApiResponse } from '../types/Product';
import { Link } from 'react-router-dom';
import { Star, Search } from 'lucide-react';

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
                    setError('An unknown error occurred');
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
        <section className="products-section">
            <h2 className="products-heading">Products</h2>

            <div className="product-controls">
                <div className="search-container">
                    <Search size={20} className="search-icon" />
                    <input
                        className="product-search"
                        type="text"
                        placeholder="Search products..."
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>
                    
                <select
                    className="product-sort"
                    value={sort}
                    onChange={(e) => setSort(e.target.value)}
                >
                    <option value="default">Default sorting</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to low</option>
                    <option value="name">Name: A to Z</option>
                </select>
            </div>
            
            <div className="product-grid">
                {sortedProducts.map((product) => (
                    <div key={product.id} className="product-card">
                        {product.discountedPrice < product.price && (
                            <span className="discount-badge">
                                {Math.round(
                                    ((product.price - product.discountedPrice) / product.price) * 100
                                )}% OFF
                            </span>
                        )}
                        <Link to={`/products/${product.id}`}>
                        <img
                        className="product-image"
                        src={product.image.url}
                        alt={product.image.alt}
                        />
                        </Link>
                        <Link to={`/products/${product.id}`} className="product-title">
                            <h3>{product.title}</h3>
                        </Link>
                        <div className="product-rating">
                            <Star size={16} fill="#b99543" color="#b99543" />
                            <span>{product.rating} / 5</span>
                        </div>
                        {product.discountedPrice < product.price ? (
                            <div className="product-prices">
                                <p className="original-price">
                                    <del>{product.price} kr</del>
                                </p>
                                <p className="discounted-price">{product.discountedPrice} kr</p>
                            </div>
                        ) : (
                            <p className="product-price">{product.price} kr</p>
                        )}
                    </div>
                ))}
            </div>
        </section>
    );
}

export default ProductList;