import { create } from 'zustand';
import { Product } from '../models/Products'; 

// Structure of items in the cart (extends Product with quantity)
export interface CartItem extends Product {
  quantity: number;
}

// Define the structure of the cart state and actions
interface CartState {
  cartItems: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: number) => void;
  increaseQuantity: (productId: number) => void;
  decreaseQuantity: (productId: number) => void;
  getTotalPrice: () => number;
}

export const useCartStore = create<CartState>((set, get) => ({
  cartItems: [],

  addToCart: (product) => {
    const currentItems = get().cartItems;
    const existingItem = currentItems.find((item) => item.id === product.id);

    if (existingItem) {
      set({
        cartItems: currentItems.map((item) =>
          item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
        ),
      });
    } else {
      set({ cartItems: [...currentItems, { ...product, quantity: 1 }] });
    }
  },

  removeFromCart: (productId) => {
    set({
      cartItems: get().cartItems.filter((item) => item.id !== productId),
    });
  },

  increaseQuantity: (productId) => {
    set({
      cartItems: get().cartItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      ),
    });
  },

  decreaseQuantity: (productId) => {
    const currentItems = get().cartItems;
    const existingItem = currentItems.find((item) => item.id === productId);

    if (existingItem?.quantity === 1) {
      get().removeFromCart(productId);
    } else {
      set({
        cartItems: currentItems.map((item) =>
          item.id === productId ? { ...item, quantity: item.quantity - 1 } : item
        ),
      });
    }
  },

  getTotalPrice: () => {
    return get().cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },
}));