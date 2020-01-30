import Expo from 'expo';
import React, { Component } from 'react';
import {Dimensions} from 'react-native';
import { ScrollView,SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
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
      //defauilt value of the date time
      date: '',

    };

    this.onStartExercise = this.onStartExercise.bind(this);

  }

  onStartExercise(exercise) {
      console.log(this.socket);

      // this.socket.emit('select_exercise', {'exercise':exercise});
      this.socket.on('make_critique', (data) => {
        this.imageSource = data['image'];
        this.caption = data['caption'];
      });

  };


  componentDidMount() {
    this.socket = this.props.navigation.getParam('socket');

  }


    render() {
      return (

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30, paddingVertical: 60 }}>


        <View style={{flex: 2, alignItems: 'center', justifyContent: 'center'}}>

            <Text style={styles.repText}>

              REPS

            </Text>


            <TouchableOpacity
              style={styles.button}
              activeOpacity = { .7 }
              onPress={()=>this.onStartExercise("done")} 
            >
            <Text style={styles.buttonText}> Start </Text>
            </TouchableOpacity>

          </View>


          <ScrollView style={styles.review}>
            <Image
              style={styles.reviewImage}
              source={this.imageSource}
            />

            <Text style={styles.reviewText}>
            {this.caption}
            </Text>

          </ScrollView>

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
    resizeMode: 'stretch'
  },
  review: {
    marginBottom: -150,
    position: 'relative'
  },
  reviewText: {
    fontSize: 20,
    marginTop: 50
  }
});