import Expo from 'expo';
import React, { Component } from 'react';
import {Dimensions} from 'react-native';
import { ScrollView,SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, FlatList } from 'react-native';
import io from 'socket.io-client';

const {width : viewportWidth, height: viewportHeight} = Dimensions.get('window');

// const socket = require('../services/socket');

// Replace this URL with your own, if you want to run the backend locally!
// const SocketEndpoint = 'wss://echo.websocket.org/';

function postReq() {
  fetch('https://jsonplaceholder.typicode.com/posts', {
    method: 'POST',
    body: JSON.stringify({
      title: 'foo',
      body: 'bar',
      userId: 1
    }),
    headers: {
      "Content-type": "application/json; charset=UTF-8"
    }
  })
  .then(response => response.json())
  .then(json => console.log(json))
}

export default class ExerciseScreen extends Component {

  constructor(props) {
    super(props);
    this.state = {
      critiques: [
        // {imageURI: 'https://facebook.github.io/react-native/img/tiny_logo.png', caption: 'test one'},
        // {imageURI: 'https://facebook.github.io/react-native/img/tiny_logo.png', caption: 'test one'},
        // {imageURI: 'https://facebook.github.io/react-native/img/tiny_logo.png', caption: 'test one'}

      ],
      reps: 0

    };

    this.onStartExercise = this.onStartExercise.bind(this);
  }

  onStartExercise() {
    this.socket.emit('start_exercise', {'reps':10});
    this.socket.on('make_critique', (data) => {
      console.log('make critique event')
      this.setState({
        critiques: [
          {
            imageURI: 'http://' + data['image'],
            caption: data['caption']
          },
          ...this.state.critiques
        ]
      });
    });
    this.socket.on('update_reps', (data) => {
      console.log('make rep event')
      this.setState({
        reps: data['reps']
      });
    });
  };


  componentDidMount() {
    this.socket = this.props.navigation.getParam('socket');
  }

  _renderCritiques({item,index}) {
    return (
      <View key={index}>
        <Image
          style={styles.reviewImage}
          source={{uri: item.imageURI}}
        />

        <Text style={styles.reviewText}>
          {item.caption}
        </Text>
      </View>
    )
  }


    render() {
      return (

      <View style={{ flex: 1, alignItems: 'center', justifyContent: '', padding: 30, paddingVertical: 60 }}>


        <View style={{alignItems: 'center', justifyContent: 'center'}}>

            <Text style={styles.repText}>

              REPS: {this.state.reps}

            </Text>


            <TouchableOpacity
              style={styles.button}
              activeOpacity = { .7 }
              onPress={this.onStartExercise} 
            >
            <Text style={styles.buttonText}> Start </Text>
            </TouchableOpacity>

          </View>

          <View style={{ alignItems: 'center', height: 50 }}>
            
            <FlatList style={styles.review} data={this.state.critiques} renderItem={this._renderCritiques} />

          </View>

      </View>

    )
  }
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#D00000',
    alignItems:'center',
    padding: 18,
    paddingHorizontal: 50,
    borderRadius:25,
    marginBottom: 50
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
    buttonText: {
    color: 'white',
    fontSize: 14,
  },
  repText: {
    fontSize: 75,
    fontWeight: 'bold',
    paddingVertical: 25,
  },
  reviewImage: {
    width: 250,
    height: 250,
    resizeMode: 'stretch',
    marginBottom: 25,
    borderRadius: 25
  },
  review: {
    marginBottom: 10,
    position: 'absolute',
    height: 365
  },
  reviewText: {
    fontSize: 20,
    marginTop: 1,
    marginBottom: 25
  }
});