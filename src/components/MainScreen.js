import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';
const io = require('socket.io-client');

import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
])

const SOCKET_URL = 'http://liftr.ngrok.io/';

export default class App extends React.Component {
  state = {
    connected: false
  }

  constructor(props) {
    super(props)
  }

  connect = () => {
    this.socket = io(SOCKET_URL, {
      transports: ['websocket']
    });

    this.socket.on('connect', () => {
      this.setState({
        connected: true
      })
    })
  }

  render() {
    return (
      <View style={styles.container}>
        <Text>
            {this.state.connected ? 'true' : 'false'}
        </Text>
        <Button
          title='connect'
          onPress={this.connect}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});