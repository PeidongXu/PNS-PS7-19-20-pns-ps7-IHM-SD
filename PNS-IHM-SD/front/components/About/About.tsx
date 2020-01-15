import React, {Component} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import axios from 'axios';
import { Button } from "react-native-elements";
import {serverUrl} from "../../serverConfig/server.config";

class About extends Component{
    _onPressButton = async () => {
        //GET request
        await fetch(serverUrl+'/api/events/testing', {
            method: 'GET'
            //Request Type
        })
            .then((response) => response.json())
            //If response is in json then in success
            .then((responseJson) => {
                //Success
                console.log(responseJson);
                alert(JSON.stringify(responseJson));
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
    render(){
        return(
            <View  style={styles.container}>
            <Button
                title="How many people ? "
                icon={{name:'search'}}
                onPress={this._onPressButton}
            />
            </View>
        )

    }
}
export default About;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
    },
    view:{
        flex: 1,
        marginTop: 25,
        alignItems: 'center',
        marginHorizontal: 8,
        marginVertical: 10
    },
    title: {
        fontSize:22,
        marginTop: 5,
        marginBottom: 15
    },
    desc:{
    },
    footer: {
        flex: 1,
        justifyContent: 'flex-end',
        marginBottom: 36,
        position: 'absolute',
        bottom:0
    }
})
