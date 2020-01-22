import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, Image, ScrollView } from 'react-native';
import Countdown from "../countdown/countdown"
import moment from "moment"
import * as geolib from "geolib";
import images from "../../assets/sites/images";
import { serverUrl } from "../../serverConfig/server.config";
import Favorites from '../Favorite/Favorite';
import MapView, { Marker } from 'react-native-maps';

class EventComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            event: this.props.event,
            location: this.props.location,
            countdown: null,
            image: this.props.event.test[0],
            imageToUse: this.props.event.test[0],
            count: "0",
            Lat: this.props.myLatitude,
            Long: this.props.myLongitude,
            ImageWhile: "false"
        };
    }

    componentDidMount() {
        this.getCountdown();
        this.changeImage();
        this.setState({ImageWhile: "true"});
    }

    /**
     * gérantion d'un delay pour les requets en millisecondes
     * 
     * @param ms 
     */
    delay(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    }

    /**
     * Run du script de détection du nombre de personne avec une requet dans le back
     */
    runScript = async () => {
        //GET request
        await fetch(serverUrl + '/api/events/detection/' + this.state.imageToUse, {
            method: 'GET'
            //Request Type
        })
            .then((response) => response.json())
            //If response is in json then in success
            .then((responseJson) => {
                //Success
                //  console.log(responseJson);
                // alert("Il y a "+ JSON.stringify(responseJson) + " personne(s) à cet event");
                this.setState({ count: JSON.stringify(responseJson).split(',')[0].split("\"")[1] })

                /*If a group has more than 5 people then --> ALERT*/
                if(parseInt(JSON.stringify(responseJson).split(',')[2],10) > 5) {
                    alert("There is a group with more than 5 people");
                }

            })
            //If response is not in json then in error
            .catch((error) => {
                //Error
                alert(JSON.stringify(error));
                console.error(error);
            });

    }

    /**
     * Update des images associées dans l'évènement 
     * Exec le scrip de comptage de personne
     */
    private async changeImage() {
        //while (this.state.ImageWhile) {
            for (const element of this.state.event.test) {
                this.setState({ imageToUse: element })
                await this.runScript();
                this.setState({ image: element })
            }
        //}
    }

    /**
     * Initalisation des variables pour la mise en place du countdown pour le temps avant les évènements
     * DEBUT
     */
    private getCountdown() {
        const date = new Date();
        const now = moment(date, "DD/MM/YYYY HH:mm")
        const then = moment(this.state.event.date + " " + this.state.event.startHour, "DD/MM/YYYY HH:mm");
        const duration = then.diff(now) / 1000
        this.state.countdown = duration
        return duration
    }
    /**
     * Initalisation des variables pour la mise en place du countdown pour le temps avant les évènements
     * FIN
     */
    private isItFinished(){
        const date = new Date();
        const now = moment(date, "DD/MM/YYYY HH:mm")
        const then = moment(this.state.event.date + " " + this.state.event.endHour, "DD/MM/YYYY HH:mm");
        const duration = then.diff(now)  / 1000
        return duration < 0
    }


    render() {
        /**
         * calcul de la distance entre nous et l'évènement
         * Si nous ne somme pas localisé la valeur par défaut est la longitude et la latitude de Polytech
         */
        const distance = geolib.getPreciseDistance(
            { latitude: this.state.Lat, longitude: this.state.Long },
            { latitude: this.state.event.latitude, longitude: this.state.event.longitude }
        );
        return (

            <ScrollView>
            <View>
                <Image style={styles.picture} source={images[this.state.image]} />
                <View style={styles.center}>
                    <Text style={styles.title}>{this.state.event.title}</Text>
                    <Favorites/>
                </View>

                <View style={styles.boxWithShadow} >
                    <Text style={styles.Size}>These are <Text style={{fontWeight: 'bold'}}>{this.state.count} persons</Text> at this event.</Text>
                    <Text style={styles.Size}>You are <Text style={{fontWeight: 'bold'}}>{distance}m</Text> from the event</Text>
                </View>
                <View style={styles.boxWithShadow}>
                    <Text style={styles.normal}>Date: <Text style={{fontWeight: 'bold'}}>{this.state.event.date}</Text> at <Text style={{fontWeight: 'bold'}}>{this.state.event.startHour}</Text> to <Text style={{fontWeight: 'bold'}}>{this.state.event.endHour}</Text></Text>
                    <Text style={[styles.center]}>{this.state.event.description}</Text>
                </View>
                <View style={styles.boxWithShadow}>
                    <Text style={styles.normal}>Starts in :  </Text>
                    <Countdown
                        countdown={this.getCountdown()}
                        finished = {this.isItFinished()}
                        inEvent = {true}
                    />
                </View>            
            </View>
            </ScrollView>
        

        );
    }
}

export default EventComponent;

const styles = StyleSheet.create({
    picture: { width: Dimensions.get('window').width, height: Dimensions.get('window').width/2 },
    center: {
        alignItems: 'center',
        alignContent: 'center',
        //color: "#fff",
        fontSize: 18,
        flex: 1
        
    },
    Size: {
        fontSize: 18,
        //color:"#fff",
    },
    InfoGuidage: {
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
        //color: "#fff"
    },
    title: {
        fontWeight: 'bold',
        fontSize: 22,
        //color: '#fff',
        marginTop:5 ,
        marginBottom: 4,
        
    },
    normal: {
        fontSize: 18,
        //color: "#fff"
    },
    boxWithShadow: {
        //backgroundColor: "#fff",
        alignItems: 'center',
        marginTop: 10,
        marginBottom: 20,
        borderWidth: 0,
        borderRadius: 1,
        borderColor: '#fff',
        borderBottomWidth: 0,
        shadowColor: '#000',
        shadowOffset: { width: 0, height: 2},
        shadowOpacity: 0.8,
        shadowRadius: 2,
        elevation: 2,
        marginLeft: 5,
        marginRight: 5,
        padding:20
    },
    mapStyle: {
        //width: Dimensions.get('window').width,
        //height: Dimensions.get('window').height-30,
        flex: 1,
        justifyContent: "center",
        height: "50%",
        width: "100%"
      },
});
