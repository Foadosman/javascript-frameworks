import { create } from 'zustand';

export type CartItem = {
    productId: string;
    quantity: number;
};

type CartState = {
    items: CartItem[];
};

export const useCartStore = create<CartState>(() => ({
    items: [],
}));

