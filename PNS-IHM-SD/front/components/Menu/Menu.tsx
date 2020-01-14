import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import styles from "./style";
import MapEvent from "../Map/MapEvent"

class Menu extends Component {
  /**
   *  @param {String} name Icon name
   *  @param {String} text place name
   *  @param {Number} size Icon size
   *  @param {String} color Icon color
   *  @param {String} type Icon type
   */


  getItem = (name, text, size, color, type) => (
    <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("MapView", {
            placeName: text
          })
        }
      >
      <View style={styles.iconStyle}>
        <Icon
          name={name}
          size={size}
          reverse
          color={color}
          type={type}
          raised
        />
        <Text style={styles.textStyle}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
  getItemNow = (name, text, size, color, type) => (
    <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("MapEvent", {
            placeName: text
          })
        }
      >
      <View style={styles.iconStyle}>
        <Icon
          name={name}
          size={size}
          reverse
          color={color}
          type={type}
          raised
        />
        <Text style={styles.textStyle}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
  getItemDay = (name, text, size, color, type) => (
    <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("SliderDay", {
            placeName: text
          })
        }
      >
      <View style={styles.iconStyle}>
        <Icon
          name={name}
          size={size}
          reverse
          color={color}
          type={type}
          raised
        />
        <Text style={styles.textStyle}>{text}</Text>
      </View>
    </TouchableOpacity>
  );
  
  
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.iconContainer}>
          {this.getItemNow("flag", "Right Now", 60, "#00ea75", "font-awesome")}
          {this.getItemDay("calendar", "Today", 60, "#ffa54d", "font-awesome")}
          {this.getItem("md-fitness", "Sports", 60, "#66b3ff", "ionicon")}
          {this.getItem("favorite", "Favorites", 60, "#f66", "materialicons")}
        </View>
      </View>
    );
  }
}


export default Menu;
