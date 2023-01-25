import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import WeatherState from "./src/context/currentWeather/WeatherState";

/* screens */
import Home from "./src/views/Home";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <WeatherState>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </WeatherState>
  );
}
