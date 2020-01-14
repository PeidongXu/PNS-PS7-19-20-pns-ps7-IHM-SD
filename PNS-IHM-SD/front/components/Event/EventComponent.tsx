import React, {Component} from 'react';
import {
    StyleSheet,
    Text, TouchableOpacity,
    View,

} from 'react-native';
import {Event } from '../../Models/Event';
import Countdown from "../countdown/countdown"
import About from "../About/About"
import moment from "moment"
import * as geolib from "geolib";


class EventComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            event: this.props.event,
            location: this.props.location,
            countdown:null
        }
    }
    componentDidMount() {
        this.getCountdown();
    }

    private getCountdown(){
       /* const now = new Date();
        const date = moment(this.state.event.date,'DD/MM/YYYY')
        console.log(this.state.event.date)
        console.log(date)
        const startEvent = new Date(date)
        console.log(startEvent)*/
       const date = new Date();
      /* console.log(date.toLocaleDateString())
        console.log(date.toLocaleTimeString())*/
        const now = date.toLocaleDateString() + " "+ date.toLocaleTimeString();
       // console.log(now)
        const then = this.state.event.date + " " + this.state.event.startHour;
       // console.log(then)
        const duration = moment(then,"DD/MM/YYYY HH:mm").diff(moment(now,"DD/MM/YYYY HH:mm")) / 1000
       //  console.log(duration)
        this.state.countdown = duration
      //  console.log(this.state.countdown)
        return duration
    }


    render(){
       /* console.log("distance: "+geolib.getPreciseDistance(
            { latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude },
            { latitude: this.state.event.latitude, longitude: this.state.event.longitude }
        ))*/

        const distance = geolib.getPreciseDistance(
            { latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude },
            { latitude: this.state.event.latitude, longitude: this.state.event.longitude }
        )


        return(
            <View >
                <Text>{this.state.event.title}</Text>

                <Text>{this.state.event.date}</Text>
                <Text>{this.state.event.startHour}</Text>
                <Text>{this.state.event.endHour}</Text>
                <Countdown
                countdown ={this.getCountdown()}
                />
                <Text>{distance}</Text>
                <Text>{this.state.event.description}</Text>
            </View>

        );
    }
}

export default EventComponent;
