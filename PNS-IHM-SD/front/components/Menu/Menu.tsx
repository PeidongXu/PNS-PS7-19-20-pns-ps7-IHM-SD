import React, { Component } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import styles from "./style";
import { Divider } from 'react-native-elements';

class Menu extends Component {
  /**
   *
   * Génération d'un bouton dans le Menu
   * Redirection vers la page MapEvent
   *
   *  @param {String} name Nom Icon
   *  @param {String} text information sur le bouton
   *  @param {Number} size Icon size
   *  @param {String} color Icon color
   *  @param {String} type Icon type
   *  @param {String} time Key request
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

  /**
   *
   * Génération d'un bouton dans le Menu
   * Redirection vers la page SliderDay (sélection des èvents du jour)
   *
   *  @param {String} name Nom Icon
   *  @param {String} text information sur le bouton
   *  @param {Number} size Icon size
   *  @param {String} color Icon color
   *  @param {String} type Icon type
   */
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
          {this.getItem("flag-o", "Past Days", 40, "#F44336", "font-awesome", "before")}
          {this.getItem("favorite", "Favorites", 40, "#f66", "materialicons", "favorites")}
          {this.getItem("flag", "Futur Days", 40, "#10a158", "font-awesome", "after")}
        </View>
      </View>
    );
  }
}
//{this.getItem("flag-checkered", "Today Events", 70, "#3d91e3", "font-awesome","today")}
//{this.getItem("flag", "Right Now", 40, "#66b3ff", "font-awesome","rightnow")}

//{this.getItemDay("calendar", "Choose Day", 70, "#ffa54d", "font-awesome")}
//{this.getItem("md-fitness", "Sports", 60, "#66b3ff", "ionicon")}
//{this.getItem("flag-checkered", "Now", 40, "#66b3ff", "font-awesome","today")}


export default Menu;
