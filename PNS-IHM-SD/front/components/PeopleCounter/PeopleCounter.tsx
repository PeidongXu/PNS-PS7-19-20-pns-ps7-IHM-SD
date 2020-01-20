import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import axios from 'axios';
import { Button } from "react-native-elements";
import { serverUrl } from "../../serverConfig/server.config";

class PeopleCounter extends Component {

    constructor(props) {
        super(props);
        this.state = {
            event: this.props.event
        }
    }
    _onPressButton = async () => {
        //GET request
        await fetch(serverUrl + '/api/events/detection/' + this.state.event.test[0], {
            //await fetch('http://172.20.10.2:9428/api/events/detection/'+this.state.event.id, {
            method: 'GET'
            //Request Type
        })
            .then((response) => response.json())
            //If response is in json then in success
            .then((responseJson) => {
                //Success
                //  console.log(responseJson);
                alert("Il y a " + JSON.stringify(responseJson) + " personne(s) à cet event");
            })
            //If response is not in json then in error
            .catch((error) => {
                //Error
                alert(JSON.stringify(error));
                console.error(error);
            });

    }
    /*Second methode using Axios --> Also works!*/
    /*_onPressButton = () => {
        axios.get('http://192.168.43.231:9428/api/events')
            .then((response) => {
                console.log(response.data);
                console.log(response.status);
                console.log(response.statusText);
                console.log(response.headers);
                console.log(response.config);
                alert(JSON.stringify(response.data));
            });
    }*/
    render() {
        return (
            <View style={styles.view}>
                <Button
                    title="How many people ? "
                    icon={{ name: 'search' }}
                    onPress={this._onPressButton}
                />
            </View>
        )
    }
}
export default PeopleCounter;

const styles = StyleSheet.create({

    view: {
        margin: 20,
    }
})
