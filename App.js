
import React from 'react';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";

import HomeScreen from "./src/screens/HomeScreen";
import ProfileScreen from "./src/screens/ProfileScreen";
import WelcomeScreen from "./src/screens/WelcomeScreen"

const MainNavigator = createStackNavigator({
  Welcome: { screen: WelcomeScreen },
  Home: { screen: HomeScreen },
  Profile: { screen: ProfileScreen }
},
{
  initialRouteName: "Welcome",
  defaultNavigationOptions: {
    headerStyle: {
      backgroundColor: "#FF6C69"
    },
    headerTitleStyle: {
      fontWeight: "bold",
      color: "white"
    },
    headerTintColor: "white"
  }
}
);

const App = createAppContainer(MainNavigator);

export default App;
