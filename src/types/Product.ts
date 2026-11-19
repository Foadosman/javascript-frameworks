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
};