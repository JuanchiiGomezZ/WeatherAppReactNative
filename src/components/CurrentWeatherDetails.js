import { StyleSheet, Text, ScrollView, View, FlatList } from "react-native";
import React, { useContext, useState } from "react";
import WeatherContext from "../context/currentWeather/WeatherContext";
import { Feather, Entypo } from "@expo/vector-icons";
import { BlurView } from "expo-blur";

const CurrentWeatherDetails = () => {
  const { fiveDaysWeather, currentWeather } = useContext(WeatherContext);

  return (
    <View style={{ marginBottom: 140 }}>
      {[currentWeather].map((item) => (
        <BlurView
          style={{
            flexDirection: "row",
            flexWrap: "wrap",
            paddingHorizontal: 20,
            paddingVertical: 30,
            borderRadius: 20,
          }}
          key={item.id}
        >
          <View style={styles.card}>
            <Text style={styles.mainWord}>Minimum</Text>
            <Text style={styles.subWord}>{item.main.temp_min.toFixed(1).slice(-1) == 0 ? Math.round(item.main.temp_min) : item.main.temp_min.toFixed(1)}°C</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.mainWord}>Maximum</Text>
            <Text style={styles.subWord}>{item.main.temp_max.toFixed(1).slice(-1) == 0 ? Math.round(item.main.temp_max) : item.main.temp_max.toFixed(1)}°C</Text>
          </View>
          <View style={[styles.card, { marginVertical: 20 }]}>
            <Text style={styles.mainWord}>Feels like</Text>
            <Text style={styles.subWord}>{item.main.feels_like.toFixed(1)}°C</Text>
          </View>
          <View style={[styles.card, { marginVertical: 20 }]}>
            <Text style={styles.mainWord}>Wind</Text>
            <Text style={styles.subWord}>{item.wind.speed.toFixed(1)} km/h</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.mainWord}>Humidity</Text>
            <Text style={styles.subWord}>{item.main.humidity}%</Text>
          </View>
          <View style={styles.card}>
            <Text style={styles.mainWord}>Pressure</Text>
            <Text style={styles.subWord}>{item.main.pressure} mbar</Text>
          </View>
        </BlurView>
      ))}
    </View>
  );
};

export default CurrentWeatherDetails;

const styles = StyleSheet.create({
  mainWord: {
    color: "rgba(255, 255, 255, 0.8)",
    fontSize: 20,
    fontWeight: "600",
  },
  subWord: {
    color: "white",
    fontSize: 20,
    fontWeight: "600",
  },
  card: {
    width: "45%",
  },
});
