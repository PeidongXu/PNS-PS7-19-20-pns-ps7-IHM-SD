import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Modal,
    SectionList, FlatList, Platform, TouchableOpacity, Button, Image
} from 'react-native';
import Constants from 'expo-constants';
import {EventsService} from '../../Services/events' ;
import {Event } from '../../Models/Event';
import axios from "axios";
import EventComponent from "../Event/EventComponent";
import About from "../About/About";
import * as Permissions from "expo-permissions";
import * as Location from "expo-location";
import * as geolib from "geolib";

const DATA = [
    {
        "siteID": 1,
        "date": "10-01-2020",
        "startHour": "18:00",
        "endHour": "20:00",
        "sport": "foot",
        "title": "test1",
        "description": "match de foot",
        "image": "foot",
        "id": 1578661732220
    },
    {
        "siteID": 1,
        "date": "10-01-2020",
        "startHour": "18:00",
        "endHour": "20:00",
        "sport": "foot",
        "title": "test2",
        "description": "match de foot",
        "image": "foot",
        "id": 1578661732221
    },
];


function Item({event}) {

    return (
        <View style={styles.item}>
            <TouchableOpacity onPress={() => <EventComponent/>}>
                <Text style={styles.title}>{event.title}</Text>
            </TouchableOpacity>
            </View>
    );

}


class EventsList extends Component{
    static navigationOptions = props => {
        const TimeData = props.navigation.getParam("TimeData");
       return { TimeData };
      };
    state = {
        load: "false",
        events:[],
        modalVisible:false,
        event:null,
        location: null,
        errorMessage: null,
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

    private URLGeneration () {
        if(this.props.navigation.getParam("TimeData")) {
          return 'http://172.20.10.2:9428/api/events/' + this.props.navigation.getParam("TimeData");
        }else{
          return 'http://172.20.10.2:9428/api/events'
        }

      }

      private URL = this.URLGeneration();
    //private URL = 'http://192.168.1.78:9428/api/events';
     //private URL = 'http://localhost:9428/api/events';


    private getEvents = async () => {
       axios.get<Event[]>(this.URL).then(res => {
            this.setState({load:"true"});
            this.setState({events: res.data});
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
            <View style={styles.row}>
                <TouchableOpacity onPress={() => this.openModal(item)}>
                <Image style={styles.picture} source={{ uri: '../../assets/sites/'+ item.image+'.jpg' }} />
                <View>
                    <Text style={styles.primaryText}>{item.title}</Text>
                    <Text style={styles.secondaryText}>{item.description}</Text>
                </View> 
                </TouchableOpacity>
                <View
                    style={{
                    height: 1,
                    width: "86%",
                    backgroundColor: "#CED0CE",
                    marginLeft: "14%"
                    }}
                />
            </View>
        );
    };

    openModal(event: Event) {
        this.setState({modalVisible:true});
        this.setState({event:event});
    }

    closeModal() {
        this.setState({modalVisible:false});
    }
    

    render(){
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
                                event = {this.state.event}
                                location = {this.state.location}
                            />
                            <Button
                                onPress={() => this.closeModal()}
                                title="Close modal"
                            >
                            </Button>
                            <About/>

                        </View>
                    </View>

                </Modal>
                <FlatList data={this.state.events}
                          renderItem={this.renderItem}
                          keyExtractor={item => item.id}
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
        backgroundColor: 'grey',
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
        color: 'black',
        marginBottom: 4,
    },
    secondaryText: { color: 'grey' },
});
 export default EventsList ;
