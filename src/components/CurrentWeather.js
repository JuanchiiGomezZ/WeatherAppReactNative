import { StyleSheet, Text, View, Dimensions } from "react-native";
import React, { useEffect, useContext, RefreshControl } from "react";
import WeatherContext from "../context/currentWeather/WeatherContext";
import { Feather } from "@expo/vector-icons";

const CurrentWeather = () => {
  const { currentWeather, getCurrentWeather } = useContext(WeatherContext);

  const windowWidth = Dimensions.get("window").width;
  const windowHeight = Dimensions.get("window").height;

  const iconSelector = (data) => {
    if (data == "Clear") {
      return (
        <Feather
          name="sun"
          size={80}
          color="yellow"
          style={{ marginTop: 20 }}
        />
      );
    } else if (data == "Rain") {
      return (
        <Feather
          name="cloud-rain"
          size={80}
          color="rgba(66, 66, 66, 1)"
          style={{ marginTop: 20 }}
        />
      );
    } else if (data == "Snow") {
      return (
        <Feather
          name="cloud-snow"
          size={80}
          color="rgba(86, 86, 86, 1)"
          style={{ marginTop: 20 }}
        />
      );
    } else if (data == "Clouds") {
      return (
        <Feather
          name="cloud"
          size={80}
          color="rgba(90, 90, 90, 1)"
          style={{ marginTop: 20 }}
        />
      );
    }
  };

  return (
    <>
      <View
        style={{
          width: "100%",
          alignItems: "center",
          justifyContent: "center",
          marginTop: windowHeight / 10,
        }}
      >
        {[currentWeather].map((item) => (
          <View style={{ flexDirection: "row" }} key={item.id}>
            <Text style={{ fontSize: 110, color: "white", fontWeight: "500" }}>
              {item.main.temp.toFixed(1).slice(-1) == 0
                ? Math.round(item.main.temp)
                : item.main.temp.toFixed(1)}
            </Text>
            <Text
              style={{
                color: "white",
                fontWeight: "700",
                marginTop: 30,
                fontSize: 30,
              }}
            >
              °C
            </Text>
          </View>
        ))}
        {currentWeather.weather.map((data) => (
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <Text
              style={{
                color: "rgba(255, 255, 255, 0.83)",
                fontSize: 25,
                fontWeight: "500",
                /* marginRight:20 */
              }}
              key={data.id}
            >
              {data.description[0].toUpperCase() + data.description.slice(1)}
            </Text>
          </View>
        ))}
        {iconSelector(currentWeather.weather[0].main)}
      </View>
    </>
  );
};

export default CurrentWeather;
