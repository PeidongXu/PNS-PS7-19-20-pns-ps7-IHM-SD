import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";

class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: true
    };
  }

  ToggleFunction = () => {
    this.setState(state => ({
      toggle: !state.toggle
    }));
    //requet push 
  };

  render() {
    return (
      <View>
        <TouchableOpacity onPress={() => this.ToggleFunction()}>
            {this.state.toggle ?
            <Icon
                name='heart-o'
                type='font-awesome'
                color='#f66'
              />
              :
              <Icon
              name='heart'
              type='font-awesome'
              color='#f66'
            />
                }
        </TouchableOpacity>
      </View>
    );
  }
}
export default Favorites;