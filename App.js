import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';


import HomeScreen from './src/components/HomeScreen';
import AboutScreen from './src/components/AboutScreen';
import MainScreen from './src/components/MainScreen';


export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const AppNavigator = createStackNavigator({
  Home: {
    screen: HomeScreen,
    navigationOptions: {
        headerShown: false,
      }
  },
  About: {
    screen: AboutScreen,
    navigationOptions: {
        headerShown: false,
      }
  },
  Main: {
    screen: MainScreen,
    navigationOptions: {
        headerShown: false,
    }
  },
});

const AppContainer = createAppContainer(AppNavigator);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  }
});