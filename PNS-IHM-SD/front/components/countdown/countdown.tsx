import React, { Component } from 'react'
import CountDown from 'react-native-countdown-component';
import { View } from 'native-base';

class Countdown extends Component {
    render() {
        return (
        <View>
            <CountDown 
                until={10}
                onFinish={() => alert('finished')}
                onPress={() => alert('hello')}
                size={20}
            />
        </View>
        );
    }
}

export default Countdown;