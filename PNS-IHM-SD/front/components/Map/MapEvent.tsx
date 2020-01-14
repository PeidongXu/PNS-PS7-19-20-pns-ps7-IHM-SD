import React, { Component } from "react";
import {View, StyleSheet} from 'react-native';
import MapScreen from "./Map"
import EventsList from "../EventsList/EventsList"
import axios from "axios";
import {Event} from "../../Models/Event";

class MapEvent extends Component {

    /*state = {

    };

    constructor(props) {
        super(props);
    }


    componentDidMount() {
        this.getEvents();
    }
    private URL = 'http://172.20.10.2:9428/api/events';
    //private URL = 'http://192.168.1.78:9428/api/events';
    //private URL = 'http://localhost:9428/api/events';


    private getEvents = async () => {
        axios.get<Event[]>(this.URL).then(res => {
            this.setState({events: res.data});
        });
    };
*/


  static navigationOptions = props => {
    const placeName = props.navigation.getParam("placeName");
   return { headerTitle: placeName };
  };
    render() {
      const { navigation } = this.props;
        return (
            <View style={styles.container}>
                <MapScreen navigation={navigation}/>
                <EventsList navigation={navigation}/>
            </View>
        );
    }
}

export default MapEvent;

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center"
    },
    EventsList: {
      flex: 1,
      justifyContent: "center"
    }
  });
