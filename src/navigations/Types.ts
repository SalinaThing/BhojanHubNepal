// -------------------------------------------------------------
//  BASIC RESTAURANT CARD TYPE (for listings)
// -------------------------------------------------------------
export interface Restaurant {
  id: number;
  name: string;
  distance?: string;        // "2.3 km"
  deliveryTime?: string;    // "25 mins"
  location: string;
  rating?: string;          // "4.7"
  reviews?: string;         // "230 reviews"
  latitude: number;
  longitude: number;
  image?: string | null;    // thumbnail image
  address: string;
  category: string;         // "Fast Food" / "Chinese" / "Coffee"
}

// -------------------------------------------------------------
//  BASIC RESTAURANT LIST TYPE
// -------------------------------------------------------------
export interface RestaurantBasic {
  id: number;
  title: string;             // restaurant name
  address: string;
  contact_phone: string;
  category: string;
  latitude: number;
  longitude: number;
  image?: string | null;     // cover image
  permalink?: string;
  whatsapp?: string;
  email?: string;
  amenities?: string[];      // WiFi, Parking, AC Seating, etc.

  food_types?: {
    nepali?: string[];
    fastfood?: string[];
    bakery?: string[];
    chinese?: string[];
    beverages?: string[];
  };
}

// -------------------------------------------------------------
//  FULL RESTAURANT DETAIL TYPE
// -------------------------------------------------------------
export interface FullRestaurantDetail {
  id: number;
  title: string;
  description: string;           // rich text/HTML description
  featured_image?: string;

  address?: string;
  latitude?: number;
  longitude?: number;

  contact_phone?: string;
  contact_email?: string;
  whatsapp?: string;

  google_map_link?: string;
  permalink?: string;

  gallery?: string[];

  menu_items?: string[];         // "Momo", "Burger", "Pizza", etc.

  nepali_foods?: string[];
  fast_foods?: string[];
  chinese_foods?: string[];
  bakery_items?: string[];
  beverages?: string[];

  amenities?: string[];          // Wifi, AC, Delivery, Smoking Area
  payment_methods?: string[];    // Cash, Card, Esewa, Khalti
  categories?: string[];         // "Fast Food", "Coffee", etc.

  opening_hours: {
    Monday: string;
    Tuesday: string;
    Wednesday: string;
    Thursday: string;
    Friday: string;
    Saturday: string;
    Sunday: string;
  };

  services_html?: string;        // optional menu HTML

  [key: string]: any;
}

export type RootStackParamList = {
  Home: undefined;
  AboutUs: undefined;

  AllRestaurants: undefined;

  RestaurantDetail: {
    restaurantId: string;
    name: string;
  };

  Login: undefined;
  Register: undefined;

  AddRestaurant: undefined;
  MapSearch: undefined;
};
