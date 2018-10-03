import React from 'react'
import { Text, View, ScrollView } from 'react-native'

import SignupForm from '../components/SignupForm'

export default class SignupScreen extends React.Component {
    static navigationOptions = {
        title: 'Please sign up',
        headerMode: 'screen',
        headerTintColor: '#000000',
        headerStyle: {
            backgroundColor: 'rgba(255, 171,51, 1)',
        }
    }

    render () {

        return (
            <View style={{flex: 1, 
                alignItems: 'center', 
                justifyContent: 'center', 
                backgroundColor: '#403f41'}}>
                <SignupForm navigation={this.props.navigation.navigate}/>
            </View>
        )
    }
}