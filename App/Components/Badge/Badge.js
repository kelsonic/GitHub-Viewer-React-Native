// Import Externals
import React, { Component } from 'react';
import {
  Text,
  View,
  Image
} from 'react-native';

// Import Internals
import styles from './styles';

class Badge extends Component {
  render(){
    return (
      <View style={styles.container}>
        <Image style={styles.image} source={{uri: this.props.userInfo.avatar_url}}/>
        <Text style={styles.name}>
          {this.props.userInfo.name}</Text>
        <Text style={styles.username}>
          {this.props.userInfo.login}</Text>
      </View>
    );
  }
}

Badge.propTypes = {
  userInfo: React.PropTypes.object.isRequired
};

module.exports = Badge;