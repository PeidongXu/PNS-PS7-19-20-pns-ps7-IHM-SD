import React from 'react'
import { StyleSheet, Text, View, Button } from 'react-native'
import axios from 'axios';

export default class About extends React.Component{
    _onPressButton = async () => {
        //GET request
        await fetch('http://192.168.43.231:9428/api/events/testing', {
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
            <View  style={styles.view}>
                <Text style={styles.title}>
                    A propos de Polympic !
                </Text>

                <Text style={styles.desc}>
                    Polympic est une application smartphone comportant une carte interactive avec des marqueurs
                    d’événement sportif en temps réel. Elle comportera un filtrage des événements en fonction de
                    différent critère temporel, sportif, lieux, … On pourra retrouver un espace pour les utilisateurs
                    lambda ainsi qu’une page d’administration regroupant toutes les informations sur les événements
                    sportifs ou humain. On pourra notamment y voir les caméras de surveillant (ou photo d’un moment
                    donné) avec une détection des personnes, de problème (Par exemple : colis abandonnés).
                </Text>
                <Button
                    onPress={this._onPressButton}
                    title="Press Me"
                    color="#841584"
                />
                <Text style={styles.footer}>
                    Smith, Rayan, Aldric, Peidong...
                </Text>
            </View>
        )

    }
}

const styles = StyleSheet.create({
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
