import {
  FlatList,
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useContext } from "react";
import { FontAwesome, Ionicons } from "@expo/vector-icons";
import WeatherContext from "../context/currentWeather/WeatherContext";

const Header = ({ setShowModal }) => {
  const { currentWeather } = useContext(WeatherContext);

  return (
    <View
      style={{
        marginTop: 45,
        width: "100%",
      }}
    >
      <FlatList
        data={[currentWeather]}
        renderItem={({ item }) => {
          return (
            <View
              style={{ flexDirection: "row", justifyContent: "space-between" }}
            >
              <TouchableOpacity
                onPress={() => {
                  setShowModal(true);
                }}
              >
                <FontAwesome name="search" size={24} color="white" />
              </TouchableOpacity>
              <Text style={{ color: "white", fontSize: 20, fontWeight: "700" }}>
                {item.name.length >= 18
                  ? `${item.name}`
                  : `${item.name}  ${item.sys.country}`}
              </Text>
              <TouchableOpacity>
                <Ionicons name="settings-outline" size={28} color="white" />
              </TouchableOpacity>
            </View>
          );
        }}
      />
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({});
