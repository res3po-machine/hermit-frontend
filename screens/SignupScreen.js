import React from 'react'
import { Text, View, ScrollView } from 'react-native'

import SignupForm from '../components/SignupForm'

export default class SignupScreen extends React.Component {
    static navigationOptions = {
        title: 'Please sign up',
    }

    render () {

        return (
            <View>
                <SignupForm navigation={this.props.navigation.navigate}/>
            </View>
        )
    }
}