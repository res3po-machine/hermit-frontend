import React, { Component } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'
import { Button } from 'react-native-elements'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userLogout } from '../actions/userActions'

import UserHeader from '../components/UserHeader'

const mapStatetoProps = ({users}) => ({users})
const mapDispatchtoProps = (dispatch) => bindActionCreators({
    userLogout
}, dispatch)

class UserProfile extends Component {
    static navigationOptions = {
        title: "User Profile",
        headerMode: 'screen',
        headerTintColor: '#fff',
        headerStyle: {
            backgroundColor: '#34408A',
        },
    }
    
    logout = () => {
        this.props.userLogout()
        this.props.navigation.navigate('AuthLoading')
    }

    render() {
        return (
            <ScrollView>

                <UserHeader />
                    <Button 
                    title="LOGOUT" 
                    onPress={this.logout} 
                    style={styles.buttonContainer}
                    buttonStyle={styles.buttonStyle} />

            </ScrollView>
        )
    }
}

export default connect(mapStatetoProps, mapDispatchtoProps)(UserProfile)

const styles = StyleSheet.create({
    buttonContainer: {
        paddingVertical: 5
    },
    buttonStyle: {
        backgroundColor: "rgba(255, 171,51, 1)",
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 100,
    }
})