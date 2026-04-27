//footer

import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import type { RootStackParamList } from "../navigations/Types";

interface FooterProps {
  navigation?: NativeStackNavigationProp<RootStackParamList>;
}

const Footer: React.FC<FooterProps> = ({ navigation }) => {
  return (
    <View style={styles.footerContainer}>
      <Text style={styles.title}>
        BhojanHub<Text style={styles.highlight}>Nepal</Text>
      </Text>
      <Text style={styles.tagline}>Find the best food near you in Nepal</Text>

      <View style={styles.linksContacts}>
        <View style={styles.links}>
          <Text style={styles.sectionTitle}>Quick Links</Text>
          {[
            { label: "Home", route: "Home" },
            { label: "About Us", route: "AboutUs" },
            { label: "All Restaurants", route: "AllRestaurants" },
            { label: "Register Business", route: "RegisterBusiness" },
            { label: "Login", route: "Login" },
          ].map((item) => (
            <TouchableOpacity 
              key={item.route} 
              style={styles.linkButton}
              onPress={() => navigation?.navigate(item.route as any)}
            >
              <Text style={styles.linkText}>{item.label}</Text>
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.contacts}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          <Text style={styles.contactText}>Kathmandu, Nepal</Text>
          <Text style={styles.contactText}>+977 9888888888</Text>
          <Text style={styles.contactText}>info@bhojanhubnepal.com</Text>
          <Text style={styles.contactText}>Sun-Fri: 10AM - 6PM</Text>
        </View>
      </View>

      <Text style={styles.copyright}>
        © 2025 BhojanHub Nepal. All rights reserved.
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    backgroundColor: "#1f2937", // dark navy
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderTopWidth: 1,
    borderTopColor: "#374151",
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
  },
  highlight: {
    color: "#dc2626", // bright red
  },
  tagline: {
    color: "#9ca3af",
    fontSize: 12,
    marginVertical: 5,
  },
  linksContacts: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
  links: {
    flex: 1,
  },
  contacts: {
    flex: 1,
  },
  sectionTitle: {
    fontWeight: "bold",
    color: "#fff",
    marginBottom: 5,
    fontSize: 14,
  },
  linkButton: {
    marginVertical: 2,
  },
  linkText: {
    color: "#9ca3af",
    fontSize: 12,
  },
  contactText: {
    color: "#9ca3af",
    fontSize: 12,
    marginVertical: 1,
  },
  copyright: {
    color: "#6b7280",
    fontSize: 10,
    textAlign: "center",
    marginTop: 10,
  },
});

export default Footer;