import React, { Component } from 'react';
import { View, Text } from 'react-native';
import api from '../../services/api'
import { AsyncStorage } from 'react-native'
import { USER_AUTH } from '../../services/auth'

export default class Main extends Component {
  state = {
    user: {},
    error: ''
  }

  async componentDidMount () {
    const cduser = await AsyncStorage.getItem(USER_AUTH)
    const usr = JSON.parse(cduser)
    this.setState({ user: usr})
  }

  render() {
    return (
      <View>
        
        <Text> index </Text>
        <Text>{this.state.user.username}</Text>
        <Text>{this.state.user.email}</Text>
      </View>
    );
  }
}
