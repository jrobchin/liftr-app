import React, { Component } from 'react';
import { StyleSheet, Button, View, Text, TouchableOpacity, Image, TextInput, Modal, TouchableHighlight } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const styles = StyleSheet.create({
  bigRed: {
    color: '#D00000',
    fontWeight: 'bold',
    fontSize:38,
    marginBottom: 53,
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
    paddingHorizontal: 80,
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
    marginBottom: 10,
    borderWidth: 0.75,
    borderColor: 'rgba(0,0,0,0.3)',
    borderRadius: 10,
    paddingHorizontal: 20


  },
});


export default class LoginScreen extends Component {

  constructor(props) {
      super(props);
    
      this.state = {
        username: '',
        password: '',
      };

      this.onLogin = this.onLogin.bind(this);
    }
  
    onLogin() {
      // const { username, password } = this.state;
      // console.log('Credentials', `${username} + ${password}`);

      // if ((username == "Harsh") && (password == "Patel")) {
        this.props.navigation.navigate('Session');
        // console.log("good");
      
    }

    state = {
      
  };



    render() {
      return (

      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30, paddingVertical: 60 }}>
        
          <Image
              style={styles.icons}
              source={require('../assets/images/liftrLogo2.png')}
          />

          <Text style={styles.bigRed}>LIFTR</Text>


          <View style={{flex:3, alignItems: 'center', justifyContent:'center', flexDirection: 'column'}}>

            <TextInput
                value={this.state.username}
                onChangeText={(username) => this.setState({ username })}
                placeholder={'Username'}
                style={styles.input}
            />
            <TextInput
                value={this.state.password}
                onChangeText={(password) => this.setState({ password })}
                placeholder={'Password'}
                secureTextEntry={true}
                style={styles.input}
            />
            
            <View style={styles.container}>
                <TouchableOpacity
                  style={styles.button}
                  activeOpacity = { .7 }
                  // onPress={()=>this.props.navigation.navigate('Main')}
                  onPress={this.onLogin} 
                >
                  <Text style={styles.buttonText}>Login</Text>
                </TouchableOpacity>

            </View>
          
          </View>

      </View> 
    )
  }
}