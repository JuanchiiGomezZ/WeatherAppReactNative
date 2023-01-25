import { StyleSheet, Text, View, FlatList, Dimensions } from "react-native";
import React, { useContext, useState } from "react";
import { days } from "../utils/days";
import WeatherContext from "../context/currentWeather/WeatherContext";
import { Feather, Entypo } from "@expo/vector-icons";
const FiveDaysWeather = () => {
  const { fiveDaysWeather} = useContext(WeatherContext);

  let minMaxTempArr = [];
  let weekDays = days();

  if (fiveDaysWeather !== "") {
    const array = fiveDaysWeather.list;
    let today = new Date().getDate();
    let c = 0;
    for (let i = today + 1; i <= today + 5; i++) {
      /*Array filtered by days  */
      let arrFilter = array.filter((item) => item.dt_txt.slice(8, 10) == i);

      /* Array sorted by maximum temperature */
      let maxTempArr = arrFilter;
      maxTempArr.sort((a, b) => {
        if (a.main.temp_max > b.main.temp_max) {
          return -1;
        }
        return 0;
      });
      let maxTemp = maxTempArr[0].main.temp_max;

      /* Array sorted by minium temperature */
      let minTempArr = arrFilter;
      minTempArr.sort((a, b) => {
        if (a.main.temp_min < b.main.temp_min) {
          return -1;
        }
        return 0;
      });
      let minTemp = minTempArr[0].main.temp_min;

      let weatherDay =
        arrFilter[Math.round(arrFilter.length / 2)].weather[0].main;

      /* Creating the new array */
      let minMaxTemp = {
        maxTemp,
        minTemp,
        day: weekDays[c].day,
        id: i,
        weather: weatherDay,
      };
      minMaxTempArr.push(minMaxTemp);
      c++;
    }
  }

  const iconSelector = (data) => {
    if (data == "Clear") {
      return <Feather name="sun" size={27} color="yellow" />;
    } else if (data == "Snow") {
      return <Feather name="cloud-snow" size={25} color="rgba(86, 86, 86, 1)" />;
    } else if (data == "Rain") {
      return <Feather name="cloud-rain" size={25} color="rgba(66, 66, 66, 1)" />;
    } else if (data == "Clouds") {
      return <Feather name="cloud" size={25} color="rgba(90, 90, 90, 1)" />;
    } else {
      return <Entypo name="circle" size={20} color="yellow" />;
    }
  };

  return (
    <View style={{ justifyContent: "flex-end", height: "33%", width: "100%", marginBottom:'15%' }}>
      {minMaxTempArr.map((item) => (
        <View key={item.id}>
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "center",
              width: "100%",
            }}
          >
            <View
              style={{
                flexDirection: "row",
                marginVertical: 10,
                alignItems: "center",
              }}
            >
              {iconSelector(item.weather)}
              <Text style={[styles.textCommon, { marginLeft: 10 }]}>
                {item.day}
              </Text>
            </View>
            <Text style={styles.textCommon}>{`${Math.round(
              item.minTemp
            )}° / ${Math.round(item.maxTemp)}°`}</Text>
          </View>
          <View
            style={{
              width: "100%",
              height: 1,
              backgroundColor: "rgba(255, 255, 255, 0.4)",
            }}
          />
        </View>
      ))}
    </View>
  );
};

export default FiveDaysWeather;

const styles = StyleSheet.create({
  textCommon: {
    color: "white",
    fontSize: 20,
  },
});
