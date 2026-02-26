export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

// Define structure of items in the cart (extends Product with quantity)
export interface CartItem extends Product {
  quantity: number;
}
