import React, { Component } from "react";
import {View, StyleSheet} from 'react-native';
import MapScreen from "./Map"
import EventsList from "../EventsList/EventsList"

class MapEvent extends Component {
  static navigationOptions = props => {
    const placeName = props.navigation.getParam("placeName");
   return { headerTitle: placeName };
  };
    render() {
      const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <MapScreen navigation={navigation}/>
                <EventsList navigation={navigation}/>
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
