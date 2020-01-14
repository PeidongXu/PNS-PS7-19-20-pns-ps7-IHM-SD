import React, { Component } from "react";
import {View, StyleSheet} from 'react-native';
import MapScreen from "./Map"
import EventsList from "../EventsList/EventsList"

class MapEvent extends Component {
    render() {
        return (
            <View style={styles.container}>
                <MapScreen/>
                <EventsList/>
            </View>
        );
    }
}

export default MapEvent;

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
