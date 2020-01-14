import React, {Component} from 'react';
import {Text, View,TouchableOpacity, Alert } from 'react-native';
import { StyleSheet } from "react-native";
import {CustomSlider} from "./CustomSlider"
import { Button } from "react-native-elements";

class SliderDay extends Component {
    constructor(props) {
        super(props);
        this.state = { 
          singleSliderValues: [],
          multiSliderValues: [],
          value: 1
        }
    }

    singleSliderValueCallback =(values)=> {
      this.setState({singleSliderValues : values})
    }
    multiSliderValueCallback = (values) => {
      this.setState({multiSliderValues : values})
    }

    getItem = (value) => (
        <Button
          title="Search"
          icon={{name:'search'}}
          onPress={() => this.props.navigation.navigate("MapEvent", {
            sliderValue: value
          })}
        />
    );

  render() {
    console.log(this.state.singleSliderValues[0])
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
            {this.getItem(this.state.value)}
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