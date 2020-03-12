import Expo from 'expo';
import React, { Component } from 'react';
import {Dimensions} from 'react-native';
import { ScrollView,SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image, FlatList, Modal, TouchableHighlight } from 'react-native';
import io from 'socket.io-client';

const {width : viewportWidth, height: viewportHeight} = Dimensions.get('window');

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
    fontSize: 25,
    fontWeight: 'bold',
    paddingVertical: 5,
    marginBottom: 15,
  },
  reviewImage: {
    width: 334,
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
  },
    bigBlack: {
    color: 'rgb(0,0,0)',
    fontWeight: 'bold',
    fontSize:38,
    marginBottom: 53,
  },
  resultText: {
    fontSize: 20,
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 40,
    marginBottom: 20,
    fontWeight: 'bold',
  },
  bigRed: {
    color: '#D00000',
    fontWeight: 'bold',
    fontSize:38,
    marginBottom: 53,
  },
});
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
      reps: 0,
      modalVisible: false,
      modalCaption: "caption" ,
      modalImage: "",
      modalIndex: 0,
    };

    this.onStartExercise = this.onStartExercise.bind(this);
    this._renderCritiques = this._renderCritiques.bind(this);
    this.setModalVisible = this.setModalVisible.bind(this);
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

  setModalVisible(visible,caption,imageURI, index) {
      this.setState({modalVisible: visible, modalCaption: caption, modalImage: imageURI, modalIndex: index});
  }

  _renderCritiques({item,index}) {
    return (
      // <View key={index}>
      //   <Image
      //     style={styles.reviewImage}
      //     source={{uri: item.imageURI}}
      //   />

      //   <Text style={styles.reviewText}>
      //     {item.caption}
      //   </Text>
      // </View>
      <TouchableHighlight
          style={{ width: 310, height: 60, backgroundColor: "rgb(210, 210, 210)", borderRadius: 15, marginBottom: 15 }}
          onPress={() => {
            this.setModalVisible(true, item.caption, item.imageURI, this.state.critiques.length-index);
          }}>
          <Text style={{ padding: 20, fontSize: 15, }}>Show Critique</Text>
        </TouchableHighlight>

    )
  }


    render() {
      return (

      <View style={{ flex: 1, alignItems: 'center', padding: 30, paddingVertical: 60 }}>

      <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          
          <View style={{marginTop: 22, alignItems: 'left', padding: 30}}>
            <View>

              <Text style={styles.resultTitle}>Critique {this.state.modalIndex}</Text>
              <Text style={styles.resultText}>{this.state.modalCaption}</Text>
              <Image
                style={styles.reviewImage}
                source={{uri: this.state.modalImage}}
              />

              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={styles.resultText}>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <View style={{alignItems: 'center', justifyContent: 'center'}}>

            <Text style={styles.bigRed}>LIFTR<Text style={styles.bigBlack}>train</Text></Text>

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

