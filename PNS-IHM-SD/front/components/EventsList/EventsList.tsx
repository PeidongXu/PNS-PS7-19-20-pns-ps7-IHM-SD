import React, {Component} from 'react';
import {
    StyleSheet,
    Text,
    View,
    SafeAreaView,
    Modal,
    SectionList, FlatList, Platform, TouchableOpacity, Button,
} from 'react-native';
import Constants from 'expo-constants';
import {EventsService} from '../../Services/events' ;
import {Event } from '../../Models/Event';
import axios from "axios";
import EventComponent from "../Event/EventComponent";

const DATA = [
    {
        "siteID": 1,
        "date": "10-01-2020",
        "startHour": "18:00",
        "endHour": "20:00",
        "sport": "foot",
        "title": "test1",
        "description": "match de foot",
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
    state = {
        load: "false",
        events:[],
        modalVisible:false,
        event:null,
    };

    constructor(props) {
        super(props);
    }


    componentDidMount() {
       this.getEvents();
    }

    private URL = 'http://172.20.10.2:9428/api/events';
    //private URL = 'http://192.168.1.78:9428/api/events';
     //private URL = 'http://localhost:9428/api/events';


    private getEvents = async () => {
       axios.get<Event[]>(this.URL).then(res => {
            this.setState({load:"true"});
            this.setState({events: res.data});
             console.log(this.state.events);
        });
    };

    renderItem = ({ item }) => {
        return (
            <View style={styles.item}>
                <TouchableOpacity onPress={() => this.openModal(item)}>
                    <Text style={styles.title}>{item.title}</Text>
                </TouchableOpacity>
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
        return (
            <SafeAreaView style={styles.container}>
                <Modal
                    visible={this.state.modalVisible}
                    onTouchOutside={() => {
                        this.closeModal();
                    }}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.innerContainer}>
                            <EventComponent
                                event = {this.state.event}
                            />
                            <Button
                                onPress={() => this.closeModal()}
                                title="Close modal"
                            >
                            </Button>

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
});
 export default EventsList ;
