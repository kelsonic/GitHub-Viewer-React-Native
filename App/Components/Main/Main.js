import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  ActivityIndicatorIOS
} from 'react-native';

import api from '../../utils/api';
import styles from './styles';

class Main extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      username: '',
      isLoading: false,
      error: false
    };
  }

  _handleChange(e) {
    this.setState({
      username: e.nativeEvent.text
    });
  }

  _handleSubmit() {
    this.setState({
      isLoading: true
    });

    api.getBio(this.state.username)
      .then((res) => {
        if (res.message === "Not Found") {
          this.setState({
            error: 'User not found',
            isLoading: false
          });
        } else {
          this.props.navigator.push({
            title: res.name || 'Select an Option',
            component: Dashboard,
            passProps: { userInfo: res }
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
    return (
      <View style={styles.mainContainer} >
        <Text style={styles.title} >View a GitHub User</Text>
        <TextInput
          style={styles.searchInput}
          value={this.state.username}
          onChange={this._handleChange.bind(this)} />
        <TouchableHighlight
          style={styles.button}
          onPress={this._handleSubmit.bind(this)}
          underlayColor="white">
            <Text style={styles.buttonText}>GET PROFILE</Text>
        </TouchableHighlight>
      </View>
    );
  }
}

export default Main;