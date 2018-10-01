import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, View, AsyncStorage } from 'react-native'
import { Card, Avatar, ListItem } from 'react-native-elements'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getUser } from '../actions/userActions'

const mapStatetoProps = ({comments, users}) => ({comments, users})
// const mapDispatchtoProps = (dispatch) => bindActionCreators({
//     getUser
// }, dispatch)

class UserHeader extends Component {

    render = () => {
        return (
            <Card title={`${this.props.users.user.first_name} ${this.props.users.user.last_name}'s Profile`}>
                <View style={{paddingBottom: 10}}>
                    <Text>Email: </Text><Text>{this.props.users.user.email}</Text>
                </View>
                <View style={{paddingBottom: 10}}>
                    <Text>Profficiency: </Text><Text>{this.props.users.user.proff}</Text>
                </View>
            </Card>
        )
    }
}

export default connect(mapStatetoProps)(UserHeader)