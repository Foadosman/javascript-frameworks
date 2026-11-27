export type Review = {
    id: string;
    username: string;
    rating: number;
    description: string;
};

export type Product = {
    id: string;
    title: string;
    description: string;
    price: number;
    discountedPrice: number;
    rating: number;
    image: {
        url: string;
        alt: string;
    };
    tags: string[];
    reviews?: Review[];
};

export interface ApiResponse {
    data: Product[];
}

export interface SingleProductApiResponse {
    data: Product;
}