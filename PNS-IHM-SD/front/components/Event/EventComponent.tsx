import React, {Component} from 'react';
import {
    StyleSheet,
    Text, TouchableOpacity,
    View,

} from 'react-native';
import {Event } from '../../Models/Event';


class EventComponent extends Component{
    constructor(props){
        super(props);
        this.state = {
            viewSection :false,
            event: this.props.event
        }
    }

    render(){
        return(
            <View >
                <Text>{this.state.event.title}</Text>
                <Text>{this.state.event.date}</Text>
                <Text>{this.state.event.startHour}</Text>
                <Text>{this.state.event.endHour}</Text>
                <Text>{this.state.event.description}</Text>
            </View>

        );
    }
}

export default EventComponent;
