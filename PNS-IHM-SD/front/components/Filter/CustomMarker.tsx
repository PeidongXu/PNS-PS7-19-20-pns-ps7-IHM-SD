import React, {Component} from 'react';
import { StyleSheet, View, Image } from 'react-native';

export class CustomMarker extends Component {
  render() {
    return (
        <Image
        style={styles.image}
        source={require('../../assets/slider-button.png')}
        resizeMode="contain"
      />
    );
  }
}

const styles = StyleSheet.create({
    image:{
        width:25, height:25
    }
});