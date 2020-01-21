import React, { Component } from 'react'
import CountDown from 'react-native-countdown-component';
import { View, Text } from 'native-base';
import moment from "moment";

/**
 * Compte a rebour pour le temps avant les évènements
 * Page EventList
 */
class CountdownList extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countdown: this.props.countdown,
            finished : this.props.finished

        }
    }

    renderCountdown(){
        if(this.state.countdown < 0){
            return this.state.finished? <Text>Already Finished</Text> : <Text>In Progress</Text>;
        }else if(this.state.countdown > 0){
            let timetoshow = ['D', 'H', 'M']
            if(this.state.countdown < 86400){
                timetoshow = ['H', 'M']
            }
            return <CountDown
                until={this.state.countdown}
               // onFinish={() => alert('already started')}
                size={13}
                timeToShow={timetoshow}
                //timeLabels={{d:'DD', h:"HH", m: 'MM'}}
                //showSeparator ="fasle"
                digitStyle={{ backgroundColor: 'none' }}
                digitTxtStyle={{ color: "white" }}
                timeLabelStyle={{ color: "white" }}

            /> ;
        }
    }


    render() {
        return (

            <View>
                {this.renderCountdown()}
            </View>
        );
    }
}

export default CountdownList;
