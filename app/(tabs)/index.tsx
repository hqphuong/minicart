import React, { useEffect, useState, useRef } from 'react';
import { 
  View, 
  Text, 
  FlatList, 
  ActivityIndicator, 
  TextInput, 
  StyleSheet, 
  TouchableOpacity,
  Animated 
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router'; 
import { SafeAreaView } from 'react-native-safe-area-context';
import { ProductCard } from '../../components/ProductCard';
import { getProducts } from '../../services/productService';
import { Product } from '../../models/Products';
import { useCartStore } from '../../store/useCartStore';
import { Colors } from '../../constants/color';

export default function HomeScreen() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [searchQuery, setSearchQuery] = useState<string>('');

  // Get cart items and addToCart function from Zustand Store
  const cartItems = useCartStore((state) => state.cartItems);
  const addToCart = useCartStore((state) => state.addToCart);

  // Sum total quantity of items in the cart for the badge count
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  const numItemsInCart = cartItems.length;

  // Declare an animated value for the cart icon scale
  const cartScale = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const data = await getProducts();
      setProducts(data);
    } catch (error) {
      console.log('Error:', error);
    } finally {
      setLoading(false); 
    }
  };

  const filteredProducts = products.filter((p) => 
    p.title.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Function to trigger the cart icon animation when an item is added
  const animateCart = () => {
    Animated.sequence([
      // Time to scale up to 1.3 in 0.15s
      Animated.timing(cartScale, {
        toValue: 1.3,
        duration: 150,
        useNativeDriver: true,
      }),
      // Then scale back down to 1 in 0.15s
      Animated.timing(cartScale, {
        toValue: 1,
        duration: 150,
        useNativeDriver: true,
      })
    ]).start();
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* --- Header: Search + Cart --- */}
      <View style={styles.header}>
        {/* Khung Search */}
        <View style={styles.searchBar}>
          <Ionicons name="search" size={20} color={Colors.textMuted} style={styles.searchIcon} />
          <TextInput
            style={styles.searchInput}
            placeholder="Search products..."
            placeholderTextColor={Colors.textMuted}
            value={searchQuery}
            onChangeText={setSearchQuery} 
          />
        </View>

        {/* Icon + number of Items */}
        <TouchableOpacity 
          style={styles.cartIconContainer} 
          activeOpacity={0.7}
          onPress={() => router.push('/cart')} // Transition to Cart screen when cart icon is pressed
        >
          <Animated.View style={{ transform: [{ scale: cartScale }] }}>
            <Ionicons name="cart-outline" size={28} color={Colors.text} />
            
            {/* Red point ( just exist when has Items) */}
            {totalItems > 0 && (
              <View style={styles.badge}>
                <Text style={styles.badgeText}>{numItemsInCart > 99 ? '99+' : numItemsInCart}</Text>
              </View>
            )}
          </Animated.View>
        </TouchableOpacity>
      </View>

      {/* --- List Products --- */}
      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={Colors.primary} />
        </View>
      ) : (
        <FlatList
          data={filteredProducts}
          keyExtractor={(item) => item.id.toString()}
          numColumns={2} 
          columnWrapperStyle={styles.row} 
          showsVerticalScrollIndicator={false} 
          contentContainerStyle={styles.listPadding}
          renderItem={({ item }) => (
            <ProductCard 
              product={item} 
              onAdd={() => {
                addToCart(item); // Add product to cart in Zustand store
                animateCart();   // Trigger the cart icon animation
              }} 
            />
          )}
        />
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background, 
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  header: {
    flexDirection: 'row', 
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff', 
  },
  searchBar: {
    flex: 1, 
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: Colors.background,
    borderRadius: 12,
    paddingHorizontal: 12,
    height: 44,
    marginRight: 12, 
  },
  searchIcon: {
    marginRight: 8,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: Colors.text,
  },
  cartIconContainer: {
    position: 'relative',
    padding: 4,
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -6,
    backgroundColor: Colors.primary, 
    borderRadius: 10,
    minWidth: 20,
    height: 20,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#fff', 
  },
  badgeText: {
    color: '#fff',
    fontSize: 10,
    fontWeight: 'bold',
    paddingHorizontal: 4,
  },
  row: {
    justifyContent: 'space-between',
    paddingHorizontal: 8, 
  },
  listPadding: {
    paddingBottom: 20, 
  }
});