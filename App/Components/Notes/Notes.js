// Import Externals
import React, { Component } from 'react';
import {
  View,
  Text,
  TextInput,
  ListView,
  TouchableHighlight
} from 'react-native';

// Import Internals
import Badge from '../Badge/Badge';
import Separator from '../Helpers/Separator';
import api from '../../utils/api';
import styles from './styles';

class Notes extends Component{
  
  constructor(props){
    super(props);

    this.ds = new ListView.DataSource({rowHasChanged: (row1, row2) => row1 !== row2});

    this.state = {
      dataSource: this.ds.cloneWithRows(this.props.notes),
      note: '',
      error: ''
    };
  }

  _handleChange(e){
    this.setState({
      note: e.nativeEvent.text
    });
  }

  _handleSubmit(){
    const note = this.state.note;
    this.setState({
      note: ''
    });
    api.addNote(this.props.userInfo.login, note)
      .then((data) => {
        api.getNotes(this.props.userInfo.login)
          .then((data) => {
            this.setState({
              dataSource: this.ds.cloneWithRows(data)
            })
          });
      })
      .catch((error) => {
        console.log('Request failed', error);
        this.setState({error});
      });
  }

  _renderRow(rowData){
    return (
      <View>
        <View style={styles.rowContainer}>
          <Text> {rowData} </Text>
        </View>
        <Separator />
      </View>
    );
  }

  _footer(){
    return (
      <View style={styles.footerContainer}>
        <TextInput
          style={styles.searchInput}
          value={this.state.note}
          onChange={this._handleChange.bind(this)}
          placeholder="New Note" />
        <TouchableHighlight
          style={styles.button}
          onPress={this._handleSubmit.bind(this)}
          underlayColor="#88D4F5">
            <Text style={styles.buttonText}>Submit</Text>
        </TouchableHighlight>
      </View>
    );
  }

  render(){
    return (
      <View style={styles.container}>
        <ListView
          enableEmptSections={true}
          dataSource={this.state.dataSource}
          renderRow={this._renderRow}
          renderHeader={() => <Badge userInfo={this.props.userInfo}/>} />
        {this._footer()}
      </View>
    );
  }
}

Notes.propTypes = {
  userInfo: React.PropTypes.object.isRequired,
  notes: React.PropTypes.object.isRequired
}

module.exports = Notes;