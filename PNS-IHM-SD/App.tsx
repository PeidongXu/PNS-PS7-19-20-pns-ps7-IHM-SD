import React, { Component } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { Platform,Text, StyleSheet, View, Dimensions} from 'react-native';
import Constants from 'expo-constants';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class App extends Component {
  state = {
    location: null,
    errorMessage: null,
  };

  UNSAFE_componentWillMount() {
    if (Platform.OS === 'android' && !Constants.isDevice) {
      this.setState({
        errorMessage: 'Oops, this will not work on Sketch in an Android emulator. Try it on your device!',
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
    let myLatitude, myLongitude;
    if (this.state.errorMessage) {
      text = this.state.errorMessage;
    } else if (this.state.location) {
      text = JSON.stringify(this.state.location);
      myLatitude = this.state.location.coords.latitude;
      myLongitude = this.state.location.coords.longitude;

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
            title={'title'}
            description={"Polytech Nice Sophia la bonne école d'ingé"}
          />
        </MapView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    alignItems: 'center',
    justifyContent: 'center',
  },
  mapStyle: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height-30,
  },
  paragraph: {
    marginTop: 500,
    fontSize: 18,
    textAlign: 'center',
  }
});
