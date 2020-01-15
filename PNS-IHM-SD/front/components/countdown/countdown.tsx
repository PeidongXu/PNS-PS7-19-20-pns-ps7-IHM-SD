import React, { Component } from 'react'
import CountDown from 'react-native-countdown-component';
import { View } from 'native-base';

class Countdown extends Component {
    constructor(props){
        super(props);
        this.state = {
            countdown:this.props.countdown
        }
    }


    render() {
        return (

        <View>
            <CountDown
                until={this.state.countdown}
                onFinish={() => alert('already started')}
                size={20}
            />
        </View>
        );
    }
}

export default Countdown;
