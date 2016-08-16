// Import Externals
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  StyleSheet,
  TextInput,
  TouchableHighlight,
  ActivityIndicator
} from 'react-native';

// Import Internals
import api from '../../utils/api';
import Dashboard from '../Dashboard/Dashboard';
import Profile from '../Profile/Profile';
import Repositories from '../Repositories/Repositories';
import Separator from '../Helpers/Separator';
import styles from './styles';

class Main extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      username: '',
      isLoading: false,
      error: false
    };
  }

  _handleChange(event){
    this.setState({
      username: event.nativeEvent.text
    });
  }

  _handleSubmit(){
    this.setState({
      isLoading: true
    });

    api.getBio(this.state.username)
      .then((res) => {
        if(res.message === 'Not Found'){
          this.setState({
            error: 'Oops, we could not find this GitHub user.',
            isLoading: false
          });
        } else {
          this.props.navigator.push({
            title: res.name || "Select an Option",
            component: Dashboard,
            passProps: {userInfo: res}
          });
          this.setState({
            isLoading: false,
            error: false,
            username: ''
          });
        }
      });
  }

  render() {

    const showErr = this.state.error ? <Text> {this.state.error} </Text> : <View></View>;

    return (

      <View style={styles.mainContainer}>
        <Image source={{uri: 'https://cdn4.iconfinder.com/data/icons/iconsimple-logotypes/512/github-512.png'}} style={styles.image} />
        <Text style={styles.title}>Find a GitHub User</Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.username}
          onChange={this._handleChange.bind(this)} />
        <TouchableHighlight
          style={styles.button}
          onPress={this._handleSubmit.bind(this)}
          underlayColor="white">
            <Text style={styles.buttonText}>SEARCH</Text>
        </TouchableHighlight>
        <ActivityIndicator
          animating={this.state.isLoading}
          color="#fff"
          size="large"></ActivityIndicator>
        {showErr}
      </View>
    );
  }
}

export default Main;