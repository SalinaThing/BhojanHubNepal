import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
  Alert,
  PermissionsAndroid,
  Platform,
  Image,
} from "react-native";
import { Picker } from "@react-native-picker/picker";
import { useNavigation, useRoute, RouteProp } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import Geolocation from "react-native-geolocation-service";
import { RootStackParamList } from "../navigations/Types";
import { ALL_RESTAURANTS_DATA, Restaurant } from "../data/restaurants";

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AllRestaurants"
>;

type LocationCoords = {
  latitude: number;
  longitude: number;
};

interface RestaurantItemProps {
  restaurant: Restaurant;
  onPress: (restaurant: Restaurant) => void;
}

const RestaurantItem: React.FC<RestaurantItemProps> = ({
  restaurant,
  onPress,
}) => (
  <View style={styles.cardWrapper}>
    <TouchableOpacity onPress={() => onPress(restaurant)}>
      {restaurant.image && (
        <Image source={{ uri: restaurant.image }} style={styles.cardImage} />
      )}
      <Text style={styles.cardTitle}>{restaurant.title}</Text>
      <Text style={styles.cardText}>📍 {restaurant.address}</Text>
      <Text style={styles.cardText}>📞 {restaurant.contact_phone}</Text>
      <Text style={styles.cardText}>🏷️ {restaurant.category}</Text>
      <Text style={styles.viewMore}>View Menu</Text>
    </TouchableOpacity>
  </View>
);

export default function AllRestaurantsScreen() {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<AllRestaurantsRouteProp>();

  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [filtered, setFiltered] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All Categories");
  const [userLocation, setUserLocation] = useState<LocationCoords | null>(null);

  const getDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    const R = 6371; // Radius of the earth in km
    const dLat = (lat2 - lat1) * (Math.PI / 180);
    const dLon = (lon2 - lon1) * (Math.PI / 180);
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * (Math.PI / 180)) *
        Math.cos(lat2 * (Math.PI / 180)) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  const categories = [
    "All Categories",
    "Fast Food",
    "Italian",
    "Chinese",
    "Indian",
    "Japanese",
    "Cafe",
    "Desserts",
    "Mexican",
    "Bakery",
    "Continental",
    "Nepali",
  ];

  useEffect(() => {
    setRestaurants(ALL_RESTAURANTS_DATA);

    const q = route.params?.searchQuery || "";
    const cat = route.params?.category || "All Categories";
    setSearch(q);
    setCategory(cat);

    const initLocation = async () => {
      try {
        let hasPermission = true;
        if (Platform.OS === "android") {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
          );
          hasPermission = granted === PermissionsAndroid.RESULTS.GRANTED;
        }

        if (hasPermission) {
          Geolocation.getCurrentPosition(
            (pos) => {
              if (pos && pos.coords) {
                const coords = { latitude: pos.coords.latitude, longitude: pos.coords.longitude };
                setUserLocation(coords);
                updateResults(q, cat, coords);
              } else {
                updateResults(q, cat, null);
              }
              setLoading(false);
            },
            (error) => {
              console.log("Location Error:", error);
              updateResults(q, cat, null);
              setLoading(false);
            },
            { enableHighAccuracy: true, timeout: 5000, maximumAge: 10000, forceRequestLocation: true }
          );
        } else {
          updateResults(q, cat, null);
          setLoading(false);
        }
      } catch (err) {
        console.log("initLocation Error:", err);
        updateResults(q, cat, null);
        setLoading(false);
      }
    };

    initLocation();
  }, [route.params]);

  const updateResults = (searchText: string, selectedCat: string, uLoc: LocationCoords | null) => {
    let result = ALL_RESTAURANTS_DATA.filter((r) => {
      const matchSearch = searchText ? (
        r.title.toLowerCase().includes(searchText.toLowerCase()) ||
        r.address.toLowerCase().includes(searchText.toLowerCase()) ||
        r.category.toLowerCase().includes(searchText.toLowerCase())
      ) : true;

      const matchCategory = selectedCat === "All Categories" || r.category === selectedCat;

      return matchSearch && matchCategory;
    });

    if (uLoc && typeof uLoc.latitude === 'number' && typeof uLoc.longitude === 'number') {
      result = result.sort((a, b) => {
        const latA = a.latitude;
        const lonA = a.longitude;
        const latB = b.latitude;
        const lonB = b.longitude;

        if (typeof latA !== 'number' || typeof lonA !== 'number') return 1;
        if (typeof latB !== 'number' || typeof lonB !== 'number') return -1;

        const distA = getDistance(uLoc.latitude, uLoc.longitude, latA, lonA);
        const distB = getDistance(uLoc.latitude, uLoc.longitude, latB, lonB);
        return distA - distB;
      });
    }

    setFiltered(result);
  };

  const handleSearch = () => {
    updateResults(search, category, userLocation);
  };

  const handleReset = () => {
    setSearch("");
    setCategory("All Categories");
    setFiltered(restaurants);
  };

  const handleNearMe = async () => {
    setLoading(true);
    Geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const uLoc = { latitude, longitude };
        setUserLocation(uLoc);

        // Filter for restaurants within 5km
        const nearby = restaurants.filter((r) => {
          if (!r.latitude || !r.longitude) return false;
          return getDistance(latitude, longitude, r.latitude, r.longitude) < 5;
        }).sort((a, b) => {
          const distA = getDistance(latitude, longitude, a.latitude!, a.longitude!);
          const distB = getDistance(latitude, longitude, b.latitude!, b.longitude!);
          return distA - distB;
        });

        setFiltered(nearby);
        setLoading(false);
        if (nearby.length === 0)
          Alert.alert("No nearby restaurants found within 5km.");
      },
      () => {
        setLoading(false);
        Alert.alert("Location error", "Could not get your current location.");
      },
      { enableHighAccuracy: true }
    );
  };

  const openRestaurant = (restaurant: Restaurant) => {
    navigation.navigate("RestaurantDetail", {
      restaurantId: restaurant.id,
      name: restaurant.title,
    });
  };

  if (loading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#dc2626" />
        <Text>Loading restaurants...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView>
        <Text style={styles.title}>Search Restaurants</Text>

        <View style={styles.controls}>
          <Picker
            selectedValue={category}
            onValueChange={setCategory}
            style={styles.picker}
          >
            {categories.map((c) => (
              <Picker.Item label={c} value={c} key={c} />
            ))}
          </Picker>

          <TextInput
            style={styles.input}
            placeholder="Search food or restaurant"
            value={search}
            onChangeText={setSearch}
          />
        </View>

        <View style={styles.buttons}>
          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#dc2626" }]}
            onPress={handleNearMe}
          >
            <Text style={styles.btnText}>📍 Near Me</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#2563eb" }]}
            onPress={handleSearch}
          >
            <Text style={styles.btnText}>Search</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={[styles.btn, { backgroundColor: "#555" }]}
            onPress={handleReset}
          >
            <Text style={styles.btnText}>Reset</Text>
          </TouchableOpacity>
        </View>

        {filtered.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Text style={styles.emptyText}>No restaurants found matching your criteria.</Text>
            <TouchableOpacity onPress={handleReset} style={styles.resetBtn}>
              <Text style={styles.resetBtnText}>Clear all filters</Text>
            </TouchableOpacity>
          </View>
        ) : (
          filtered.map((item) => (
            <RestaurantItem
              key={item.id}
              restaurant={item}
              onPress={openRestaurant}
            />
          ))
        )}
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#f5f5f5" },
  center: { flex: 1, justifyContent: "center", alignItems: "center" },
  title: { fontSize: 24, fontWeight: "700", textAlign: "center", margin: 15 },
  controls: { flexDirection: "row", marginHorizontal: 15 },
  picker: { flex: 1, backgroundColor: "#fff" },
  input: {
    flex: 2,
    backgroundColor: "#fff",
    marginLeft: 5,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  buttons: { flexDirection: "row", margin: 15 },
  btn: {
    flex: 1,
    marginHorizontal: 5,
    padding: 10,
    borderRadius: 5,
    alignItems: "center",
  },
  btnText: { color: "#fff", fontWeight: "600" },
  cardWrapper: {
    marginHorizontal: 15,
    marginBottom: 15,
    backgroundColor: "#fff",
    borderRadius: 10,
    padding: 15,
    elevation: 3,
  },
  cardImage: {
    width: "100%",
    height: 160,
    borderRadius: 10,
    marginBottom: 10,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: "700",
    color: "#dc2626",
  },
  cardText: { fontSize: 14, color: "#444" },
  viewMore: { marginTop: 8, color: "#2563eb", fontWeight: "600" },
  emptyContainer: {
    padding: 40,
    alignItems: "center",
  },
  emptyText: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  resetBtn: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: "#dc2626",
    borderRadius: 5,
  },
  resetBtnText: {
    color: "#fff",
    fontWeight: "600",
  },
});
