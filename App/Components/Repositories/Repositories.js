// Import Externals
import React, { Component } from 'react';
import {
  Text,
  View,
  TouchableHighlight,
  ScrollView
} from 'react-native';

// Import Internals
import Badge from '../Badge/Badge';
import Separator from '../Helpers/Separator';
import Web_View from '../Helpers/WebView';
import styles from './styles';

class Repositories extends Component {
  
  _openPage(url){
    this.props.navigator.push({
      component: Web_View,
      title: 'Web View',
      passProps: {url}
    });
  }

  render() {
    
    const repos = this.props.repos;
    const list = repos.map((item, index) => {
      const desc = repos[index].description ? <Text style={styles.description}> {repos[index].description} </Text> : <View />;
      return (
        <View key={index}>
          <View style={styles.rowContainer}>
            <TouchableHighlight
              onPress={this._openPage.bind(this, repos[index].html_url)}
              underlayColor='transparent'>
                <Text style={styles.name}>{repos[index].name}</Text>
            </TouchableHighlight>
            <Text style={styles.stars}>Stars: {repos[index].stargazers_count} </Text>
              {desc}
              <Separator />
          </View>
        
        </View>
      );
    });

    return (
      <ScrollView style={styles.container}>
        <Badge userInfo={this.props.userInfo} />
        {list}
      </ScrollView>
    );
  }
}

Repositories.propTypes = {
  userInfo: React.PropTypes.object.isRequired,
  repos: React.PropTypes.array.isRequired
};

module.exports = Repositories;