import React, {Component} from 'react'
import { View, Text, Image, StyleSheet } from 'react-native'
import { Card, Button, FormLabel, FormInput} from 'react-native-elements'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userLogin } from '../actions/userActions'

const mapStateToProps = ({users}) => ({users})
const mapDispatchToProps = (dispatch) => bindActionCreators({
    userLogin
}, dispatch)

class LoginForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password: '',
            error: ''
        }
    }

    onChange = (e) => {
        this.setState({
            ...this.state,
            [e.name]: e.value
        })
    }

    onSubmit = (e) => {
        e.preventDefault()
        this.props.userLogin(this.state)
        this.setState({
            email: '',
            password: ''
        })
    }

    render = () => {
        return (
            <View>

                <Card style={styles.formCard}>
 
                    <FormLabel for="email">Email:</FormLabel>
                    {/* Set value to state: this is for convenience */}
                    <FormInput onChangeText={(text) => this.onChange({name: "email", value: text})}  value={this.state.email} type="email" name="email" />

                    <FormLabel for="password">Password:</FormLabel>
                    <FormInput onChangeText={(text) => this.onChange({name: "password", value: text})} value={this.state.password} type="password" name="password" />

                    <Button raised onPress={this.onSubmit} title="Login" />
                    <Text>No Account? Signup!</Text>

                </Card>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    formCard: {
      flex: 1,
      backgroundColor: '#fff',
      margin: 100
}})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)