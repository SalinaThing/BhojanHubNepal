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

type AllRestaurantsRouteProp = RouteProp<RootStackParamList, "AllRestaurants">;

type NavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "AllRestaurants"
>;

export type Restaurant = {
  id: string;
  title: string;
  address: string;
  contact_phone: string;
  category: string;
  latitude?: number;
  longitude?: number;
  image?: string | null;
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
    const initialData: Restaurant[] = [
      {
        id: "1",
        title: "Bhojan Griha",
        address: "Dillibazar, Kathmandu",
        contact_phone: "01-4223456",
        category: "Nepali",
        latitude: 27.708,
        longitude: 85.323,
        image: "https://images.unsplash.com/photo-1504674900247-0877df9cc836?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      },
      {
        id: "2",
        title: "Pizza Italia",
        address: "Thamel, Kathmandu",
        contact_phone: "01-4412345",
        category: "Italian",
        latitude: 27.715,
        longitude: 85.312,
        image: "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      },
      {
        id: "3",
        title: "Dragon Chinese",
        address: "Chinatown Road, Kathmandu",
        contact_phone: "01-4229876",
        category: "Chinese",
        latitude: 27.702,
        longitude: 85.315,
        image: "https://images.unsplash.com/photo-1546833999-b9f581a1996d?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      },
      {
        id: "4",
        title: "Spice India",
        address: "Curry Lane, Lalitpur",
        contact_phone: "01-5556677",
        category: "Indian",
        latitude: 27.678,
        longitude: 85.318,
        image: "https://images.unsplash.com/photo-1585937421612-70a008356fbe?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      },
      {
        id: "5",
        title: "Tokyo Sushi",
        address: "Sushi Street, Kathmandu",
        contact_phone: "01-4422334",
        category: "Japanese",
        latitude: 27.712,
        longitude: 85.325,
        image: "https://images.unsplash.com/photo-1579584425555-c3ce17fd4351?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      },
      {
        id: "6",
        title: "Himalayan Java",
        address: "Heritage Plaza, Kathmandu",
        contact_phone: "01-4433221",
        category: "Cafe",
        latitude: 27.705,
        longitude: 85.320,
        image: "https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      },
      {
        id: "7",
        title: "Taco Fiesta",
        address: "Mexican Blvd, Kathmandu",
        contact_phone: "01-4455667",
        category: "Mexican",
        latitude: 27.718,
        longitude: 85.330,
        image: "https://images.unsplash.com/photo-1565299585323-38174c13fae8?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      },
      {
        id: "8",
        title: "Sweet Tooth",
        address: "Dessert Lane, Lalitpur",
        contact_phone: "01-5511223",
        category: "Desserts",
        latitude: 27.682,
        longitude: 85.310,
        image: "https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      },
      {
        id: "9",
        title: "Burger Palace",
        address: "Fast Food Court, Kathmandu",
        contact_phone: "01-4221122",
        category: "Fast Food",
        latitude: 27.700,
        longitude: 85.305,
        image: "https://images.unsplash.com/photo-1572802419224-296b0aeee0d9?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      },
      {
        id: "10",
        title: "Korea Town BBQ",
        address: "Thamel, Kathmandu",
        contact_phone: "01-4411122",
        category: "Japanese", // Using Japanese as a proxy for Korean since we don't have a Korean cat yet
        latitude: 27.714,
        longitude: 85.311,
        image: "https://images.unsplash.com/photo-1553163147-622ab57be1c7?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      },
      {
        id: "11",
        title: "The Baker's Hub",
        address: "Bakery Street, Lalitpur",
        contact_phone: "01-5544332",
        category: "Bakery",
        latitude: 27.675,
        longitude: 85.320,
        image: "https://images.unsplash.com/photo-1509440159596-0249088772ff?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      },
      {
        id: "12",
        title: "Riverside Fine Dine",
        address: "Waterfront, Pokhara",
        contact_phone: "061-445566",
        category: "Continental",
        latitude: 28.209,
        longitude: 83.958,
        image: "https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      }
    ];

    setRestaurants(initialData);

    // Apply initial filters if params exist
    const q = route.params?.searchQuery || "";
    const cat = route.params?.category || "All Categories";
    
    setSearch(q);
    setCategory(cat);

    const filteredResult = initialData.filter((r) => {
      const matchSearch = q ? (
        r.title.toLowerCase().includes(q.toLowerCase()) ||
        r.address.toLowerCase().includes(q.toLowerCase()) ||
        r.category.toLowerCase().includes(q.toLowerCase())
      ) : true;

      const matchCategory = cat === "All Categories" || r.category === cat;

      return matchSearch && matchCategory;
    });

    setFiltered(filteredResult);
    setLoading(false);
  }, [route.params]);

  const handleSearch = () => {
    const result = restaurants.filter(
      (r) =>
        r.title.toLowerCase().includes(search.toLowerCase()) &&
        (category === "All Categories" || r.category === category)
    );
    setFiltered(result);
  };

  const handleReset = () => {
    setSearch("");
    setCategory("All Categories");
    setFiltered(restaurants);
  };

  const handleNearMe = async () => {
    if (Platform.OS === "android") {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
      );
      if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
        Alert.alert("Location permission required");
        return;
      }
    }

    Geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;

        const nearby = restaurants.filter((r) => {
          if (!r.latitude || !r.longitude) return false;
          const dist =
            Math.abs(r.latitude - latitude) +
            Math.abs(r.longitude - longitude);
          return dist < 0.5;
        });

        setFiltered(nearby);
        if (nearby.length === 0)
          Alert.alert("No nearby restaurants found");
      },
      () => Alert.alert("Location error"),
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

        {filtered.map((item) => (
          <RestaurantItem
            key={item.id}
            restaurant={item}
            onPress={openRestaurant}
          />
        ))}
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
});
