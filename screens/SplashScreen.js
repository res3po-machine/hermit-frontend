import React, { Component } from 'react'
import { View, StyleSheet, Text, Image } from 'react-native'
import { Button, Icon } from 'react-native-elements'
import logo from '../assets/images/hermiticonwithtext.png'

export default class SplashScreen extends Component {
    static navigationOptions = {
        title: 'Welcome to Hermit!',
        headerMode: 'screen',
        headerTintColor: '#000000',
        headerStyle: {
            backgroundColor: 'rgba(255, 171,51, 1)',
          }
    }
    
    toLogin = () => {
        this.props.navigation.navigate('SignIn')
    }

    toSignup = () => {
        this.props.navigation.navigate('SignUp')
    }

    render() {
        return (
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#403f41'}}>
                <Image
                    source={logo}
                    style={{height: 300, width: 300}} />
                
                <Button
                containerViewStyle={{
                    paddingVertical: 10,
                    alignSelf: 'center'
                }}
                title="LOG IN"
                titleStyle={{fontWeight: 'bold'}}
                buttonStyle={{
                    backgroundColor: "rgba(255, 171,51, 1)",
                    width: 300,
                    height: 45,
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 100,
                  }}
                onPress={this.toLogin}
                />
                <Button
                title="SIGN UP"
                titleStyle={{fontWeight: 'bold'}}
                buttonStyle={{
                    backgroundColor: "rgba(255, 171,51, 1)",
                    width: 300,
                    height: 45,
                    borderColor: "transparent",
                    borderWidth: 0,
                    borderRadius: 100
                  }}
                onPress={this.toSignup}
                />
            </View>
        )
    }
}