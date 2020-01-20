import React from "react";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import { createStackNavigator } from "react-navigation-stack";
import Ionicons from "react-native-vector-icons/Ionicons";
import Icon from "react-native-vector-icons/FontAwesome";
import Finder from "../../components/Finder/Finder";
//import ProfileScreen from "../../components/Profile/Profile";
import MapScreen from "../../components/Map/Map";
import MapEvent from "../../components/Map/MapEvent"
import SliderDay from "../Filter/SliderDay"
//Screen in the Home tab
const DashboardContainer = createStackNavigator(
  {
    Home: Finder,
    MapView: MapScreen,
    MapEvent: MapEvent,
    SliderDay: SliderDay
  },
  {
    initialRouteName: "Home"
  }
);
//The Main Tab =>Home - Profile  add more tabs here..
const bottomTab = createBottomTabNavigator(
  {
    Home: {
      screen: DashboardContainer,
      navigationOptions: {
        tabBarLabel: "Find",
        tabBarIcon: ({ focused }) => (
          <Icon
            name="filter"
            size={30}
            color={`${focused ? "#e90000" : "#575757"}`}
          />
        ),
      }
    },
    Map: {
      screen: MapScreen,
      navigationOptions: ({ navigation }) => ({
        title: "Map",
        tabBarIcon: ({ focused }) => (
          <Icon
            name="map-marker"
            size={30}
            color={`${focused ? "#e90000" : "#575757"}`}
          />
        )
      })
    },
  },
  {
    navigationOptions: {
      tabBarOptions: {
        activeTintColor: "#e90000",
        inactiveTintColor: "#575757",
        style: {
          backgroundColor: "#f2f2f2",
          height: 60
        }
      }
    }
  }
);
//Getting the tab header title
bottomTab.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  const headerTitle = routeName;
  return {
    headerTitle
  };
};

//Root navigator
const AppNavigator = createStackNavigator(
  {
    Home: bottomTab
  },
  {
    initialRouteName: "Home",
    headerMode: "none"
  }
);
export default createAppContainer(AppNavigator);
