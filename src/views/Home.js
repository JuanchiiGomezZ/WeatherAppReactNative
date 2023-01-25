import {
  FlatList,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
  ScrollView,
  RefreshControl,
} from "react-native";
import React, { useState, useContext, useEffect, useCallback } from "react";
import { getCoords } from "../utils/location";
import WeatherContext from "../context/currentWeather/WeatherContext";
import { bgSelector } from "../utils/bgSelector";

import Header from "../components/Header";
import CurrentWeather from "../components/CurrentWeather";
import FiveDaysWeather from "../components/FiveDaysWeather";
import CurrentWeatherDetails from "../components/CurrentWeatherDetails";
import ModalWeather from "../components/ModalWeather";

const Home = () => {
  const { currentWeather, getCurrentWeather } = useContext(WeatherContext);
  const [refreshing, setRefreshing] = useState(false);
  const [showModal, setShowModal] = useState(false);
  let bgColor = "";

  const onRefresh = useCallback(() => {
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }, []);

  getCoords();


    if (currentWeather != "") {
      bgColor = bgSelector(currentWeather.weather[0].main);
    } else {
      bgColor = "#5894DD";
    }



  return (
    <View
      style={{
        backgroundColor: bgColor,
        alignItems: "center",
        paddingHorizontal: "5%",
        flex: 1,
      }}
    >
      {currentWeather == "" ? (
        <View
          style={{
            height: "80%",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <ActivityIndicator size="large" color="white" />
        </View>
      ) : (
        <>
          <Header showModal={showModal} setShowModal={setShowModal} />
          <ScrollView
            style={{ width: "100%" }}
            showsVerticalScrollIndicator={false}
            refreshControl={
              <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
            }
          >
            <CurrentWeather />
            <FiveDaysWeather />
            <CurrentWeatherDetails />
          </ScrollView>
          <ModalWeather showModal={showModal} setShowModal={setShowModal} />
        </>
      )}
    </View>
  );
};

export default Home;

const styles = StyleSheet.create({});
