import React, { Component } from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Icon } from "react-native-elements";
import { serverUrl } from '../../serverConfig/server.config';
//import axios from "axios";
import axios from  'axios-observable';
import {Event} from "../../Models/Event";
import { Observable } from 'rxjs';


class Favorites extends Component {
  constructor(props) {
    super(props);
    this.state = {
      toggle: false,
      event: this.props.event
    };
  }

  componentDidMount() {
    this.isItFav();
  }

  private isItFav = async () => {
    axios.get(this.URL+"/"+this.state.event.id).subscribe(

        response => this.setState({ toggle: response.data})

    )
  };

  private URL = serverUrl+"/api/events/favorites"

  ToggleFunction = () => {
    if(this.state.toggle){
      axios.delete(this.URL+"/"+this.state.event.id).subscribe(
          response =>  this.setState(state => ({
            toggle: false
          })),
          error => console.log(error)
      );



    }else{

      axios.post(this.URL, {
        "EventId": this.state.event.id
      })
          .subscribe(
              response => this.setState(state => ({
                toggle: true
              })),
              error => console.log(error)
          );

    }

  };

  render() {
    if(this.state.refresh){
      this.isItFav();
    }
    return (
      <View>
        <TouchableOpacity onPress={() => this.ToggleFunction()}>
            {this.state.toggle ?
            <Icon
                name='heart'
                type='font-awesome'
                color='#f66'
              />
              :
              <Icon
              name='heart-o'
              type='font-awesome'
              color='#f66'
            />
                }
        </TouchableOpacity>
      </View>
    );
  }
}
export default Favorites;
