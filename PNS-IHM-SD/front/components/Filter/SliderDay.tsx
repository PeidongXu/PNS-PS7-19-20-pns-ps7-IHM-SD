import React, {Component} from 'react';
import {Text, View,TouchableOpacity, Alert } from 'react-native';
import { StyleSheet } from "react-native";
import {CustomSlider} from "./CustomSlider"


class SliderDay extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          singleSliderValues: [],
          multiSliderValues: [],
          
        }
    }

    singleSliderValueCallback =(values)=> {
      this.setState({singleSliderValues : values})
    }
    multiSliderValueCallback = (values) => {
      this.setState({multiSliderValues : values})
    }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.textStyle}>Today's events selection</Text>
            <CustomSlider
                min={1}
                max={3}
                LRpadding={25}
                callback={this.singleSliderValueCallback}
                single={true}
            />
            <Text>bite{this.state.value}</Text>
      </View>
    );
  }
}
export default SliderDay;

const FONT_SIZE = 24;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    textAlign: "center",
    marginTop: 20,
  },
  textStyle: {
    fontSize: FONT_SIZE,
    fontWeight: "bold",
    paddingBottom: 50
  }
});