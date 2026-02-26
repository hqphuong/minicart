import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { Colors } from "../constants/color";
import { Product } from "../models/Products";

// Define the props for the ProductCard component
interface ProductCardProps {
  product: Product;
  onAdd: () => void;
}

export const ProductCard = ({ product, onAdd }: ProductCardProps) => {
  return (
    <View style={styles.card}>
      {/* Products holder place */}
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.image }}
          style={styles.image}
          resizeMode="contain" // Contain picture
        />
      </View>

      {/* Info container */}
      <View style={styles.infoContainer}>
        {/* numberOfLines={1} cut the title if it's too long */}
        <Text style={styles.title} numberOfLines={1}>
          {product.title}
        </Text>
        <Text style={styles.price}>${product.price.toFixed(2)}</Text>
      </View>

      {/* Add button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={onAdd}
        activeOpacity={0.8}
      >
        <Text style={styles.addButtonText}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    flex: 1, 
    backgroundColor: Colors.card,
    borderRadius: 16, 
    padding: 12,
    margin: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.04,
    shadowRadius: 10,
    elevation: 2,
  },
  imageContainer: {
    backgroundColor: Colors.background, 
    borderRadius: 12,
    padding: 10,
    marginBottom: 12,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 100, 
  },
  infoContainer: {
    marginBottom: 12,
  },
  title: {
    fontSize: 14,
    fontWeight: "500",
    color: Colors.text,
    marginBottom: 4,
  },
  price: {
    fontSize: 16,
    fontWeight: "700", 
    color: Colors.text,
  },
  addButton: {
    backgroundColor: Colors.primary, 
    borderRadius: 12,
    paddingVertical: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  addButtonText: {
    color: "#FFFFFF",
    fontWeight: "600",
    fontSize: 14,
  },
});
