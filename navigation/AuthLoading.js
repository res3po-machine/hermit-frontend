import React from 'react'
import { AsyncStorage, StatusBar, StyleSheet, View } from 'react-native'

import { DoubleCircleLoader } from 'react-native-indicator'

export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props)
        this._bootstrapAsync()
    }

    _bootstrapAsync = async () => {
        // Does this take into account token expiration?
        const token = await AsyncStorage.getItem('hermitToken')
        this.props.navigation.navigate(token ? 'Main' : 'Auth')
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