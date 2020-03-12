import React, { Component } from 'react';
import { StyleSheet, Button, View, Text, TouchableOpacity, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';
import * as Font from 'expo-font';


const styles = StyleSheet.create({
  bigBlue: {
    color: 'black',
    fontWeight: 'bold',
    fontSize: 43,
    marginBottom: -10,
    // fontFamily: 'HelveticaNeueBold'
  },
  bigRed: {
    color: '#D00000',
    fontWeight: 'bold',
    fontSize:43,
    marginBottom: 13,
  },
  caption: {
    color: 'black',
    fontSize:14,
  },
  button: {
    backgroundColor: '#D00000',
    alignItems:'center',
    padding: 18,
    paddingHorizontal: 80,
    borderRadius:10,
  },
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 14,
  },
  icons: {
    width: 60,
    height: 60,
    resizeMode: 'stretch'
  },
  infoText: {
    fontSize: 12,
  },
  infoTitle: {
    fontSize: 15,
    fontWeight: 'bold',
  }

});


export default class HomeScreen extends Component {
  // componentDidMount() {
  //   Font.loadAsync({
  //     'HelveticaNeue': require('../assets/fonts/HelveticaNeue.ttf'),
  //     'HelveticaNeueBold': require('../assets/fonts/HelveticaNeueBd.ttf'),
  //   });
  // }
  render() {
    return (
      <View style={{ flex: 1, alignItems: 'left', justifyContent: 'top', padding: 30, paddingVertical: 60 }}>
        <Text style={styles.bigBlue}>Welcome to</Text>
        <Text style={styles.bigRed}>LIFTR</Text>
        <Text style={styles.caption}>Start transforming your body today with the power of Artificial Intelligence.</Text>

        <View style={{flex:3, alignItems: 'center', justifyContent:'center', flexDirection: 'column'}}>

          <View style={{flex:2, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
            <Image
              style={styles.icons}
              source={require('../assets/images/audio.png')}
            />

            <View style={{flex:2, alignItems: 'left', justifyContent: 'center', flexDirection: 'column', paddingHorizontal: 13}}>

              <Text style={styles.infoTitle}>Instant Feedback</Text>
              <Text style={styles.infoText}>Using AI we validate how you perform each exercise and provide feedback immediately.</Text>

            </View>

          </View>

          <View style={{flex:2, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
            <Image
              style={styles.icons}
              source={require('../assets/images/strong.png')}
            />

            <View style={{flex:2, alignItems: 'left', justifyContent: 'center', flexDirection: 'column', paddingHorizontal: 13}}>

              <Text style={styles.infoTitle}>Customized Workouts</Text>
              <Text style={styles.infoText}>Based on your goals and current fitness level, we help create a workout plan to deliver optimal results.</Text>

            </View>
            
          </View>

          <View style={{flex:2, alignItems: 'center', justifyContent: 'center', flexDirection: 'row'}}>
            <Image
              style={styles.icons}
              source={require('../assets/images/contact.png')}
            />

            <View style={{flex:2, alignItems: 'left', justifyContent: 'center', flexDirection: 'column', paddingHorizontal: 13}}>

              <Text style={styles.infoTitle}>Find a Gym Buddy</Text>
              <Text style={styles.infoText}>Join a workout with a friend to make sure you get the gym buddy experience at home too.</Text>

            </View>
            
          </View>

          <View style={styles.container}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity = { .7 }
              onPress={()=>this.props.navigation.navigate('Login')} 
            >
            <Text style={styles.buttonText}> Start My Journey </Text>
            </TouchableOpacity>

          </View>
          
        </View>
      </View>
    )
  }
}