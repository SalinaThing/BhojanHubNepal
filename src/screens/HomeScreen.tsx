import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  ImageBackground,
  Modal,
  Alert,
  TextInput,
  ActivityIndicator,
  Image,
} from "react-native";

const { width } = Dimensions.get("window");

interface HomeScreenProps {
  navigation: any;
}

type Restaurant = {
  id: string;
  title: string;
  address: string;
  contact_phone: string;
  category: string;
  rating: number;
  deliveryTime: string;
  priceRange: string;
  image: string | null;
  distance?: number;
};

const HomeScreen: React.FC<HomeScreenProps> = ({ navigation }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All Categories");
  const [isCategoryModalVisible, setIsCategoryModalVisible] = useState(false);
  const [showAllRestaurants, setShowAllRestaurants] = useState(false);
  const [showAllPartners, setShowAllPartners] = useState(false);
  const [showAllBrands, setShowAllBrands] = useState(false);
  const [showAllServices, setShowAllServices] = useState(false);
  const [searchLocation, setSearchLocation] = useState<string>("");
  const [isSearching, setIsSearching] = useState(false);

  const categories = [
    "All Categories",
    "Fast Food",
    "Italian",
    "Chinese",
    "Indian",
    "Mexican",
    "Japanese",
    "Desserts",
    "Beverages",
  ];

  // Dummy restaurant data
  const restaurants: Restaurant[] = [
    {
      id: "1",
      title: "Burger Palace",
      address: "123 Main Street, Food District",
      contact_phone: "+1-555-0123",
      category: "Fast Food",
      rating: 4.5,
      deliveryTime: "20-30 min",
      priceRange: "Rs.280 - Rs. 400",
      image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      distance: 1.2
    },
    {
      id: "2",
      title: "Pizza Italia",
      address: "456 Italian Avenue",
      contact_phone: "+1-555-0124",
      category: "Italian",
      rating: 4.7,
      deliveryTime: "25-35 min",
      priceRange: "Rs.1200 - Rs. 1500",
      image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      distance: 2.1
    },
    {
      id: "3",
      title: "Dragon Chinese",
      address: "789 Chinatown Road",
      contact_phone: "+1-555-0125",
      category: "Chinese",
      rating: 4.3,
      deliveryTime: "30-40 min",
      priceRange: "Rs.300 - Rs. 400",
      image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      distance: 0.8
    },
    {
      id: "4",
      title: "Spice India",
      address: "321 Curry Lane",
      contact_phone: "+1-555-0126",
      category: "Indian",
      rating: 4.6,
      deliveryTime: "35-45 min",
      priceRange: "Rs.350 - Rs. 450",
      image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      distance: 1.5
    },
    {
      id: "5",
      title: "Tokyo Sushi",
      address: "654 Sushi Street",
      contact_phone: "+1-555-0127",
      category: "Japanese",
      rating: 4.8,
      deliveryTime: "40-50 min",
      priceRange: "Rs.400 - Rs.550",
      image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      distance: 3.2
    },
    {
      id: "6",
      title: "Taco Fiesta",
      address: "987 Mexican Boulevard",
      contact_phone: "+1-555-0128",
      category: "Mexican",
      rating: 4.4,
      deliveryTime: "25-35 min",
      priceRange: "Rs.120 - Rs. 400",
      image: "https://images.unsplash.com/photo-1565299585323-38174c13fae8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      distance: 1.8
    }
  ];

  const [filteredRestaurants, setFilteredRestaurants] = useState<Restaurant[]>(restaurants);

  
  const handleSearch = () => {
    if (!searchLocation.trim()) {
      Alert.alert("Please enter a location first!");
      return;
    }

    setIsSearching(true);
    console.log("🔍 Searching for:", searchLocation);

    // Filter restaurants by search term
    const filtered = restaurants.filter((restaurant) => {
      const searchLower = searchLocation.toLowerCase();
      return (
        restaurant.title.toLowerCase().includes(searchLower) ||
        restaurant.address.toLowerCase().includes(searchLower) ||
        restaurant.category.toLowerCase().includes(searchLower)
      );
    });

    setFilteredRestaurants(filtered);
    setIsSearching(false);

    if (filtered.length === 0) {
      Alert.alert("No Results", `No restaurants found for "${searchLocation}"`);
    } else {
      console.log(`✅ Found ${filtered.length} restaurant(s) for "${searchLocation}"`);
    }
  };

  // Sample data for food partners
  const partners = [
    { id: 1, name: "McDonald's", emoji: "🍔" },
    { id: 2, name: "KFC", emoji: "🍗" },
    { id: 3, name: "Starbucks", emoji: "☕" },
    { id: 4, name: "Domino's", emoji: "🍕" },
    { id: 5, name: "Subway", emoji: "🥪" },
    { id: 6, name: "Pizza Hut", emoji: "🇮🇹" },
  ];

  // Sample data for beverage brands
  const beverageBrands = [
    { id: 1, name: "Coca-Cola", desc: "Refreshing Drinks", emoji: "🥤" },
    { id: 2, name: "Pepsi", desc: "Cool Beverages", emoji: "⚡" },
    { id: 3, name: "Starbucks", desc: "Premium Coffee", emoji: "☕" },
    { id: 4, name: "Red Bull", desc: "Energy Drink", emoji: "🔴" },
    { id: 5, name: "Nestlé", desc: "Quality Drinks", emoji: "💧" },
    { id: 6, name: "Monster", desc: "Energy Boost", emoji: "👹" },
  ];

  // Sample data for food categories
  const foodServices = [
    { id: 1, name: "Pizza", price: "From Rs. 1200", emoji: "🍕" },
    { id: 2, name: "Burgers", price: "From Rs. 280", emoji: "🍔" },
    { id: 3, name: "Sushi", price: "From Rs. 350", emoji: "🍣" },
    { id: 4, name: "Pasta", price: "From Rs. 300", emoji: "🍝" },
    { id: 5, name: "Salads", price: "From Rs. 270", emoji: "🥗" },
    { id: 6, name: "Desserts", price: "From Rs. 450", emoji: "🍰" },
  ];

  const backgroundImages = [
    "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?ixlib=rb-4.0.3&auto=format&fit=crop&w=2080&q=80",
  ];

  const randomBackground = backgroundImages[Math.floor(Math.random() * backgroundImages.length)];

  // Function to render restaurant cards
  const renderRestaurantCards = () => {
    const displayRestaurants = showAllRestaurants ? filteredRestaurants : filteredRestaurants.slice(0, 4);
    
    if (showAllRestaurants) {
      return (
        <View style={styles.gridContainer}>
          {displayRestaurants.map((restaurant) => (
            <View key={restaurant.id} style={styles.restaurantGridCard}>
              {restaurant.image && (
                <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} resizeMode="cover" />
              )}
              <View style={styles.restaurantHeader}>
                <View style={styles.restaurantIcon}>
                  <Text style={styles.restaurantEmoji}>🍽️</Text>
                </View>
                <View style={styles.restaurantInfo}>
                  <Text style={styles.restaurantName}>{restaurant.title}</Text>
                  {restaurant.distance && (
                    <Text style={styles.restaurantDistance}>{restaurant.distance.toFixed(1)} km away</Text>
                  )}
                </View>
              </View>
              <View style={styles.restaurantDivider} />
              <View style={styles.restaurantDetails}>
                <Text style={styles.restaurantDetail}>📍 {restaurant.address}</Text>
                <Text style={styles.restaurantDetail}>⭐ {restaurant.rating} • {restaurant.deliveryTime}</Text>
                <Text style={styles.restaurantDetail}>🏷️ {restaurant.category} • {restaurant.priceRange}</Text>
              </View>
              <TouchableOpacity
                style={styles.directionBtn}
                onPress={() => navigation.navigate("RestaurantDetail", { restaurantId: restaurant.id, name: restaurant.title })}
              >
                <Text style={styles.directionText}>View Menu</Text>
              </TouchableOpacity>
            </View>
          ))}
        </View>
      );
    } else {
      return (
        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          style={styles.restaurantScroll}
        >
          {displayRestaurants.map((restaurant) => (
            <View key={restaurant.id} style={styles.restaurantCard}>
              {restaurant.image && (
                <Image source={{ uri: restaurant.image }} style={styles.restaurantImage} resizeMode="cover" />
              )}
              <View style={styles.restaurantHeader}>
                <View style={styles.restaurantIcon}>
                  <Text style={styles.restaurantEmoji}>🍽️</Text>
                </View>
                <View style={styles.restaurantInfo}>
                  <Text style={styles.restaurantName}>{restaurant.title}</Text>
                  {restaurant.distance && (
                    <Text style={styles.restaurantDistance}>{restaurant.distance.toFixed(1)} km away</Text>
                  )}
                </View>
              </View>
              <View style={styles.restaurantDivider} />
              <View style={styles.restaurantDetails}>
                <Text style={styles.restaurantDetail}>📍 {restaurant.address}</Text>
                <Text style={styles.restaurantDetail}>⭐ {restaurant.rating} • {restaurant.deliveryTime}</Text>
                <Text style={styles.restaurantDetail}>🏷️ {restaurant.category} • {restaurant.priceRange}</Text>
              </View>
              <TouchableOpacity
                style={styles.directionBtn}
                onPress={() => navigation.navigate("RestaurantDetail", { restaurantId: restaurant.id, name: restaurant.title })}
              >
                <Text style={styles.directionText}>View Menu</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      );
    }
  };

  // Function to render partner cards
  const renderPartnerCards = () => {
    const displayPartners = showAllPartners ? partners : partners.slice(0, 4);
    
    if (showAllPartners) {
      return (
        <View style={styles.gridContainer}>
          {displayPartners.map((partner) => (
            <View key={partner.id} style={styles.partnerGridBox}>
              <View style={styles.partnerLogo}>
                <Text style={styles.partnerEmoji}>{partner.emoji}</Text>
              </View>
              <Text style={styles.partnerName}>{partner.name}</Text>
            </View>
          ))}
        </View>
      );
    } else {
      return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {displayPartners.map((partner) => (
            <View key={partner.id} style={styles.partnerBox}>
              <View style={styles.partnerLogo}>
                <Text style={styles.partnerEmoji}>{partner.emoji}</Text>
              </View>
              <Text style={styles.partnerName}>{partner.name}</Text>
            </View>
          ))}
        </ScrollView>
      );
    }
  };

  // Function to render beverage brands
  const renderBeverageBrands = () => {
    const displayBrands = showAllBrands ? beverageBrands : beverageBrands.slice(0, 4);
    
    if (showAllBrands) {
      return (
        <View style={styles.gridContainer}>
          {displayBrands.map((brand) => (
            <View key={brand.id} style={styles.brandGridCard}>
              <View style={styles.brandIcon}>
                <Text style={styles.brandEmoji}>{brand.emoji}</Text>
              </View>
              <Text style={styles.brandName}>{brand.name}</Text>
              <Text style={styles.brandDesc}>{brand.desc}</Text>
            </View>
          ))}
        </View>
      );
    } else {
      return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {displayBrands.map((brand) => (
            <View key={brand.id} style={styles.brandCard}>
              <View style={styles.brandIcon}>
                <Text style={styles.brandEmoji}>{brand.emoji}</Text>
              </View>
              <Text style={styles.brandName}>{brand.name}</Text>
              <Text style={styles.brandDesc}>{brand.desc}</Text>
            </View>
          ))}
        </ScrollView>
      );
    }
  };

  // Function to render food services
  const renderFoodServices = () => {
    const displayServices = showAllServices ? foodServices : foodServices.slice(0, 4);
    
    if (showAllServices) {
      return (
        <View style={styles.gridContainer}>
          {displayServices.map((service) => (
            <View key={service.id} style={styles.serviceGridCard}>
              <View style={styles.serviceIcon}>
                <Text style={styles.serviceEmoji}>{service.emoji}</Text>
              </View>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.servicePrice}>{service.price}</Text>
            </View>
          ))}
        </View>
      );
    } else {
      return (
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.horizontalScroll}>
          {displayServices.map((service) => (
            <View key={service.id} style={styles.serviceCard}>
              <View style={styles.serviceIcon}>
                <Text style={styles.serviceEmoji}>{service.emoji}</Text>
              </View>
              <Text style={styles.serviceName}>{service.name}</Text>
              <Text style={styles.servicePrice}>{service.price}</Text>
            </View>
          ))}
        </ScrollView>
      );
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* HERO SECTION */}
      <ImageBackground
        source={{ uri: randomBackground }}
        style={styles.hero}
        resizeMode="cover"
      >
        <View style={styles.overlay}>
          <Text style={styles.heroTitle}>Hungry?</Text>
          <Text style={styles.heroSubtitle}>Discover Amazing Food Nearby</Text>

          {/* SEARCH BOX */}
          <View style={styles.searchContainer}>
            <View style={styles.inputContainer}>
              <Text style={styles.searchIcon}>🔍</Text>
              <TextInput
                style={styles.input}
                placeholder="Enter your location..."
                placeholderTextColor="#999"
                value={searchLocation}
                onChangeText={setSearchLocation}
              />
            </View>

            <TouchableOpacity
              style={styles.searchBtn}
              onPress={handleSearch}
              disabled={isSearching}
            >
              {isSearching ? (
                <ActivityIndicator color="#fff" size="small" />
              ) : (
                <Text style={styles.searchText}>Search</Text>
              )}
            </TouchableOpacity>
          </View>

          {/* ADD RESTAURANT BUTTON */}
          <TouchableOpacity
            style={styles.addBusinessBtn}
            onPress={() => navigation.navigate("RegisterBusiness")}
          >
            <Text style={styles.addBusinessText}>+ ADD YOUR RESTAURANT</Text>
          </TouchableOpacity>
        </View>
      </ImageBackground>

      {/* NEAREST RESTAURANTS SECTION */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Restaurants Near You</Text>
        </View>
        <Text style={styles.sectionDescription}>
          Discover the best dining experiences in your area
        </Text>

        {/* CATEGORY DROPDOWN */}
        <View style={styles.categorySection}>
          <Text style={styles.categoryTitle}>Food Category</Text>
          <TouchableOpacity 
            style={styles.dropdownButton}
            onPress={() => setIsCategoryModalVisible(true)}
          >
            <Text style={styles.dropdownButtonText}>{selectedCategory}</Text>
            <Text style={styles.dropdownArrow}>▼</Text>
          </TouchableOpacity>
        </View>

        {/* SHOWING NEARBY RESTAURANTS */}
        <View style={styles.nearbyHeader}>
          <Text style={styles.nearbyTitle}>Popular restaurants nearby</Text>
          <TouchableOpacity onPress={() => setShowAllRestaurants(!showAllRestaurants)}>
            <Text style={styles.seeAll}>
              {showAllRestaurants ? 'Show Less' : 'See all'}
            </Text>
          </TouchableOpacity>
        </View>

        {/* RESTAURANT LIST */}
        {filteredRestaurants.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No restaurants found. Try searching for a different location.</Text>
          </View>
        ) : (
          renderRestaurantCards()
        )}
      </View>

      {/* OUR PARTNERS */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Our Partners</Text>
          <TouchableOpacity onPress={() => setShowAllPartners(!showAllPartners)}>
            <Text style={styles.seeAll}>
              {showAllPartners ? 'Show Less' : 'View all'}
            </Text>
          </TouchableOpacity>
        </View>
        {renderPartnerCards()}
      </View>

      {/* BEVERAGE BRANDS */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Beverages</Text>
          <TouchableOpacity onPress={() => setShowAllBrands(!showAllBrands)}>
            <Text style={styles.seeAll}>
              {showAllBrands ? 'Show Less' : 'See all'}
            </Text>
          </TouchableOpacity>
        </View>
        {renderBeverageBrands()}
      </View>

        {/* ✅ POPULAR RESTAURANTS BY LOCATION */}
              <View style={styles.section}>
                <Text style={styles.subTitle}>Featured Restaurants Across Nepal 🗺️</Text>
                
                <View style={styles.locationSection}>
                  <Text style={styles.locationTitle}>📍 Valley</Text>
                  <View style={styles.restaurantList}>
                    <Text style={styles.restaurantItem}>• <Text style={styles.bold}>Bhojan Griha</Text> - Traditional Newari Thali in Dillibazzar, Ktm</Text>
                    <Text style={styles.restaurantItem}>• <Text style={styles.bold}>Nepali Chulo</Text> - Classic Nepali dishes in Jhamsikhel, Lalitpur</Text>
                    <Text style={styles.restaurantItem}>• <Text style={styles.bold}>Korea Town</Text> - Authentic Korean BBQ in Thamel, Ktm</Text>
                    <Text style={styles.restaurantItem}>• <Text style={styles.bold}>Yin Yang</Text> - Thai cuisine with river view</Text>
                    <Text style={styles.restaurantItem}>• <Text style={styles.bold}>Momo Magic</Text> - Best Tibetan momos in town</Text>
                    <Text style={styles.restaurantItem}>• <Text style={styles.bold}>Koto Japanese</Text> - Premium sushi and teppanyaki</Text>
                  </View>
                </View>
      
                <View style={styles.locationSection}>
                  <Text style={styles.locationTitle}>📍 Pokhara</Text>
                  <View style={styles.restaurantList}>
                    <Text style={styles.restaurantItem}>• <Text style={styles.bold}>Lakeside Thai</Text> - Thai food with lake view</Text>
                    <Text style={styles.restaurantItem}>• <Text style={styles.bold}>Korean Garden</Text> - Traditional Korean dishes</Text>
                    <Text style={styles.restaurantItem}>• <Text style={styles.bold}>Chinese Dragon</Text> - Authentic Chinese flavors</Text>
                  </View>
                </View>
      
                <View style={styles.locationSection}>
                  <Text style={styles.locationTitle}>📍 Chitwan</Text>
                  <View style={styles.restaurantList}>
                    <Text style={styles.restaurantItem}>• <Text style={styles.bold}>Jungle Thai</Text> - Exotic Thai cuisine</Text>
                    <Text style={styles.restaurantItem}>• <Text style={styles.bold}>Sauraha Chinese</Text> - Chinese food near wildlife</Text>
                  </View>
                </View>
      
                <View style={styles.locationSection}>
                  <Text style={styles.locationTitle}>📍 Lumbini</Text>
                  <View style={styles.restaurantList}>
                    <Text style={styles.restaurantItem}>• <Text style={styles.bold}>Korean Temple Food</Text> - Buddhist cuisine experience</Text>
                    <Text style={styles.restaurantItem}>• <Text style={styles.bold}>International Peace Cafe</Text> - Multi-cuisine options</Text>
                  </View>
                </View>
              </View>

      {/* FOOD CATEGORIES */}
      <View style={styles.section}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Food Categories</Text>
          <TouchableOpacity onPress={() => setShowAllServices(!showAllServices)}>
            <Text style={styles.seeAll}>
              {showAllServices ? 'Show Less' : 'View all'}
            </Text>
          </TouchableOpacity>
        </View>
        {renderFoodServices()}
      </View>

      {/* HOW IT WORKS */}
      <View style={[styles.section, styles.howItWorksSection]}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <View style={styles.stepsContainer}>
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>1</Text>
            </View>
            <Text style={styles.stepTitle}>Choose Location</Text>
            <Text style={styles.stepDescription}>Enter your delivery address</Text>
          </View>
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>2</Text>
            </View>
            <Text style={styles.stepTitle}>Select Food</Text>
            <Text style={styles.stepDescription}>Browse restaurants & menus</Text>
          </View>
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>3</Text>
            </View>
            <Text style={styles.stepTitle}>Place Order</Text>
            <Text style={styles.stepDescription}>Pay securely online</Text>
          </View>
          <View style={styles.step}>
            <View style={styles.stepNumber}>
              <Text style={styles.stepNumberText}>4</Text>
            </View>
            <Text style={styles.stepTitle}>Enjoy Food</Text>
            <Text style={styles.stepDescription}>Fast delivery to your door</Text>
          </View>
        </View>
      </View>

      {/* CATEGORY MODAL */}
      <Modal
        visible={isCategoryModalVisible}
        animationType="slide"
        transparent={true}
        onRequestClose={() => setIsCategoryModalVisible(false)}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Select Category</Text>
              <TouchableOpacity onPress={() => setIsCategoryModalVisible(false)}>
                <Text style={styles.closeButton}>✕</Text>
              </TouchableOpacity>
            </View>
            <ScrollView style={styles.modalScrollView}>
              {categories.map((category, index) => (
                <TouchableOpacity
                  key={index}
                  style={[
                    styles.categoryItem,
                    selectedCategory === category && styles.selectedCategoryItem
                  ]}
                  onPress={() => {
                    setSelectedCategory(category);
                    setIsCategoryModalVisible(false);
                  }}
                >
                  <Text style={[
                    styles.categoryItemText,
                    selectedCategory === category && styles.selectedCategoryItemText
                  ]}>
                    {category}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  hero: {
    height: 400,
    justifyContent: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.6)",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: "bold",
    color: "#fff",
    textAlign: "center",
    marginBottom: 10,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: {width: -1, height: 1},
    textShadowRadius: 10
  },
  heroSubtitle: {
    fontSize: 18,
    color: "#fff",
    textAlign: "center",
    marginBottom: 30,
    opacity: 0.9,
  },
  searchContainer: {
    flexDirection: "row",
    backgroundColor: "#fff",
    borderRadius: 15,
    marginBottom: 20,
    overflow: "hidden",
    width: "90%",
    elevation: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
  },
  inputContainer: {
    flex: 1,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 15,
  },
  searchIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  input: {
    flex: 1,
    padding: 15,
    fontSize: 16,
    color: "#333",
  },
  searchBtn: {
    backgroundColor: "#dc2626",
    paddingHorizontal: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  searchText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
  addBusinessBtn: {
    borderWidth: 2,
    borderColor: "#fff",
    borderRadius: 25,
    paddingVertical: 12,
    paddingHorizontal: 30,
    backgroundColor: "rgba(255,255,255,0.1)",
  },
  addBusinessText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 14,
  },
  section: {
    padding: 25,
    backgroundColor: "#fff",
  },
  sectionHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 15,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  sectionDescription: {
    fontSize: 16,
    color: "#666",
    marginBottom: 20,
    lineHeight: 22,
  },
  categorySection: {
    marginBottom: 25,
  },
  categoryTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  dropdownButton: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 12,
    padding: 16,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  dropdownArrow: {
    fontSize: 12,
    color: '#666',
  },
  nearbyHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  nearbyTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#222",
  },
  seeAll: {
    color: "#dc2626",
    fontWeight: "600",
    fontSize: 14,
  },
  restaurantScroll: {
    marginHorizontal: -5,
  },
  restaurantCard: {
    width: 300,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginHorizontal: 8,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  gridContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  restaurantGridCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    elevation: 4,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  restaurantHeader: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  restaurantIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#F0F7FF",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 12,
  },
  restaurantEmoji: {
    fontSize: 18,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: "700",
    color: "#1a1a1a",
  },
  restaurantDistance: {
    fontSize: 14,
    color: "#666",
    marginTop: 2,
  },
  restaurantDivider: {
    height: 1,
    backgroundColor: "#f0f0f0",
    marginVertical: 12,
  },
  restaurantDetails: {
    marginBottom: 15,
  },
  restaurantDetail: {
    fontSize: 12,
    color: "#555",
    marginBottom: 6,
    lineHeight: 16,
  },
  directionBtn: {
    backgroundColor: "#dc2626",
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: "center",
    elevation: 2,
  },
  directionText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 14,
  },
  horizontalScroll: {
    paddingVertical: 5,
  },
  partnerBox: {
    width: 140,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginRight: 15,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  partnerGridBox: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  partnerLogo: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#F0F7FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  partnerEmoji: {
    fontSize: 24,
  },
  partnerName: {
    fontSize: 14,
    fontWeight: "600",
    color: "#222",
    textAlign: "center",
  },
  brandCard: {
    width: 160,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginRight: 15,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  brandGridCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  brandIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#FFF0F0",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  brandEmoji: {
    fontSize: 20,
  },
  brandName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#222",
    marginBottom: 4,
    textAlign: "center",
  },
  brandDesc: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
  },
  serviceCard: {
    width: 150,
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginRight: 15,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  serviceGridCard: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 15,
    marginBottom: 15,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  serviceIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: "#F0F7FF",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 10,
  },
  serviceEmoji: {
    fontSize: 20,
  },
  serviceName: {
    fontSize: 14,
    fontWeight: "700",
    color: "#222",
    marginBottom: 6,
    textAlign: "center",
  },
  servicePrice: {
    fontSize: 14,
    color: "#dc2626",
    fontWeight: "600",
  },
  howItWorksSection: {
    backgroundColor: "#F8FAFF",
    borderBottomWidth: 0,
  },
  stepsContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginTop: 10,
  },
  step: {
    width: "48%",
    backgroundColor: "#fff",
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
    alignItems: "center",
    elevation: 2,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    borderWidth: 1,
    borderColor: "#f0f0f0",
  },
  stepNumber: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: "#dc2626",
    justifyContent: "center",
    alignItems: "center",
    marginBottom: 12,
  },
  stepNumberText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: "700",
    color: "#222",
    marginBottom: 6,
    textAlign: "center",
  },
  stepDescription: {
    fontSize: 12,
    color: "#666",
    textAlign: "center",
    lineHeight: 16,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    maxHeight: '70%',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
  },
  closeButton: {
    fontSize: 20,
    color: '#666',
    fontWeight: 'bold',
  },
  modalScrollView: {
    maxHeight: 400,
  },
  categoryItem: {
    padding: 18,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  selectedCategoryItem: {
    backgroundColor: '#f0f7ff',
  },
  categoryItemText: {
    fontSize: 16,
    color: '#333',
  },
  selectedCategoryItemText: {
    color: '#0066CC',
    fontWeight: '500',
  },
  restaurantImage: {
    width: "100%",
    height: 120,
    borderRadius: 12,
    marginBottom: 10,
  },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#999",
    textAlign: "center",
  },

   // ✅ LOCATION SECTIONS
  locationSection: { 
    backgroundColor: "#f8fafc", 
    padding: 15, 
    borderRadius: 12, 
    marginBottom: 15,
    borderLeftWidth: 4,
    borderLeftColor: "#dc2626"
  },
  locationTitle: { 
    fontSize: 18, 
    fontWeight: "700", 
    color: "#111", 
    marginBottom: 10 
  },
  restaurantList: { paddingLeft: 10 },
  restaurantItem: { 
    fontSize: 14, 
    lineHeight: 20, 
    color: "#555", 
    marginBottom: 5 
  },

  featureGrid: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    justifyContent: "space-between", 
    marginTop: 15 
  },
  featureItem: { 
    width: width / 2 - 25, 
    backgroundColor: "#fff", 
    borderRadius: 12, 
    padding: 15, 
    marginBottom: 15, 
    elevation: 2, 
    shadowColor: "#000", 
    shadowOffset: { width: 0, height: 2 }, 
    shadowOpacity: 0.1, 
    shadowRadius: 4, 
    borderWidth: 1, 
    borderColor: "#fca5a5" 
  },
  featureIcon: { fontSize: 24, marginBottom: 8 },
  featureTitle: { fontSize: 16, fontWeight: "700", marginBottom: 5, color: "#111" },
  featureDesc: { fontSize: 13, color: "#666", lineHeight: 18 },
   bold: { fontWeight: "600", color: "#111" },
  subTitle: { fontSize: 22, fontWeight: "700", marginTop: 25, marginBottom: 12, color: "#dc2626" },
});

export default HomeScreen;