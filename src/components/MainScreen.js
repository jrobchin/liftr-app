import Expo from 'expo';
import React from 'react';
import {Dimensions} from 'react-native';
import { ScrollView,SafeAreaView, StyleSheet, Text, View, TouchableOpacity, Image } from 'react-native';
import io from 'socket.io-client';
import Carousel from 'react-native-snap-carousel';


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

export default class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      //defauilt value of the date time
      date: '',
      carouselItems: [
            {
                title:require(`../assets/images/shoulderpress.jpg`),
                function: "shoulder_press"
            },
            {
                title:require(`../assets/images/bicepcurl.jpg`),
                function: "bicep_curl",
            },
            {
                title:require(`../assets/images/squats.jpg`),
                function: "squat"
            }
            ],
    };

    this.onSelectExercise = this.onSelectExercise.bind(this);
    this._renderItem = this._renderItem.bind(this);

  }

  _renderItem({item,index}){
        return (
          <View style={{flex: 1, alignItems: 'flex-start', justifyContent: 'center'}}>
          <TouchableOpacity
            style={styles.exerciseButton}
            activeOpacity = { .7 }
            onPress={() => this.onSelectExercise(item.function)} 
          >
            <Image source={item.title} style={styles.images}/>

          </TouchableOpacity>
          </View>
        )
  }


  onSelectExercise(exercise) {
      console.log(exercise);
      this.socket.emit('select_exercise', {'exercise':exercise});
      this.props.navigation.navigate('Exercise'),{
              socket: this.socket,
        }; 

  };


  componentDidMount() {
    var that = this;
    var date = new Date().getDate(); //Current Date
    var day = new Date().getDay(); //Current Day
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    var days = ['','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday']
    var months = ['','January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
    that.setState({
      //Setting the value of the date time
      date:
        days[day] + ', ' + months[month] + ' ' + date + ' ',
    });

    this.socket = this.props.navigation.getParam('socket');
  }


  render() {

    return (
      <View style={{ flex: 1, alignItems: 'Center', justifyContent: 'Center', padding: 0, paddingVertical: viewportHeight/14 }}>

        <View style={{ flex: 1 }}>
          <Text style={styles.grayedOut}> {this.state.date.toUpperCase()} </Text>
          <Text style={styles.bigRed}>LIFTR <Text style={styles.bigBlue} >Hub </Text></Text>

          <ScrollView>
          
            <Carousel
              layout = {'default'}
              contentContainerCustomStyle={{ alignItems: 'center', justifyContent: 'center'}}
              layoutCardOffset={10}
              data={this.state.carouselItems}
              sliderWidth={viewportWidth}
              itemWidth={250}
              renderItem={this._renderItem}
              loop={true}

            />

          </ScrollView>

        </View>

      </View> 
    );
  }
}

const styles = StyleSheet.create({
  bigRed: {
    color: '#D00000',
    fontWeight: 'bold',
    fontSize:34,
    marginBottom: 30,
    marginLeft: 20
  },
  grayedOut: {
    color: 'rgba(0,0,0,0.4)',
    fontSize:13,
    marginBottom: 7,
    marginLeft: 20
  },
  smallText: {
    color: 'black',
    fontWeight: 'bold',
    fontSize:15,
    marginBottom: 50,
    marginTop: 10
  },
  bigBlue: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 34,
    // fontFamily: 'HelveticaNeueBold'
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  exerciseButton: {
    backgroundColor: '#D00000',
    alignItems:'center',
    justifyContent: 'center',
    borderRadius:25,
  },
    container2: {
    flex: 1,
    flexDirection: 'row',
    backgroundColor:'transparent',
    alignItems: 'stretch',
    justifyContent: 'center',
    marginTop: viewportHeight/-3,
  },
  images: {
    width: 240,
    height: 220,
    resizeMode: 'stretch',
    borderRadius: 25,

  },
});