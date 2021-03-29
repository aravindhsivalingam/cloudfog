import * as React from "react";
import { Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { FontAwesome, Feather, Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MersennerTwister from "./src/screens/MersennerTwister/MersennerTwister";
import LCG from "./src/screens/LCG/LCG";
import { BatteryScreen } from "./src/screens/Battery/Battery";
import LocationScreen from "./src/screens/Location/Location";

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ focused, color, size }) => {
            switch (route.name) {
              case "MersennerTwister":
                return (
                  <FontAwesome name={"maxcdn"} size={size} color={color} />
                );
              case "Lcg":
                return (
                  <FontAwesome name={"bar-chart-o"} size={size} color={color} />
                );
              case "Battery":
                return (
                  <Feather name="battery-charging" size={size} color={color} />
                );
              case "Location":
                return (
                  <Ionicons
                    name="md-location-outline"
                    size={size}
                    color={color}
                  />
                );
            }
            return;
          },
        })}
        tabBarOptions={{
          activeTintColor: "tomato",
          inactiveTintColor: "gray",
        }}
      >
        <Tab.Screen name="MersennerTwister" component={MersennerTwister} />
        <Tab.Screen name="Lcg" component={LCG} />
        <Tab.Screen name="Battery" component={BatteryScreen} />
        <Tab.Screen name="Location" component={LocationScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
