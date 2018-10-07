import React from 'react'
import { AsyncStorage, StatusBar, StyleSheet, View } from 'react-native'

import { DoubleCircleLoader } from 'react-native-indicator'

import { check } from '../models/users'

export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props)
        this._bootstrapAsync()
    }

    _bootstrapAsync = async () => {
        try {
            const preToken = await AsyncStorage.getItem('hermitToken')
            const token = JSON.parse(preToken)
            await check(token.token)
            this.props.navigation.navigate('Main')
        } catch (e) {
            this.props.navigation.navigate('Auth')
        }
    }

    render () {

        return (
            <View style={styles.container}>

                <DoubleCircleLoader size={80} color="#FFAB33"/>
                <StatusBar barStyle="default" />

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center', 
        justifyContent: 'center', 
        backgroundColor: '#403f41'
    }
})