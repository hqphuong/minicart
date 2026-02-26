import axios from "axios";
import { API_URLS } from "../constants/api";
import { Product } from "../models/Products";

/**
 * Call API for getting products data from Fake Store API
 */
export const getProducts = async (): Promise<Product[]> => {
  try {
    // Call API by axios, connect BASE_URL and endpoint PRODUCTS từ file constants
    const response = await axios.get<Product[]>(
      `${API_URLS.BASE_URL}${API_URLS.PRODUCTS}`,
    );

    return response.data;
  } catch (error) {
    console.error("Error when fetching products:", error);
    // Throw error to be handled by the caller (e.g., to show an error message in the UI)
    throw error;
  }
};
