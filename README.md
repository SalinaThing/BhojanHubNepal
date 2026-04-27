# 🍽️ BhojanHub Nepal

BhojanHub Nepal is a premium React Native mobile application designed for discovering the best restaurants across Nepal. It features real-time geolocation tracking to connect users with the nearest dining experiences in Kathmandu, Pokhara, Chitwan, and beyond.

## 🚀 Key Features

- **📍 Real-Time Geolocation**: Automatically detects your current GPS coordinates to find food "Near You".
- **📏 Proximity Discovery**: Restaurants are dynamically sorted based on their real-world distance (in km) using the Haversine formula.
- **🗺️ Regional Coverage**: Includes realistic restaurant data for popular hubs like **Boudha**, **Patan**, **Thamel**, and **Kamalpokhari**.
- **🔍 Smart Search & Filter**: Instant search by restaurant name, address, or category (Italian, Chinese, Nepali, etc.).
- **💎 Premium UI/UX**: A modern, responsive interface featuring hero sections, category modals, and detailed restaurant cards.
- **🏢 Business Registration**: Integrated workflow for restaurant owners to register their businesses on the platform.

## 🛠️ Technology Stack

- **Frontend**: React Native with TypeScript
- **Navigation**: React Navigation (Native Stack)
- **Location**: React Native Geolocation Service
- **Components**: Native-base styled components and custom premium CSS.
- **Version Control**: Git & GitHub

## 🏃 Getting Started

### Prerequisites
- Node.js (v20+)
- Android Studio / Xcode
- Android Emulator or Physical Device

### Installation

1. **Clone the repository**:
   ```bash
   git clone https://github.com/SalinaThing/BhojanHubNepal.git
   cd BhojanHubNepal
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Run the Metro Bundler**:
   ```bash
   npx react-native start --reset-cache
   ```

4. **Launch the app (Android)**:
   ```bash
   npx react-native run-android
   ```

## 📐 Project Structure

- `src/data/restaurants.ts`: The central database for restaurant coordinates and details.
- `src/screens/HomeScreen.tsx`: Features the "Near You" discovery engine and geolocation sorting.
- `src/screens/AllRestaurantsScreen.tsx`: Unified search and category filtering interface.
- `src/navigations/`: Navigation logic and type definitions.

## 🛠️ Native Configuration Note
The project includes a forced resolution for `play-services-location` in `android/build.gradle` to ensure compatibility across various Android SDK versions and prevent native crashes.

---
Developed with ❤️ for the foodies of Nepal.
