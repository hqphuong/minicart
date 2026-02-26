import { Stack } from 'expo-router';

export default function RootLayout() {
  return (
    <Stack>
      {/* Declared main flow */}
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      
      {/* Declared fallback screen for invalid paths */}
      <Stack.Screen name="+not-found" options={{ title: 'Oops!' }} />
    </Stack>
  );
}