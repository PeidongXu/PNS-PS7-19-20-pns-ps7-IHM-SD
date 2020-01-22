import React, { Component } from 'react'
import CountDown from 'react-native-countdown-component';
import { View, Text } from 'native-base';
import moment from "moment";

/**
 * Compte a rebour pour le temps avant les évènements
 * Page EventList
 */
class Countdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countdown: this.props.countdown,
            finished : this.props.finished,
            inEvent: this.props.inEvent
        }
    }

    renderCountdown(){
        if(this.state.countdown < 0){
            if(!this.state.inEvent) {
                return this.state.finished? <Text style={{color:"#fff"}}>Already Finished</Text> : <Text style={{color:"#fff"}}>In Progress</Text>;
            }else {
                return this.state.finished? <Text style={{color:"#000",  fontWeight: 'bold', fontSize: 18, marginTop: 5, marginBottom: 20}}>Already Finished</Text> : <Text style={{color:"#000",  fontWeight: 'bold', fontSize: 18, marginTop: 5, marginBottom: 20}}>In Progress</Text>;
            }
                
        }else if(this.state.countdown > 0){
            let timetoshow = ['D', 'H', 'M']
            if(this.state.countdown < 86400){
                timetoshow = ['H', 'M']
            }
            if(this.state.countdown < 3600){
                timetoshow = ['M', 'S']
            }
            console.log(this.state.countdown)
            
            if(!this.state.inEvent) {
                return <CountDown
                until={this.state.countdown}
                size={13}
                timeToShow={timetoshow}
                digitStyle={{ backgroundColor: 'none' }}
                digitTxtStyle={{ color: "white" }}
                timeLabelStyle={{ color: "white" }}
            /> ;

            }else {
                return <CountDown
                until={this.state.countdown}
                size={20}
                timeToShow={timetoshow}
                digitStyle={{ backgroundColor: '#29e386' }}
            /> ;
            }

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

export default Countdown;
