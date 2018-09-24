import React, {Component} from 'react'
import { View, Text, Image, StyleSheet, Picker, ScrollView } from 'react-native'
import { Card, Button, FormLabel, FormInput} from 'react-native-elements'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { userSignup } from '../actions/userActions'

const mapStateToProps = ({users}) => ({users})
const mapDispatchToProps = (dispatch) => bindActionCreators({
    userSignup
}, dispatch)

class SignupForm extends Component {
    constructor(props) {
        super(props)
        this.state = {
            firstName: '',
            lastName: '',
            email: '',
            password: '',
            password2: '',
            profficiency: '',
            error: ''
        }
    }

    onChange = (e) => {
        this.setState({
            ...this.state,
            [e.name]: e.value
        })
    }

    onSubmit = async (e) => {
        e.preventDefault()
        try {
            await this.props.userSignup(this.state)
            this.setState({
                firstName: '',
                lastName: '',
                email: '',
                username: '',
                password: '',
                password2: '',
                proff: '',
                error: ''
            })
            this.props.navigation('AuthLoading')

        } catch (e) {
            console.log(e)
        }

    }

    render = () => {
        return (
            <View>
                <Card style={styles.formCard}>
                    <ScrollView>
                        <FormLabel for="firstName">First Name:</FormLabel>
                        {/* Set value to state: this is for convenience */}
                        <FormInput onChangeText={(text) => this.onChange({name: "firstName", value: text})}  value={this.state.firstName} textContentType="name" name="firstName" />

                        <FormLabel for="lastName">Last Name:</FormLabel>
                        <FormInput onChangeText={(text) => this.onChange({name: "lastName", value: text})} value={this.state.lastName} textContentType="name" name="lastName" />

                        <FormLabel for="email">Email:</FormLabel>
                        <FormInput onChangeText={(text) => this.onChange({name: "email", value: text})} value={this.state.email} autoCapitalize="none" textContentType="emailAddress" name="email" />

                        <FormLabel for="username">Username:</FormLabel>
                        <FormInput onChangeText={(text) => this.onChange({name: "username", value: text})} value={this.state.username} autoCapitalize="none" textContentType="username" name="username" />

                        <FormLabel for="proff">Hiking Profficiency:</FormLabel>
                        <Picker selectedValue={this.state.proff} onValueChange={(text) => this.onChange({name: "proff", value: text})} name="proff">
                            <Picker.Item label="Advanced" value="Advanced" />
                            <Picker.Item label="Intermediate" value="Intermediate" />
                            <Picker.Item label="Beginner" value="Beginner" />
                        </Picker>

                        <FormLabel for="password">Password:</FormLabel>
                        <FormInput onChangeText={(text) => this.onChange({name: "password", value: text})} value={this.state.password} autoCapitalize="none" textContentType="password" name="password" />

                        {/* <FormLabel for="password2">Re-Enter Password:</FormLabel>
                        <FormInput onChangeText={(text) => this.onChange({name: "password2", value: text})} value={this.state.password2} autoCapitalize="none" textContentType="password" name="password2" /> */}

                        <Button raised onPress={this.onSubmit} title="Signup" />

                    </ScrollView>


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

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm)