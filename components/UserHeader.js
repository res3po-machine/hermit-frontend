import React, { Component } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Card } from 'react-native-elements'

import { connect } from 'react-redux'

const mapStatetoProps = ({users}) => ({users})

class UserHeader extends Component {
    render = () => {
        return (
            <Card title={`${this.props.users.user.first_name} ${this.props.users.user.last_name}'s Profile`}>
                <View style={styles.textContainer}>
                    <Text>Email: </Text><Text>{this.props.users.user.email}</Text>
                </View>
                <View style={styles.textContainer}>
                    <Text>Profficiency: </Text><Text>{this.props.users.user.proff}</Text>
                </View>
            </Card>
        )
    }
}

export default connect(mapStatetoProps)(UserHeader)

const styles = StyleSheet.create({
    textContainer: {
        paddingBottom: 10
    }
})