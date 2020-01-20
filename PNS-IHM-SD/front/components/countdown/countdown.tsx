import React, { Component } from 'react'
import CountDown from 'react-native-countdown-component';
import { View } from 'native-base';

/**
 * Compte a rebour pour le temps avant les évènements
 * Page EventComponent
 */
class Countdown extends Component {
    constructor(props) {
        super(props);
        this.state = {
            countdown: this.props.countdown

        }
    }
    render() {
        return (

            <View>
                <CountDown
                    until={this.state.countdown}
                    //onFinish={() => alert('already started')}
                    size={20}
                    timeToShow={['D', 'H', 'M']}
                //timeLabels={{d:'DD', h:"HH", m: 'MM'}}
                //showSeparator ="fasle"
                //digitStyle= {{backgroundColor: 'none'}}
                //digitTxtStyle= {{color: "white"}}
                />
            </View>
        );
    }
}

export default Countdown;
