import React from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from "react-native";

const { width } = Dimensions.get("window");

const BhojanHubAboutScreen = ({ navigation }) => {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* ✅ HERO SECTION */}
      <View style={styles.heroSection}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>A World of Flavors in Nepal</Text>
          <Text style={styles.heroSubtitle}>
            Discover international cuisines and authentic Nepali restaurants across the country
          </Text>
        </View>
        <View style={styles.heroDecoration}>
          <Text style={styles.heroIcon}>🍜</Text>
        </View>
      </View>

      {/* ✅ ABOUT CONTENT */}
      <View style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.title}>Global Cuisine, Local Experience</Text>
          <Text style={styles.paragraph}>
            Bhojan Hub brings you the best of both worlds - authentic Nepali flavors and international cuisines. From traditional Newari dishes to exotic Korean BBQ, we connect food lovers with diverse dining experiences across Nepal.
          </Text>
        </View>

        <View style={styles.statsContainer}>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>500+</Text>
            <Text style={styles.statLabel}>Restaurants</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>75,000+</Text>
            <Text style={styles.statLabel}>Happy Foodies</Text>
          </View>
          <View style={styles.statItem}>
            <Text style={styles.statNumber}>15+</Text>
            <Text style={styles.statLabel}>Cuisine Types</Text>
          </View>
        </View>

        {/* ✅ CUISINE CATEGORIES */}
        <View style={styles.section}>
          <Text style={styles.subTitle}>Explore Diverse Cuisines 🍽️</Text>
          <View style={styles.cuisineGrid}>
            <View style={styles.cuisineItem}>
              <Text style={styles.cuisineIcon}>🥘</Text>
              <Text style={styles.cuisineName}>Nepali</Text>
              <Text style={styles.cuisineDesc}>Traditional Newari, Thakali, and local delicacies</Text>
            </View>
            <View style={styles.cuisineItem}>
              <Text style={styles.cuisineIcon}>🥢</Text>
              <Text style={styles.cuisineName}>Chinese</Text>
              <Text style={styles.cuisineDesc}>Authentic Sichuan, Cantonese, and Tibetan momos</Text>
            </View>
            <View style={styles.cuisineItem}>
              <Text style={styles.cuisineIcon}>🍣</Text>
              <Text style={styles.cuisineName}>Japanese</Text>
              <Text style={styles.cuisineDesc}>Sushi, ramen, and teppanyaki experiences</Text>
            </View>
            <View style={styles.cuisineItem}>
              <Text style={styles.cuisineIcon}>🍜</Text>
              <Text style={styles.cuisineName}>Korean</Text>
              <Text style={styles.cuisineDesc}>BBQ, kimchi, and authentic Korean flavors</Text>
            </View>
            <View style={styles.cuisineItem}>
              <Text style={styles.cuisineIcon}>🌶️</Text>
              <Text style={styles.cuisineName}>Thai</Text>
              <Text style={styles.cuisineDesc}>Spicy curries, pad thai, and tom yum soup</Text>
            </View>
            <View style={styles.cuisineItem}>
              <Text style={styles.cuisineIcon}>🍛</Text>
              <Text style={styles.cuisineName}>Indian</Text>
              <Text style={styles.cuisineDesc}>North Indian, South Indian, and Mughlai cuisine</Text>
            </View>
            <View style={styles.cuisineItem}>
              <Text style={styles.cuisineIcon}>🍕</Text>
              <Text style={styles.cuisineName}>Italian</Text>
              <Text style={styles.cuisineDesc}>Pasta, pizza, and Mediterranean flavors</Text>
            </View>
            <View style={styles.cuisineItem}>
              <Text style={styles.cuisineIcon}>🥗</Text>
              <Text style={styles.cuisineName}>Continental</Text>
              <Text style={styles.cuisineDesc}>European and Western dining experiences</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subTitle}>Our Mission 🎯</Text>
          <Text style={styles.paragraph}>
            To make diverse culinary experiences accessible across Nepal while supporting local restaurants and promoting international cuisine appreciation.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subTitle}>Our Vision 🌍</Text>
          <Text style={styles.paragraph}>
            To be Nepal's gateway to global flavors, connecting communities through food and creating a platform where every cuisine finds its home.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.subTitle}>Why Choose Bhojan Hub? ⭐</Text>
          <View style={styles.featureGrid}>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>🌏</Text>
              <Text style={styles.featureTitle}>Global Cuisines</Text>
              <Text style={styles.featureDesc}>From local Nepali to international flavors</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📍</Text>
              <Text style={styles.featureTitle}>Nationwide Coverage</Text>
              <Text style={styles.featureDesc}>Restaurants across major cities in Nepal</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>👨‍🍳</Text>
              <Text style={styles.featureTitle}>Authentic Chefs</Text>
              <Text style={styles.featureDesc}>International chefs and local culinary experts</Text>
            </View>
            <View style={styles.featureItem}>
              <Text style={styles.featureIcon}>📱</Text>
              <Text style={styles.featureTitle}>Easy Discovery</Text>
              <Text style={styles.featureDesc}>Find restaurants by cuisine, location, or rating</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subTitle}>Our Services 🍛</Text>
          <View style={styles.card}>
            <Text style={styles.paragraph}>
              • <Text style={styles.bold}>Cuisine Discovery:</Text> Explore by Nepali, Chinese, Korean, Thai, Japanese{"\n"}
              • <Text style={styles.bold}>Location-based Search:</Text> Find restaurants in Kathmandu, Pokhara, Chitwan{"\n"}
              • <Text style={styles.bold}>Multi-language Menus:</Text> English, Nepali, and original language menus{"\n"}
              • <Text style={styles.bold}>Cultural Dining:</Text> Experience authentic ambiance and traditions{"\n"}
              • <Text style={styles.bold}>Specialty Diets:</Text> Vegetarian, vegan, and dietary-specific options
            </Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.subTitle}>Cultural Exchange Through Food 🤝</Text>
          <Text style={styles.paragraph}>
            We believe food brings people together. Our platform not only helps you discover great food but also promotes cultural understanding through authentic dining experiences with chefs from different backgrounds.
          </Text>
        </View>

        <View style={styles.ctaSection}>
          <Text style={styles.ctaTitle}>Taste the World in Nepal</Text>
          <Text style={styles.ctaText}>From traditional Nepali dishes to exotic international cuisines</Text>
          <TouchableOpacity style={styles.ctaButton} onPress={() => navigation?.navigate("RegisterRestaurant")}>
            <Text style={styles.ctaButtonText}>List Your Restaurant</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.secondaryButton} onPress={() => navigation?.navigate("Home")}>
            <Text style={styles.secondaryButtonText}>Explore Restaurants</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default BhojanHubAboutScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },

  // ✅ HERO SECTION
  heroSection: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 25,
    backgroundColor: "#dc2626",
  },
  heroContent: { flex: 2 },
  heroTitle: { fontSize: 22, fontWeight: "bold", color: "#fff", marginBottom: 8 },
  heroSubtitle: { fontSize: 15, color: "rgba(255,255,255,0.9)", lineHeight: 22 },
  heroDecoration: { flex: 1, alignItems: "center" },
  heroIcon: { fontSize: 50 },

  content: { padding: 20 },
  section: { marginBottom: 30 },
  title: { fontSize: 26, fontWeight: "700", color: "#111", marginBottom: 15, textAlign: "center", lineHeight: 34 },
  subTitle: { fontSize: 22, fontWeight: "700", marginTop: 25, marginBottom: 12, color: "#dc2626" },
  paragraph: { fontSize: 16, lineHeight: 26, color: "#444", textAlign: "left" },
  bold: { fontWeight: "600", color: "#111" },

  statsContainer: { 
    flexDirection: "row", 
    justifyContent: "space-around", 
    marginVertical: 25, 
    paddingVertical: 20, 
    backgroundColor: "#fef2f2", 
    borderRadius: 12 
  },
  statItem: { alignItems: "center" },
  statNumber: { fontSize: 24, fontWeight: "800", color: "#dc2626", marginBottom: 5 },
  statLabel: { fontSize: 14, color: "#666", fontWeight: "500" },

  // ✅ CUISINE GRID
  cuisineGrid: { 
    flexDirection: "row", 
    flexWrap: "wrap", 
    justifyContent: "space-between",
    marginTop: 15 
  },
  cuisineItem: { 
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
    borderColor: "#fca5a5",
    alignItems: "center"
  },
  cuisineIcon: { fontSize: 24, marginBottom: 8 },
  cuisineName: { fontSize: 16, fontWeight: "700", marginBottom: 5, color: "#111", textAlign: "center" },
  cuisineDesc: { fontSize: 12, color: "#666", lineHeight: 16, textAlign: "center" },

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

  card: { 
    backgroundColor: "#fff1f2", 
    padding: 20, 
    borderRadius: 12, 
    marginVertical: 10, 
    borderWidth: 1, 
    borderColor: "#fecaca" 
  },

  ctaSection: { 
    backgroundColor: "#dc2626", 
    padding: 25, 
    borderRadius: 12, 
    alignItems: "center", 
    marginVertical: 20 
  },
  ctaTitle: { 
    fontSize: 20, 
    fontWeight: "700", 
    color: "#fff", 
    marginBottom: 10, 
    textAlign: "center" 
  },
  ctaText: { 
    fontSize: 15, 
    color: "rgba(255,255,255,0.9)", 
    marginBottom: 20, 
    textAlign: "center" 
  },
  ctaButton: { 
    backgroundColor: "#fff", 
    paddingVertical: 12, 
    paddingHorizontal: 30, 
    borderRadius: 25,
    marginBottom: 10,
    width: "100%",
    alignItems: "center"
  },
  ctaButtonText: { 
    color: "#dc2626", 
    fontWeight: "700", 
    fontSize: 16 
  },
  secondaryButton: {
    backgroundColor: "transparent",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    borderWidth: 2,
    borderColor: "#fff",
    width: "100%",
    alignItems: "center"
  },
  secondaryButtonText: {
    color: "#fff",
    fontWeight: "700",
    fontSize: 16
  }
});