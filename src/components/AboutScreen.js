import React, { Component } from 'react';
import { StyleSheet, Button, View, Text, TouchableOpacity, Image } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const styles = StyleSheet.create({
  bigRed: {
    color: 'red',
    fontWeight: 'bold',
    fontSize:43,
    marginBottom: 13,
  },
  icons: {
    width: 60,
    height: 60,
    resizeMode: 'stretch'
  },
});


export default class AboutScreen extends Component {
  render() {
    return (
       <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center', padding: 30, paddingVertical: 60 }}>
        
        <Image
              style={styles.icons}
              source={require('../assets/images/liftrLogo.png')}
        />

        <View style={{flex:3, alignItems: 'center', justifyContent:'center', flexDirection: 'column'}}>

          <Text style={styles.bigRed}>LIFTR</Text>

          <View style={styles.container}>
            <TouchableOpacity
              style={styles.button}
              activeOpacity = { .7 }
              onPress={()=>this.props.navigation.navigate('Main')} 
            >
            <Text style={styles.buttonText}> Start My Journey </Text>
            </TouchableOpacity>

          </View>
          
        </View>
      </View>
    )
  }
}