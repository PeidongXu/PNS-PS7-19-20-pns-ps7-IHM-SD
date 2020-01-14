import React from 'react';
import MapScreen from "./components/Map/Map";
import EventsList from "./components/EventsList/EventsList";
import {StyleSheet, View} from "react-native";
import Navigator from "./components/Navigation/Navigation"


 export default function App() {
  return (
      <View style={styles.container}>
        <Navigator/>
      </View>
  )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  }
});