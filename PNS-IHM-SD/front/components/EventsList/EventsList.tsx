import React, { Component } from 'react';
import { serverUrl } from '../../serverConfig/server.config';
import { StyleSheet, Text, View, SafeAreaView, Modal, SectionList, FlatList, Platform, TouchableOpacity, Button, Image, TouchableHighlight, TouchableNativeFeedback } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { SwipeListView } from 'react-native-swipe-list-view';
import Constants from 'expo-constants';
import { EventsService } from '../../Services/events';
import { Event } from '../../Models/Event';
import axios from "axios";
import EventComponent from "../Event/EventComponent";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import images from "../../assets/sites/images";

import { LinearGradient } from 'expo-linear-gradient';
import CountdownList from '../countdown/countdownList'
//import  CountDown from 'react-native-countdown-component';
import Favorite from '../Favorite/Favorite'
import style from '../Menu/style';
import { Right } from 'native-base';

function Item({ event }) {
    return (
        <View>
            <TouchableOpacity onPress={() => <EventComponent />}>
                <View style={styles.item}>
                    <Text style={styles.title}>{event.title}</Text>
                </View>
            </TouchableOpacity>
        </View>
    );

}


class EventsList extends Component {
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
        myLongitude: 7.071778
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
            return serverUrl + '/api/events'
        }

    }

    private URL = this.URLGeneration();
    //private URL = 'http://192.168.1.78:9428/api/events';
    //private URL = 'http://localhost:9428/api/events';


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
    };


    renderItem = ({ item }) => {
        return (
            <View>
                <TouchableHighlight onPress={() => this.openModal(item)}>
                    <LinearGradient
                        //colors={['#29e386' , '#10a158']} //vert
                        //colors={['#66b3ff', '#3d91e3']} //bleu
                        colors={['#FF9800', '#F44336']} //rouge
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
                                <CountdownList />
                            </View>
                            <View style={styles.chevronContainer}>
                                <Icon name="chevron-right" style={styles.Icon} />
                            </View>
                        </View>



                    </LinearGradient>
                </TouchableHighlight >
                <View
                    style={{
                        height: 1,
                        width: "100%",
                        backgroundColor: "#CED0CE",
                    }}
                />
            </View>
        );
    };

    openModal(event: Event) {
        this.setState({ modalVisible: true });
        this.setState({ event: event });
    }

    closeModal() {
        this.setState({ modalVisible: false });
    }


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
                    <View style={styles.modalContainer}>
                        <View style={styles.innerContainer}>
                            <EventComponent
                                event={this.state.event}
                                location={this.state.location}
                            />
                            <Button
                                onPress={() => this.closeModal()}
                                title="Close modal"
                            >
                            </Button>
                        </View>
                    </View>

                </Modal>
                <SwipeListView
                    data={this.state.events}
                    renderItem={this.renderItem}
                    /*renderHiddenItem={ (rowData, rowMap) => (
                        <View style={styles.rowBack}>
                            <TouchableOpacity onPress={ () => rowMap[rowData.item.key].closeRow() }>
                                <Text>Close</Text>
                            </TouchableOpacity>
                        </View>
                    )}*/
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
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'white',
    },
    innerContainer: {
        alignItems: 'center',
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
