import React, { Component } from 'react';
import { TouchableWithoutFeedback, Keyboard, StyleSheet, Button, View, Text, TouchableOpacity, Image, TextInput, Modal, TouchableHighlight } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import io from 'socket.io-client';

const styles = StyleSheet.create({
  bigRed: {
    color: '#D00000',
    fontWeight: 'bold',
    fontSize:30,
    marginBottom: 53,
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
    fontSize: 24,
    marginBottom: 2,
    // fontFamily: 'HelveticaNeueBold'
  },
  icons: {
    width: 120,
    height: 120,
    resizeMode: 'stretch',
    marginTop: 50,
    marginBottom: 20
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  button: {
    backgroundColor: '#D00000',
    alignItems:'center',
    padding: 18,
    paddingHorizontal: 50,
    borderRadius:25,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  input: {
    width: 225,
    height: 44,
    padding: 10,
    marginBottom: 30,
    marginTop: -90,
    borderWidth: 0.75,
    borderColor: 'rgba(0,0,0,0.3)',
    borderRadius: 10,
    paddingHorizontal: 20


  },
});


export default class SessionScreen extends Component {

  constructor(props) {
      super(props);
    
      this.state = {
        sessionid: '',
        connectedText: 'Not Connected'
      };

      this.register = this.register.bind(this);
      this.getReply = this.getReply.bind(this);
      this.onStartSession = this.onStartSession.bind(this);

    }
  
    onStartSession() {
      const { sessionid } = this.state;
      console.log('id:', `${sessionid}`);
      if (sessionid == "1999") {
        this.getReply(JSON.stringify({success: true}))
      } else {
        this.register();
      }
    };

    register() {
      const { sessionid } = this.state;
      this.socket.emit('register_app', {'s_key':sessionid}, this.getReply);
    }

    getReply(data) {
      console.log('Reply from server: ' + data)
      data = JSON.parse(data)
      if (data.success == true) {
        this.props.navigation.navigate('Main',{
              socket: this.socket,
        });
      }
    }

    componentDidMount() {
      this.socket = io("http://liftr.ngrok.io/",{ transports: ['websocket'] });
    }

    render() {
      return (    

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30, paddingVertical: 60 }}>

        <View>
          <Text style={styles.bigBlue}>Begin your <Text style={styles.bigRed} >LIFTR </Text>Session</Text>
          <Text style={styles.smallText}>Follow the instructions on the machine to continue. </Text>
        </View>

        <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>


        <View style={{flex:1, alignItems: 'center', justifyContent:'center', flexDirection: 'column'}}>

            <TextInput
                value={this.state.sessionid}
                keyboardType = 'numeric'
                onChangeText={(sessionid) => this.setState({ sessionid })}
                placeholder={'Session ID'}
                style={styles.input}
            />

          
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity = { .7 }
                  onPress={this.onStartSession} 
                >
                  <Text style={styles.buttonText}>Enter Session</Text>
                </TouchableOpacity>
          
        </View>

        </TouchableWithoutFeedback>

      </View> 
    )
  }
}