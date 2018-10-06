import React from 'react'
import { View, StyleSheet } from 'react-native'

import { LinearGradient } from 'expo'

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
            <View>

                <LinearGradient
                start={[1, 0]}
                end={[0, 1]}
                colors={['#a9a9aa','#403f41']}
                style={styles.gradient} >

                    <SignupForm navigation={this.props.navigation.navigate}/>

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
    }
})