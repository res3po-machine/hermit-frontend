import React, { Component } from 'react'
import { View, StyleSheet, Image } from 'react-native'
import { Button } from 'react-native-elements'

import { LinearGradient } from 'expo'

import logo from '../assets/images/hermiticonClear.png'

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
            <View>

                <LinearGradient
                start={[1, 0]}
                end={[0, 1]}
                colors={['#a9a9aa','#403f41']}
                style={styles.gradient} >

                    <Image
                    source={logo}
                    style={styles.logo} />
                    
                    <Button
                    containerViewStyle={styles.buttonContainer}
                    title="LOG IN"
                    buttonStyle={styles.buttonStyle}
                    onPress={this.toLogin}
                    />
                    <Button
                    title="SIGN UP"
                    buttonStyle={styles.buttonStyle}
                    onPress={this.toSignup}
                    />

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
    logo: {
        height: 300, 
        width: 300
    },
    buttonContainer: {
        paddingVertical: 10,
    },
    buttonStyle: {
        backgroundColor: "rgba(255, 171,51, 1)",
        width: 300,
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 100,
    }
})