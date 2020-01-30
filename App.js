import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack';


import HomeScreen from './src/components/HomeScreen';
import LoginScreen from './src/components/LoginScreen';
import MainScreen from './src/components/MainScreen';
import SessionScreen from './src/components/SessionScreen';
import ExerciseScreen from './src/components/ExerciseScreen';


import { YellowBox } from 'react-native'
YellowBox.ignoreWarnings([
  'Unrecognized WebSocket connection option(s) `agent`, `perMessageDeflate`, `pfx`, `key`, `passphrase`, `cert`, `ca`, `ciphers`, `rejectUnauthorized`. Did you mean to put these under `headers`?'
])

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
  Login: {
    screen: LoginScreen,
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
  Session: {
    screen: SessionScreen,
    navigationOptions: {
        headerShown: false,
    }
  },
  Exercise: {
    screen: ExerciseScreen,
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