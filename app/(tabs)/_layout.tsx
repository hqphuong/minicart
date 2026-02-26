import { Tabs } from 'expo-router';
import { Ionicons } from '@expo/vector-icons'; 

export default function RootLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: '#FF6243',
        tabBarInactiveTintColor: 'gray',
        headerShown: false, 
        tabBarStyle: {
          paddingBottom: 5,
          height: 60,
        },
      }}
    >
      {/* Home screen */}
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="home-outline" size={size} color={color} />
          ),
        }}
      />

      {/* Cart screen*/}
      <Tabs.Screen
        name="cart"
        options={{
          title: 'Cart',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="cart-outline" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}