import React, {Component} from 'react';
import {Modal, Text, TouchableHighlight, View, Alert, StyleSheet, ScrollView,Image} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack';

const styles = StyleSheet.create({
  bigRed: {
    color: '#D00000',
    fontWeight: 'bold',
    fontSize:38,
    marginBottom: 53,
  },
  bigBlack: {
    color: 'rgb(0,0,0)',
    fontWeight: 'bold',
    fontSize:38,
    marginBottom: 53,
  },
  reviewImage: {
    width: 250,
    height: 250,
    resizeMode: 'stretch',
    marginBottom: 25,
    borderRadius: 25
  },
  resultText: {
    fontSize: 20,
    marginBottom: 20,
  },
  resultTitle: {
    fontSize: 40,
    marginBottom: 20,
    fontWeight: 'bold',
  }
});


export default class result extends Component {

    state = {
      modalVisible: false,
      modalCaption: "caption" ,
      // modal_Image: " ",
    };

    setModalVisible(visible,caption,imageURI) {
      this.setState({modalVisible: visible, modalCaption: caption, modalImage: imageURI});
    }


    render() {

      return (

      <View style={{ flex: 1, alignItems: 'center', justifyContent: '', padding: 30, paddingVertical: 60 }}>
        
        <Modal
          animationType="slide"
          transparent={false}
          visible={this.state.modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
          }}>
          
          <View style={{marginTop: 22, alignItems: 'left', padding: 30}}>
            <View>

              <Text style={styles.resultTitle}>Critique</Text>
              <Text style={styles.resultText}>this.state.modalCaption</Text>
              <Image
                style={styles.reviewImage}
                source={{uri: this.state.modalImage}}
              />


              <TouchableHighlight
                onPress={() => {
                  this.setModalVisible(!this.state.modalVisible);
                }}>
                <Text style={result.text}>Close</Text>
              </TouchableHighlight>
            </View>
          </View>
        </Modal>

        <Text style={styles.bigRed}>LIFTR <Text style={styles.bigBlack}>Train</Text></Text>

        <ScrollView>
        <TouchableHighlight
          style={{ width: 310, height: 60, backgroundColor: "rgb(210, 210, 210)", borderRadius: 15, marginBottom: 15 }}
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text style={{ padding: 20, fontSize: 15, }}>Show Critique</Text>
        </TouchableHighlight>

         <TouchableHighlight
          style={{ width: 310, height: 60, backgroundColor: "rgb(210, 210, 210)", borderRadius: 15 }}
          onPress={() => {
            this.setModalVisible(true);
          }}>
          <Text style={{ padding: 20, fontSize: 15, }}>Show Critique</Text>
        </TouchableHighlight>
        </ScrollView>
      </View> 
    )
  }
}