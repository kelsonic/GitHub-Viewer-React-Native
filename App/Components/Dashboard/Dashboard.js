// Import externals
import React, { Component } from 'react';
import {
  Text,
  View,
  Image,
  TouchableHighlight
} from 'react-native';

// Import internals
import Profile from '../Profile/Profile';
import Repositories from '../Repositories/Repositories';
import Notes from '../Notes/Notes';
import api from '../../utils/api';
import styles from './styles';

class Dashboard extends Component {

  _makeBackground(btn) {
    let obj = {
      flexDirection: 'row',
      alignSelf: 'stretch',
      justifyContent: 'center',
      flex: 1
    }
    if(btn === 0){
      obj.backgroundColor = '#51A3A3';
    } else if (btn === 1){
      obj.backgroundColor = '#75485E';
    } else {
      obj.backgroundColor = '#CB904D';
    }
    return obj;
  }

  _goToProfile() {
    this.props.navigator.push({
        component: Profile,
        title: 'Profile Page',
        passProps: {userInfo: this.props.userInfo}
    })
  }

  _goToRepos() {
    api.getRepos(this.props.userInfo.login)
    .then((res) => {
      this.props.navigator.push({
        component: Repositories,
        title: 'Repos Page',
        passProps: {
          userInfo: this.props.userInfo,
          repos: res
        }
      });
    });
  }

  _goToNotes() {
    api.getNotes(this.props.userInfo.login)
      .then((res) => {
        res = res || {};
        this.props.navigator.push({
          component: Notes,
          tite: 'Notes',
          passProps: {
            userInfo: this.props.userInfo,
            notes: res
          }
        });
      });
  }

  render() {
    return (
        <View style={styles.container}>

          <Image source={{uri: this.props.userInfo.avatar_url}} style={styles.image} />
          
          <TouchableHighlight
            style={this._makeBackground(0)}
            onPress={this._goToProfile.bind(this)}
            underlayColor="#88D4F5">
              <Text style={styles.buttonText}>View Profile</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={this._makeBackground(1)}
            onPress={this._goToRepos.bind(this)}
            underlayColor="#E39EBF">
              <Text style={styles.buttonText}>View Repositories</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={this._makeBackground(2)}
            onPress={this._goToNotes.bind(this)}
            underlayColor="#039be5">
              <Text style={styles.buttonText}>Take Notes</Text>
          </TouchableHighlight>

        </View>
    );
  }
};

module.exports = Dashboard;