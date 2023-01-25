import {
  StyleSheet,
  Text,
  View,
  Modal,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Dimensions,
  ScrollView,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useContext, useState } from "react";
import WeatherContext from "../context/currentWeather/WeatherContext";
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import { BlurView } from "expo-blur";
import { bgSelector } from "../utils/bgSelector";

const ModalWeather = ({ showModal, setShowModal }) => {
  const windowHeight = Dimensions.get("window").height;
  const { cityWeather, getCityWeather } = useContext(WeatherContext);
  const [searchTyped, setSearchTyped] = useState("");

  const bgColor = () => {
    if( cityWeather == ""){
      return "#5894DD"
    }else{
      return bgSelector(cityWeather.weather[0].main);
      
    }
  }

  return (
    <Modal
      visible={showModal}
      transparent={true}
      animationType="slide"
      statusBarTranslucent={true}
    >
      <View style={styles.modalContainer}>
        <View style={[styles.modalBody,{backgroundColor:bgColor()}]}>
          <ScrollView>
            <TouchableOpacity
              style={styles.closeBtnContainer}
              onPress={() => {
                setShowModal(false);
              }}
            >
              <Ionicons name="close-sharp" size={30} color="black" />
            </TouchableOpacity>
            <View style={{ justifyContent: "center", alignItems: "center" }}>
              <View style={styles.searchBar}>
                <TextInput
                  style={styles.textInput}
                  placeholder={"Enter the city"}
                  onChangeText={(e) => setSearchTyped(e)}
                />
                <TouchableOpacity
                  style={styles.searchBtn}
                  onPress={() => {
                    getCityWeather(searchTyped);
                  }}
                >
                  <FontAwesome name="search" size={24} color="white" />
                </TouchableOpacity>
              </View>
            </View>
            {cityWeather == "" ? (
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
              <View>
                {[cityWeather].map((item) => (
                  <View
                    style={{
                      justifyContent: "center",
                      alignItems: "center",
                      marginTop: 30,
                    }}
                  >
                    <Text style={styles.title}>{item.name}</Text>
                    <View style={styles.tempContainer}>
                      <Text style={styles.tempText}>
                        {item.main.temp.toFixed(1).slice(-1) == 0
                          ? Math.round(item.main.temp)
                          : item.main.temp.toFixed(1)}
                      </Text>
                      <Text style={styles.celsiusText}>°C</Text>
                    </View>
                    {cityWeather.weather.map((data) => (
                      <Text style={styles.descWeather}>
                        {data.description[0].toUpperCase() +
                          data.description.slice(1)}
                      </Text>
                    ))}
                  </View>
                ))}

                <View style={{ alignItems: "center", marginTop: "20%" }}>
                  {[cityWeather].map((item) => (
                    <BlurView style={styles.blurContainer} key={item.id}>
                      <View style={styles.card}>
                        <Text style={styles.mainWord}>Minimum</Text>
                        <Text style={styles.subWord}>
                          {item.main.temp_min.toFixed(1).slice(-1) == 0
                            ? Math.round(item.main.temp_min)
                            : item.main.temp_min.toFixed(1)}
                          °C
                        </Text>
                      </View>
                      <View style={styles.card}>
                        <Text style={styles.mainWord}>Maximum</Text>
                        <Text style={styles.subWord}>
                          {item.main.temp_max.toFixed(1).slice(-1) == 0
                            ? Math.round(item.main.temp_max)
                            : item.main.temp_max.toFixed(1)}
                          °C
                        </Text>
                      </View>
                      <View style={[styles.card, { marginVertical: 20 }]}>
                        <Text style={styles.mainWord}>Feels like</Text>
                        <Text style={styles.subWord}>
                          {item.main.feels_like.toFixed(1)}°C
                        </Text>
                      </View>
                      <View style={[styles.card, { marginVertical: 20 }]}>
                        <Text style={styles.mainWord}>Wind</Text>
                        <Text style={styles.subWord}>
                          {item.wind.speed.toFixed(1)} km/h
                        </Text>
                      </View>
                      <View style={styles.card}>
                        <Text style={styles.mainWord}>Humidity</Text>
                        <Text style={styles.subWord}>
                          {item.main.humidity}%
                        </Text>
                      </View>
                      <View style={styles.card}>
                        <Text style={styles.mainWord}>Pressure</Text>
                        <Text style={styles.subWord}>
                          {item.main.pressure} mbar
                        </Text>
                      </View>
                    </BlurView>
                  ))}
                </View>
              </View>
            )}
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
};

export default ModalWeather;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.4)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalBody: {
    height: "90%",
    width: "93%",
    borderRadius: 30,
  },
  closeBtnContainer: {
    width: 30,
    marginLeft: 10,
    marginTop: 10,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 20,
  },
  textInput: {
    fontSize: 18,
    width: "80%",
    height: 45,
  },
  searchBtn: {
    backgroundColor: "chocolate" /* #5894DD */,
    height: 50,
    alignItems: "center",
    justifyContent: "center",
    paddingLeft: 10,
    paddingRight: 10,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
  },
  searchBar: {
    justifyContent: "space-between",
    alignItems: "center",
    flexDirection: "row",
    width: "75%",
    height: 50,
    borderWidth: 1,
    borderColor: "rgba(128, 128, 128, 0.5)",
    paddingLeft: 10,
    borderRadius: 20,
    backgroundColor: "white",
  },
  title: {
    color: "white",
    fontSize: 40,
    textAlign:'center'
  },
  tempContainer: {
    marginTop: 30,
    flexDirection: "row",
  },
  celsiusText: {
    color: "white",
    fontWeight: "700",
    marginTop: 30,
    fontSize: 30,
  },
  tempText: {
    fontSize: 110,
    color: "white",
    fontWeight: "500",
  },
  descWeather: {
    color: "rgba(255, 255, 255, 0.83)",
    fontSize: 25,
    fontWeight: "500",
  },

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
    alignItems: "center",
  },
  blurContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    borderRadius: 20,
    width: "90%",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
});
