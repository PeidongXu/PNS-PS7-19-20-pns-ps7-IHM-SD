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

/**
 * Déclaration des routes avec un alias
 * Exemple:  Alias : component
 */
const DashboardContainer = createStackNavigator(
  {
    Events: Finder,
    MapView: MapScreen,
    MapEvent: MapEvent,
    SliderDay: SliderDay,
    Finder: Finder
  },
  {
    initialRouteName: "Events"
  }
);

/**
 * Création de la navigation en bas de page
 */
const bottomTab = createBottomTabNavigator(
  {
    Events: {
      screen: DashboardContainer,
      navigationOptions: {
        tabBarLabel: "Find",
        tabBarIcon: ({ focused }) => (
          <Icon
            name="filter"
            size={30}
            color={`${focused ? "#3d91e3" : "#575757"}`}
          />
        ),
      }
    },
    Finder: {
      screen: MapEvent,
      navigationOptions: ({ navigation }) => ({
        title: "Today Event",
        tabBarIcon: ({ focused }) => (
          <Icon
            name="map-marker"
            size={30}
            color={`${focused ? "#3d91e3" : "#575757"}`}
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

/**
 * Get Nom de Tab pour le Titre de la page
 */
bottomTab.navigationOptions = ({ navigation }) => {
  const { routeName } = navigation.state.routes[navigation.state.index];
  const headerTitle = routeName;
  return {
    headerTitle
  };
};

/**
 * Root Navigation
 */
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
