import Expo from 'expo';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
// const io = require('socket.io-client');

// Replace this URL with your own, if you want to run the backend locally!
// const SocketEndpoint = 'wss://echo.websocket.org/';

export default class App extends React.Component {
//   state = {
//     isConnected: false,
//     data: null,
//   };
//   componentDidMount() {
//     // const socket = io(SocketEndpoint, {
//     //     transports: ['websocket'] // you need to explicitly tell it to use websockets
//     // });

//     // socket.on('connect', () => {
//     //   this.setState({ isConnected: true });
//     // });

//     // console.log("connected");

//     // socket.on('ping', data => {
//     //   this.setState(data);
//     //   console.log(data);
//     // });

//     // var ws = new WebSocket(SocketEndpoint);
//     //    ws.onopen = () => {
//     //     this.setState({ isConnected: true });
//     //     ws.send("socket open");
//     //    };
//     //    ws.onclose = function(evt) {
//     //        console.log("socket closed");
//     //    };
//     //    ws.onmessage = function(evt) {
//     //        console.log(evt.data);
//     //    };
//   }

  render() {
    return (
      <View style={styles.container}>
        <Text>
            he
        </Text>

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