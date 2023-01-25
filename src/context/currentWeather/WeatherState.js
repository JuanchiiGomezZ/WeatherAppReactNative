import { View, Text } from "react-native";
import React, { useReducer } from "react";
import WeatherReducer from "./WeatherReducer";
import WeatherContext from "./WeatherContext";
import axios from "axios";

const WeatherState = (props) => {
  const apiKey = process.env.API_KEY;
  const initialState = {
    currentWeather: "",
    fiveDaysWeather: "",
    cityWeather: "",
  };
  const [state, dispatch] = useReducer(WeatherReducer, initialState);

  const getCurrentWeather = async (lat, long) => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`
    );
    let data = res.data;

    dispatch({
      type: "GET_CURRENTWEATHER",
      payload: data,
    });
  };
  const getFiveDaysWeather = async (lat, long) => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${long}&units=metric&appid=${apiKey}`
    );
    let data = res.data;
    dispatch({
      type: "GET_FIVEDAYSWEATHER",
      payload: data,
    });
  };

  const getCityWeather = async (country) => {
    const res = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${country}&units=metric&appid=${apiKey}`
    );
    let data = res.data;
    dispatch({
      type: "GET_CITYWEATHER",
      payload: data,
    });
  };

  return (
    <WeatherContext.Provider
      value={{
        currentWeather: state.currentWeather,
        getCurrentWeather,
        fiveDaysWeather: state.fiveDaysWeather,
        getFiveDaysWeather,
        cityWeather: state.cityWeather,
        getCityWeather,
      }}
    >
      {props.children}
    </WeatherContext.Provider>
  );
};

export default WeatherState;
