import React, { Component } from 'react';
import { serverUrl } from '../../serverConfig/server.config';
import { StyleSheet, Text, View, SafeAreaView, Modal, ScrollView, Platform, TouchableOpacity, Image, TouchableHighlight, TouchableNativeFeedback, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SwipeListView } from 'react-native-swipe-list-view';
import Constants from 'expo-constants';
import { Event } from '../../Models/Event';
//import axios from "axios";
import axios from  'axios-observable';
import EventComponent from "../Event/EventComponent";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import images from "../../assets/sites/images";
import * as geolib from "geolib";

import { LinearGradient } from 'expo-linear-gradient';
import Countdown from '../countdown/countdown'
import moment from "moment";
import Favorites from '../Favorite/Favorite';
import MapView, { Marker } from 'react-native-maps';
import { Button } from "react-native-elements";

class EventsList extends Component{
    static navigationOptions = props => {
        const TimeData = props.navigation.getParam("TimeData");
        return { TimeData };
    };
    state = {
        load: "false",
        events: [],
        modalVisible: false,
        event: null,
        location: null,
        errorMessage: null,
        myLatitude: 43.615692,
        myLongitude: 7.071778,
        duration: null,
        eventLatitude: 43.615692,
        eventLongitude: 7.071778,
    };

    constructor(props) {
        super(props);
    }


    componentDidMount() {
        if (Platform.OS === 'android' && !Constants.isDevice) {
            this.setState({
                errorMessage: 'This will not work on emulator. Try it on your device!',
            });
        } else {
            this._getLocationAsync();
            this.getEvents();
        }
    }

    private URLGeneration() {
        if (this.props.navigation.getParam("TimeData")) {
            return serverUrl + '/api/events/' + this.props.navigation.getParam("TimeData");
        } else {
            return serverUrl + '/api/events/today'
        }

    }

    private URL = this.URLGeneration();

    private getEvents = async () => {
        axios.get<Event[]>(this.URL).subscribe(res => {
            this.setState({ load: "true" });
            this.setState({ events: res.data });
        });
    };

    _getLocationAsync = async () => {
        let { status } = await Permissions.askAsync(Permissions.LOCATION);
        if (status !== 'granted') {
            this.setState({
                errorMessage: 'Permission to access location was denied',
            });
        }
        let location = await Location.getCurrentPositionAsync({});
        this.setState({ location });
        this.setState({myLatitude : location.coords.latitude})
        this.setState({myLongitude : location.coords.longitude})
    };
    /**
     * Calcul de temps de déplacement vers un event
     */
    private getTimesDistance(event) {
        const distance = geolib.getPreciseDistance(
            { latitude: this.state.myLatitude, longitude: this.state.myLongitude },
            { latitude: event.latitude, longitude: event.longitude }
        );
        return distance/(5/3.6)

    }
    /**
     * Génération graphique et textuel d'un item de la List des évnènements
     * @param item
     */
    renderItem = ({ item }) => {
        let color=['#FF9800', '#F44336']; //rouge
        if(!this.isItFinished(item) && this.getCountdown(item)<0){
            color=['#66b3ff', '#3d91e3'] //bleu
        }else if(this.getCountdown(item)>0){
            color=['#29e386' , '#10a158'] //vert
            if(this.getCountdown(item)<this.getTimesDistance(item))
            color=['#66b3ff' , '#10a158'] //Bleu - +++vert
        }
        return (
            <View>
                <TouchableHighlight onPress={() => this.openModal(item)}>
                    <LinearGradient
                        colors={color}
                        style={{ flex: 1 }}
                        start={{ x: 0, y: 1 }}
                        end={{ x: 1, y: 0 }}
                    >
                        <View style={styles.row}>
                            <View>
                                <Image style={styles.picture} source={images[item.image]} />
                            </View>
                            <View>
                                <Text style={styles.primaryText}>{item.title}</Text>
                                <Text style={styles.secondaryText}>{item.date + " " + item.startHour}</Text>
                                <Text style={styles.secondaryText}></Text>
                            </View>
                            <View style={styles.countdownAlign}>
                                <Countdown
                                countdown={this.getCountdown(item)}
                                finished = {this.isItFinished(item)}
                                inEvent = {false}/>
                            </View>
                            <View style={styles.chevronContainer}>

                                <Icon name="chevron-right" style={styles.Icon} />
                            </View>
                        </View>

                    </LinearGradient>
                </TouchableHighlight >
                <View style={{ height: 1, width: "100%", backgroundColor: "#CED0CE",}}/>
            </View>
        );
    };
    /**
     * Initalisation des variables pour la mise en place du countdown pour le temps avant les évènements
     * DEBUT
     */
    private getCountdown(event) {
        const date = new Date();
        const now = moment(date, "DD/MM/YYYY HH:mm")
        const then = moment(event.date + " " + event.startHour, "DD/MM/YYYY HH:mm");
        const duration = then.diff(now) / 1000
        return duration
    }
    /**
     * Initalisation des variables pour la mise en place du countdown pour le temps avant les évènements
     * FIN
     */
    private isItFinished(event){
        const date = new Date();
        const now = moment(date, "DD/MM/YYYY HH:mm")
        const then = moment(event.date + " " + event.endHour, "DD/MM/YYYY HH:mm");
        const duration = then.diff(now)  / 1000
        return duration < 0
    }

    openModal(event: Event) {
        this.setState({ modalVisible: true });
        this.setState({ event: event });
        this.setState({eventLatitude : event.latitude});
        this.setState({eventLongitude : event.longitude});
    }
    closeModal() {
        this.setState({ modalVisible: false });
    }


     _renderSection = ({ section }) => (
        <LinearGradient
            colors= {['#fff', '#e4e4e4']}
            style={{ flex: 1 }}
            start={{ x: 0, y: 1 }}
            end={{ x: 1, y: 0 }}
        >
            <View style={{ padding: 8}}>
                <Text style={{ color: '#000', fontWeight: "bold" }}>{section.title.toUpperCase()}</Text>
            </View>
            <View style={{ height: 1, width: "100%", backgroundColor: "#CED0CE",}}/>
        </LinearGradient>
      )

    render() {
        /* const myLatitude = this.state.location.coords.latitude;
         const myLongitude = this.state.location.coords.longitude;*/
        // console.log(this.state.errorMessage)

        return (
            <SafeAreaView style={styles.container}>
                <Modal
                    animationType={"slide"}
                    visible={this.state.modalVisible}
                    onTouchOutside={() => {
                        this.closeModal();
                    }}
                >

                    <View style={styles.innerContainer}>
                        <EventComponent
                            event={this.state.event}
                            location={this.state.location}
                            myLatitude ={this.state.myLatitude}
                            myLongitude ={this.state.myLongitude}
                        />
                        <View style={{
                                position: 'absolute',
                                left: 0,
                               right: 0,
                                //top: 0,
                                bottom: 0
                            }}>
                        <Button
                        raised
                        type="solid"
                            icon={
                                <Icon
                                  name="arrow-left"
                                  size={20}
                                  color="white"
                                />
                              }
                            onPress={() => this.closeModal()}
                            title= " close"

                        >
                        </Button>
                        </View>
                    </View>
                    <View style={styles.container}>
                        <MapView style={styles.mapStyle}
                            showsUserLocation={true}
                            zoomEnabled={true}
                            zoomControlEnabled={false}
                            scrollEnabled = {false}
                            initialRegion={{
                                latitude: 43.615692,
                                longitude: 7.071778,
                                latitudeDelta: 0.03,
                                longitudeDelta: 0.01,
                            }}>

                        <Marker
                           coordinate={{ latitude: this.state.eventLatitude, longitude: this.state.eventLongitude }}
                        />

                        </MapView>
                    </View>

                </Modal>
                <SwipeListView
                    useSectionList
                    sections={this.state.events}
                    //data={this.state.events}
                    renderItem={this.renderItem}
                    renderHiddenItem={ (rowData, rowMap) => (
                        <View style={styles.rowBack}>
                            <TouchableOpacity/>
                            <View style={styles.favorites}>
                                <Favorites
                                    event ={rowData.item}/>
                            </View>
                        </View>
                    )}
                    renderSectionHeader={this._renderSection}
                    rightOpenValue={-80}
                    closeOnScroll={true}
                />

            </SafeAreaView>
        );
    }

}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: "#fff"
    },
    innerContainer: {
        height: Dimensions.get('window').height-Dimensions.get('window').height/4,
        alignItems: 'center',
        //backgroundColor: '#2f2c3c', // sombre
        backgroundColor: "#fff"
    },
    item: {
        backgroundColor: '#f9c2ff',
        padding: 20,
        marginVertical: 8,
    },
    header: {
        fontSize: 32,
    },
    title: {
        fontSize: 24,
    },
    row: { flexDirection: 'row', alignItems: 'center', padding: 12 },
    picture: { width: 50, height: 50, borderRadius: 25, marginRight: 18 },
    primaryText: {
        fontWeight: 'bold',
        fontSize: 14,
        color: 'white',
        marginBottom: 4,
    },
    secondaryText: { color: 'white' },

    countdownAlign: {
        width: 150,
        alignItems: "center"
    },
    chevronContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    Icon: {
        color: "white",
        fontSize: 12,
        marginRight: -20
    },
    rowBack: {
        alignItems: 'center',
        backgroundColor: '#DDD',
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingLeft: 15,
    },
    favorites: {
        marginRight : 25,
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
export default EventsList;
