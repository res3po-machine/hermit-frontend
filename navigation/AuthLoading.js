import React from 'react'
import {
    ActivityIndicator,
    AsyncStorage,
    StatusBar,
    StyleSheet,
    View
} from 'react-native'
import { DoubleCircleLoader } from 'react-native-indicator'

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
            <View style={{flex: 1, alignItems: 'center', justifyContent: 'center', backgroundColor: '#403f41'}}>
                {/* <Spinner isVisible={true} color="rgba(255, 171,51, 1)" type="Bounce"/> */}
                <DoubleCircleLoader size={80} color="#FFAB33"/>
                <StatusBar barStyle="default" />
            </View>
        )
    }
}