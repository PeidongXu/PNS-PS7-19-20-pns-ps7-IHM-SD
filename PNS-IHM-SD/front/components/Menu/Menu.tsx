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
   *  @param {String} time time name
   */


  getItem = (name, text, size, color, type, time) => (
    <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("MapEvent", {
            placeName: text,
            TimeData: time
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
  getItemNow = (name, text, size, color, type, time) => (
    <TouchableOpacity
        onPress={() =>
          this.props.navigation.navigate("MapEvent", {
            placeName: text,
            TimeData: time
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
          {this.getItemNow("flag", "Right Now", 70, "#00ea75", "font-awesome","rightnow")}
          {this.getItemDay("calendar", "Choose Day", 70, "#ffa54d", "font-awesome")}
          {this.getItem("flag-o", "Events Done", 40, "#66b3ff", "font-awesome", "before")}
          {this.getItem("flag-checkered", "Now", 40, "#66b3ff", "font-awesome","today")}
          {this.getItem("flag", "Not Started", 40, "#66b3ff", "font-awesome","after" )}
        </View>
      </View>
    );
  }
}
//{this.getItem("md-fitness", "Sports", 60, "#66b3ff", "ionicon")}
//{this.getItem("favorite", "Favorites", 60, "#f66", "materialicons")}

export default Menu;
