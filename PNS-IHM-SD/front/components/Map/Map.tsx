import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import * as geolib from 'geolib';
import { Platform, View, Dimensions, Text} from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import styles from "./Style";
import axios from "axios";
import {Event} from "../../Models/Event";

const GOOGLE_MAPS_APIKEY = 'AIzaSyCYHUOtzZvpFD2nUeElqeVQ-Jp46KNGvyY';

class MapScreen extends Component {
  static navigationOptions = props => {
    const TimeData = props.navigation.getParam("TimeData");
   return { TimeData };
  };
  constructor(props) {
    super(props);
    this.state = {
      location: null,
      errorMessage: null,
      events:[],
  };
}

  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'This will not work on emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
      this.getEvents();
    }

  }
  _getLocationAsync = async () => {
    let { status } = await Permissions.askAsync(Permissions.LOCATION);
    if (status !== 'granted') {
      this.setState({
        errorMessage: 'Permission to access location was denied',
      });
    }
    let location = await Location.getCurrentPositionAsync({});
    this.setState({ location });
  };

  private URLGeneration () {
    if(this.props.navigation.getParam("TimeData")) {
      return 'http://172.20.10.2:9428/api/events/' + this.props.navigation.getParam("TimeData");
    }else{
      return 'http://172.20.10.2:9428/api/events'
    }

  }

  private URL = this.URLGeneration();
  //private URL = 'http://192.168.1.78:9428/api/events';
  //private URL = 'http://localhost:9428/api/events';


  private getEvents = async () => {
   // console.log(this.URL)
    axios.get<Event[]>(this.URL).then(res => {
      this.setState({events: res.data});
    });
  };


  render() {
    let text = 'Waiting..';
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
      const myLatitude = this.state.location.coords.latitude;
      const myLongitude = this.state.location.coords.longitude;
    }
   /* console.log("distance: "+geolib.getPreciseDistance(
      { latitude: 43.615560, longitude: 7.071767 },
      { latitude: 43.617323, longitude: 7.074716 }
  ))*/
    return (
      <View style={styles.container}>
        <MapView  style={styles.mapStyle}
          showsUserLocation={true}
          zoomEnabled={true}
          zoomControlEnabled={false}
          initialRegion={{
            latitude: 43.615692,
            longitude: 7.071778,
            latitudeDelta: 0.03,
            longitudeDelta: 0.01,
          }}>

          {this.state.events.map(event => (
              <Marker
                  coordinate={{ latitude: event.latitude, longitude: event.longitude }}
                  title={event.title}
                  description={event.description}
              />
          ))}
        </MapView>
      </View>
    );
  }
}

export default MapScreen;
