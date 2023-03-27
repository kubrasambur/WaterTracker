import { StyleSheet } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import MainPage from "./src/pages/MainPage";
import DailyRecords from "./src/pages/DailyRecords";
import { NativeBaseProvider } from "native-base";
import { Ionicons, MaterialCommunityIcons } from "react-native-vector-icons";
import Reminders from "./src/pages/Reminders";
import { store } from "./src/redux/store";
import { Provider } from "react-redux";
import { useEffect } from "react";
import { GetData } from "./src/helper/AsyncStorage";

const Tab = createBottomTabNavigator();

export default function App() {
  useEffect(() => {
    GetData();
  }, []);
  return (
    <Provider store={store}>
      <NativeBaseProvider>
        <NavigationContainer>
          <Tab.Navigator
            initialRouteName="Home"
            screenOptions={({ route }) => ({
              tabBarIcon: ({ focused, color, size }) => {
                let iconName;

                if (route.name === "Home") {
                  iconName = focused ? "ios-home" : "home-outline";
                  return <Ionicons name={iconName} size={size} color={color} />;
                } else if (route.name === "DailyRecords") {
                  iconName = focused ? "water-check" : "water-check-outline";
                  return (
                    <MaterialCommunityIcons
                      name={iconName}
                      size={size}
                      color={color}
                    />
                  );
                } else if (route.name === "Reminders") {
                  iconName = focused
                    ? "notifications-sharp"
                    : "notifications-outline";
                  return <Ionicons name={iconName} size={size} color={color} />;
                }

                // You can return any component that you like here!
              },
              tabBarActiveTintColor: "tomato",
              tabBarInactiveTintColor: "gray",
            })}
          >
            <Tab.Screen name="Home" component={MainPage} />
            <Tab.Screen name="DailyRecords" component={DailyRecords} />
            <Tab.Screen name="Reminders" component={Reminders} />
          </Tab.Navigator>
        </NavigationContainer>
      </NativeBaseProvider>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
});
