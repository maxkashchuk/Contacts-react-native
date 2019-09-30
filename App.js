import React, { Component } from 'react';
import { Text, View, FlatList, StyleSheet } from 'react-native';
import axios from 'axios';
import { PermissionsAndroid } from 'react-native';
import Contacts from 'react-native-contacts';

export default class HelloWorldApp extends Component {
  constructor(props) {
    super(props);
    this.state={userlist: ''};
  }
  componentDidMount() {
    PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.READ_CONTACTS,
      {
        'title': 'Contacts',
        'message': 'This app would like to view your contacts.'
      }
    ).then(() => {
      Contacts.getAll((err, contacts) => {
        if (err === 'denied'){
          this.setState({userlist: undefined});
        } else {
          this.setState({userlist: contacts});
        }
      })
    })
  }
  render() {
    const styles = StyleSheet.create({
      container: {
       flex: 1,
       paddingTop: 22
      },
      item: {
        padding: 10,
        fontSize: 18,
        height: 44,
      },
    })
    for(let value of this.state.userlist)
    {
      console.log(value);
    }
    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.userlist}
          renderItem={({item}) => <Text style={styles.item}>{item.displayName + ' | ' + item.phoneNumbers[0].number}</Text>}
        />
      </View>
    );
  }
}