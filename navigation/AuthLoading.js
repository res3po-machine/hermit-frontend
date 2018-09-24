import React from 'react'
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View
} from 'react-native'

export default class AuthLoadingScreen extends React.Component {
    constructor(props) {
        super(props)
        this._bootstrapAsync()
    }

    _bootstrapAsync = async () => {
        const token = await AsyncStorage.getItem('hermitToken')
        this.props.navigation.navigate(token ? 'Main' : 'Auth')
    }

    render () {

        return (
            <View>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        )
    }
}