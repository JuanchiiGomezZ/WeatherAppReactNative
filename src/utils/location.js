import { useEffect, useContext } from "react";
import * as Location from "expo-location";
import WeatherContext from "../context/currentWeather/WeatherContext";

export const getCoords = () => {
  const { getCurrentWeather, getFiveDaysWeather } = useContext(WeatherContext);
  useEffect(() => {
    
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        return;
      }
      let location = await Location.getCurrentPositionAsync({});
      let lat = location.coords.latitude;
      let long = location.coords.longitude;
      getCurrentWeather(lat,long);
      getFiveDaysWeather(lat,long);
    })();
  }, []);
};
