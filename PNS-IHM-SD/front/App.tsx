import React from 'react';
import MapScreen from "./components/Map/Map";
import EventsList from "./components/EventsList/EventsList";
import {StyleSheet, View} from "react-native";


 export default function App() {
  return (
      <View style={styles.container}>
          <MapScreen/>
          <EventsList style={styles.EventsList} />
      </View>
  )

}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  EventsList: {
    flex: 1,
    justifyContent: "center"
  }
});
