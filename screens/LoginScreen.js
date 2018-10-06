import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';
import { Button } from 'react-native-elements'

import { LinearGradient } from 'expo';

import LoginForm from '../components/LoginForm';

export default class LoginScreen extends Component {
  static navigationOptions = {
    title: 'Please log in',
    headerMode: 'screen',
    headerTintColor: '#000000',
    headerStyle: {
        backgroundColor: 'rgba(255, 171,51, 1)',
    }
  };

  render() {
    return (
        <View>

        <LinearGradient
        start={[1, 0]}
        end={[0, 1]}
        colors={['#a9a9aa','#403f41']}
        style={styles.gradient} >

            <LoginForm navigation={this.props.navigation.navigate}/>
            <Button 
            title="No Account? Sign-up!" 
            onPress={() => this.props.navigation.navigate('SignUp')}
            buttonStyle={styles.buttonStyle} />

        </LinearGradient>
            
        </View>
    )
  }

}

const styles = StyleSheet.create({
  gradient: {
    alignItems: 'center', 
    justifyContent: 'center', 
    height: '100%'
  },
  buttonStyle: {
    backgroundColor: "#448A34",
    width: 300,
    height: 45,
    borderColor: "transparent",
    borderWidth: 0,
    borderRadius: 100
  }
});
