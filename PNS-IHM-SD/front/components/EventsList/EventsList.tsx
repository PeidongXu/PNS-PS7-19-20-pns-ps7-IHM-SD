import React, { Component } from 'react';
import { serverUrl } from '../../serverConfig/server.config';
import { StyleSheet, Text, View, SafeAreaView, Modal, ScrollView, Platform, TouchableOpacity, Button, Image, TouchableHighlight, TouchableNativeFeedback, Dimensions } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SwipeListView } from 'react-native-swipe-list-view';
import Constants from 'expo-constants';
import { Event } from '../../Models/Event';
import axios from "axios";
import EventComponent from "../Event/EventComponent";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import images from "../../assets/sites/images";

import { LinearGradient } from 'expo-linear-gradient';
import Countdown from '../countdown/countdown'
import moment from "moment";
import Favorites from '../Favorite/Favorite';

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
        axios.get<Event[]>(this.URL).then(res => {
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
     * Génération graphique et textuel d'un item de la List des évnènements
     * @param item
     */
    renderItem = ({ item }) => {
        let color=['#FF9800', '#F44336']; //rouge
        if(!this.isItFinished(item) && this.getCountdown(item)<0){
            color=['#66b3ff', '#3d91e3'] //bleu
        }else if(this.getCountdown(item)>0){
            color=['#29e386' , '#10a158'] //vert
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
                            <View><Favorites/></View>
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
                            <Button
                                onPress={() => this.closeModal()}
                                title="Close Event"
                            >
                            </Button>
                    </View>

                </Modal>
                <SwipeListView
                    useSectionList
                    sections={this.state.events}
                    //data={this.state.events}
                    renderItem={this.renderItem}
                    renderHiddenItem={ (rowData, rowMap) => (
                        <View style={styles.rowBack}>
                            <TouchableOpacity onPress={ () => rowMap[rowData.item.key].closeRow() }>
                                <Text>Close</Text>
                            </TouchableOpacity>
                            <Favorites/>
                        </View>
                    )}
                    renderSectionHeader={this._renderSection}
                    rightOpenValue={-75}
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
        height: Dimensions.get('window').height,
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


});
export default EventsList;
