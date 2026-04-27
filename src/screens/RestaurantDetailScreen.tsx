import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  Image,
  TouchableOpacity,
  Linking,
  Dimensions,
} from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../navigations/Types";

const { width } = Dimensions.get("window");

type RestaurantDetailRouteProp = RouteProp<RootStackParamList, "RestaurantDetail">;

const RestaurantDetailScreen = () => {
  const route = useRoute<RestaurantDetailRouteProp>();
  const navigation = useNavigation();
  const { restaurantId, name } = route.params;

  // Mock data for the detailed view
  // In a real app, you would fetch this using the restaurantId
  const restaurantDetail = {
    id: restaurantId,
    title: name,
    image: "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80",
    address: "Kathmandu, Nepal",
    rating: 4.8,
    reviews: 124,
    category: "Nepalese & International",
    description: "Experience the authentic flavors of Nepal combined with modern international cuisine. Our chef uses locally sourced ingredients to create mouth-watering dishes that will leave you wanting more.",
    phone: "+977-1-422XXXX",
    email: "info@bhojanhub.com.np",
    openingHours: "10:00 AM - 10:00 PM",
    amenities: ["Free WiFi", "Outdoor Seating", "Parking", "AC"],
    menu: [
      { id: "m1", name: "Chicken Momo", price: "Rs. 250", description: "Steamed dumplings served with spicy tomato chutney." },
      { id: "m2", name: "Thakali Khana Set", price: "Rs. 650", description: "Traditional Nepali meal with rice, lentils, vegetables, and meat." },
      { id: "m3", name: "Crunchy Burger", price: "Rs. 450", description: "Juicy chicken patty with fresh lettuce and secret sauce." },
      { id: "m4", name: "Iced Americano", price: "Rs. 180", description: "Freshly brewed coffee with ice." },
    ]
  };

  const handleCall = () => {
    Linking.openURL(`tel:${restaurantDetail.phone}`);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* IMAGE HEADER */}
      <Image source={{ uri: restaurantDetail.image }} style={styles.heroImage} />
      
      {/* BACK BUTTON */}
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => navigation.goBack()}
      >
        <Text style={styles.backButtonText}>←</Text>
      </TouchableOpacity>

      {/* CONTENT */}
      <View style={styles.content}>
        <View style={styles.headerRow}>
          <View>
            <Text style={styles.title}>{restaurantDetail.title}</Text>
            <Text style={styles.category}>{restaurantDetail.category}</Text>
          </View>
          <View style={styles.ratingBadge}>
            <Text style={styles.ratingText}>⭐ {restaurantDetail.rating}</Text>
            <Text style={styles.reviewText}>{restaurantDetail.reviews} reviews</Text>
          </View>
        </View>

        <View style={styles.divider} />

        <Text style={styles.sectionTitle}>About</Text>
        <Text style={styles.description}>{restaurantDetail.description}</Text>

        <View style={styles.infoSection}>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>📍</Text>
            <Text style={styles.infoText}>{restaurantDetail.address}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoIcon}>⏰</Text>
            <Text style={styles.infoText}>{restaurantDetail.openingHours}</Text>
          </View>
        </View>

        <Text style={styles.sectionTitle}>Amenities</Text>
        <View style={styles.amenityContainer}>
          {restaurantDetail.amenities.map((item, index) => (
            <View key={index} style={styles.amenityBadge}>
              <Text style={styles.amenityText}>{item}</Text>
            </View>
          ))}
        </View>

        <Text style={styles.sectionTitle}>Menu Highlights</Text>
        {restaurantDetail.menu.map((item) => (
          <View key={item.id} style={styles.menuItem}>
            <View style={styles.menuInfo}>
              <Text style={styles.menuName}>{item.name}</Text>
              <Text style={styles.menuDesc}>{item.description}</Text>
            </View>
            <Text style={styles.menuPrice}>{item.price}</Text>
          </View>
        ))}

        <View style={styles.actionButtons}>
          <TouchableOpacity style={styles.callButton} onPress={handleCall}>
            <Text style={styles.callButtonText}>📞 Call Now</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.orderButton}>
            <Text style={styles.orderButtonText}>🛒 Order Online</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  heroImage: {
    width: width,
    height: 250,
  },
  backButton: {
    position: "absolute",
    top: 40,
    left: 20,
    backgroundColor: "rgba(255,255,255,0.8)",
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    elevation: 5,
  },
  backButtonText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    padding: 20,
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
    backgroundColor: "#fff",
    marginTop: -30,
  },
  headerRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
    marginBottom: 10,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1a1a1a",
  },
  category: {
    fontSize: 16,
    color: "#dc2626",
    fontWeight: "600",
    marginTop: 4,
  },
  ratingBadge: {
    alignItems: "flex-end",
  },
  ratingText: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
  },
  reviewText: {
    fontSize: 12,
    color: "#666",
  },
  divider: {
    height: 1,
    backgroundColor: "#eee",
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 12,
    marginTop: 10,
  },
  description: {
    fontSize: 15,
    color: "#555",
    lineHeight: 22,
    marginBottom: 20,
  },
  infoSection: {
    backgroundColor: "#f9f9f9",
    padding: 15,
    borderRadius: 15,
    marginBottom: 20,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoIcon: {
    fontSize: 18,
    marginRight: 10,
  },
  infoText: {
    fontSize: 14,
    color: "#444",
  },
  amenityContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 8,
    marginBottom: 20,
  },
  amenityBadge: {
    backgroundColor: "#eef2ff",
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  amenityText: {
    color: "#4f46e5",
    fontSize: 13,
    fontWeight: "500",
  },
  menuItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingVertical: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
  },
  menuInfo: {
    flex: 1,
    marginRight: 10,
  },
  menuName: {
    fontSize: 16,
    fontWeight: "600",
    color: "#333",
  },
  menuDesc: {
    fontSize: 13,
    color: "#888",
    marginTop: 2,
  },
  menuPrice: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#dc2626",
  },
  actionButtons: {
    flexDirection: "row",
    gap: 12,
    marginTop: 30,
    marginBottom: 20,
  },
  callButton: {
    flex: 1,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#dc2626",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
  },
  callButtonText: {
    color: "#dc2626",
    fontWeight: "bold",
    fontSize: 16,
  },
  orderButton: {
    flex: 2,
    backgroundColor: "#dc2626",
    paddingVertical: 15,
    borderRadius: 15,
    alignItems: "center",
    elevation: 3,
  },
  orderButtonText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 16,
  },
});

export default RestaurantDetailScreen;
