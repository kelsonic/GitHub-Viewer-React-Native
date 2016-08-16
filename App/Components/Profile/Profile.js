// Import Externals
import React, { Component } from 'react';
import {
  Text,
  View,
  ScrollView
} from 'react-native';

// Import Internals
import Badge from '../Badge/Badge';
import Separator from '../Helpers/Separator';
import styles from './styles';

class Profile extends Component{

  _getRowTitle(user, item){
    item = (item === 'public_repos') ? item.replace('_', ' ') : item;
    return item[0] ? item[0].toUpperCase() + item.slice(1) : item;
  }

  render() {

    const userInfo = this.props.userInfo;
    const topicArr = ['company', 'location', 'email', 'bio', 'followers', 'following', 'public_repos'];
    
    const list = topicArr.map((item, index) => {
      if(!userInfo[item]){
        return <View key={index} />
      } else {
        return (
          <View key={index}>
            <View style={styles.rowContainer}>
              <Text style={styles.rowTitle}>{this._getRowTitle(userInfo, item)}</Text>
              <Text style={styles.rowContent}>{userInfo[item]}</Text>
            </View>
            <Separator />
          </View>
        );
      }
    });

    return (
      <ScrollView style={styles.container}>
        <Badge userInfo={this.props.userInfo} />
        {list}
      </ScrollView>
    );
  }
};

Profile.propTypes = {
    userInfo: React.PropTypes.object.isRequired
};

module.exports = Profile;