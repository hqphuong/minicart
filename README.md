# MiniCart - React Native E-Commerce App

A minimalist, high-performance mobile e-commerce storefront built with React Native (Expo). This project demonstrates modern mobile development practices, clean architecture, and efficient global state management.

## Key Features

* **Dynamic Product Catalog:** Fetches and displays real-time product data using the Fake Store RESTful API.
* **Client-side Filtering:** Real-time search functionality allowing users to filter products instantly by name without redundant API calls.
* **Local Shopping Cart:** Full cart logic (add, remove, adjust quantity, calculate total price) managed globally.
* **Minimalist UI/UX:** Clean, intuitive interface with smooth animations, soft shadows, and a dedicated accent color for clear calls-to-action.
* **Cross-Platform:** Runs seamlessly on both iOS and Android via Expo.

## 🛠 Tech Stack & Tools

* **Framework:** React Native / Expo Router (File-based routing)
* **State Management:** Zustand (Lightweight, unopinionated state management)
* **Network Requests:** Axios
* **Language:** TypeScript (for type safety and scalable code)
* **Icons:** @expo/vector-icons (Ionicons)

## Clean Architecture (Folder Structure)

The codebase is structured following the Separation of Concerns principle to ensure scalability and maintainability:

```text
minicart/
├── app/                  # Expo Router file-based navigation (Screens & Layouts)
├── components/           # Reusable UI building blocks (e.g., ProductCard)
├── constants/            # Immutable values (Colors, API URLs)
├── models/               # TypeScript interfaces defining data shapes
├── services/             # Dedicated API fetching logic
└── store/                # Zustand global state management
```

## How to Run Locally

1. **Clone the repository:**
   ```bash
   git clone [https://github.com/hqphuong/minicart]
   cd minicart

2. **Install dependences:**
   npm install

3. **Start the Expo development server:**
   npx expo start

4. **View the app**
   * Press w to open in a web browser.

   * Press a to open on an Android Emulator.

   * Press i to open on an iOS Simulator.

   * Or scan the QR code with the Expo Go app on your physical device.

## Docker Support (Production Web Build)

This project includes a multi-stage `Dockerfile` optimized for production environments. It builds the web version of the Expo app and serves it using a ultra-lightweight Nginx container.

**1. Build the Docker image:**
```bash
docker build -t minicart-web .
```
**2. Run the container:**

```ash
docker run -d -p 8080:80 --name my-minicart minicart-web
```
**3. View the app:**
```Open your browser and navigate to http://localhost:8080.```