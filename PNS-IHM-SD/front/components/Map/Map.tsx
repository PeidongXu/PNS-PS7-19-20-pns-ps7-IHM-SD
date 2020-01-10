import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Platform, View} from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

import styles from "./Style";


class MapScreen extends Component { 
  state = {
    location: null,
    errorMessage: null,
  };
  
  componentDidMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'This will not work on emulator. Try it on your device!',
      });
    } else {
      this._getLocationAsync();
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
  

  render() {  
    let text = 'Waiting..';
    this.props.children
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
      const myLatitude = this.state.location.coords.latitude;
      const myLongitude = this.state.location.coords.longitude;

    }
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
  
          <Marker  
            coordinate={{ latitude: 43.615692, longitude: 7.071778 }}  
            title={"Polytech Nice Sophia"}  
            description={"Polytech Nice Sophia la bonne école d'ingé"}  
          />  
        </MapView>  
          
      </View>  
    );  
  }  
}  


export default MapScreen;
