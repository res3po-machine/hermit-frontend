import React, {Component} from 'react'
import { Text, StyleSheet, Picker, ScrollView } from 'react-native'
import { Button, FormLabel, FormInput} from 'react-native-elements'

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

    onChange = (input) => {
        this.setState({
            ...this.state,
            [input.name]: input.value
        })
    }

    onSubmit = async () => {
        try {
            await this.props.userSignup(this.state)
            if (!this.props.users.showSignupError) {
                this.setState({
                    firstName: '',
                    lastName: '',
                    email: '',
                    username: '',
                    password: '',
                    proff: '',
                    error: ''
                })
                this.props.navigation('AuthLoading')
            }
        } catch (e) {
            console.log(e)
        }

    }

    render = () => {
        return (
            <ScrollView 
            contentContainerStyle={styles.container}>

                <FormInput 
                onChangeText={(text) => this.onChange({name: "firstName", value: text})} 
                value={this.state.firstName} 
                textContentType="name" 
                placeholder="First Name"
                placeholderTextColor="#fff"
                inputStyle={styles.input} />

                <FormInput 
                onChangeText={(text) => this.onChange({name: "lastName", value: text})} 
                value={this.state.lastName} 
                textContentType="name" 
                placeholder="Last Name"
                placeholderTextColor="#fff"
                inputStyle={styles.input} />

                <FormInput 
                onChangeText={(text) => this.onChange({name: "email", value: text})} 
                value={this.state.email} 
                autoCapitalize="none" 
                textContentType="emailAddress" 
                placeholder="Email"
                placeholderTextColor="#fff"
                inputStyle={styles.input} />

                <FormInput 
                onChangeText={(text) => this.onChange({name: "username", value: text})} 
                value={this.state.username} 
                autoCapitalize="none" 
                textContentType="username" 
                placeholder="Username"
                placeholderTextColor="#fff"
                inputStyle={styles.input} />

                <FormLabel labelStyle={styles.input} for="proff">Hiking Profficiency:</FormLabel>
                <Picker 
                selectedValue={this.state.proff} 
                onValueChange={(text) => this.onChange({name: "proff", value: text})} 
                name="proff"
                itemStyle={styles.input}>
                    <Picker.Item label="Advanced" value="Advanced" />
                    <Picker.Item label="Intermediate" value="Intermediate" />
                    <Picker.Item label="Beginner" value="Beginner" />
                </Picker>

                <FormInput 
                onChangeText={(text) => this.onChange({name: "password", value: text})} 
                value={this.state.password} 
                autoCapitalize="none" 
                secureTextEntry={true}
                placeholder="Password"
                placeholderTextColor="#fff"
                inputStyle={styles.input} />

                {this.props.users.showSignupError ? 
                    <Text style={styles.error}>* Please Make Sure All Forms Are Filled</Text> : 
                    ''}

                <Button 
                raised 
                loading={this.props.users.isLoading}
                onPress={this.onSubmit} 
                title="SIGN UP"
                buttonStyle={styles.buttonStyle} />

            </ScrollView>
        )
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(SignupForm)

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-around', 
        width: 350, 
        height: 700
    },
    input: {
        color: '#fff'
    },
    error: {
        color: '#fff', 
        alignSelf: 'center'
    },
    buttonStyle: {
        backgroundColor: "rgba(255, 171,51, 1)",
        width: 300,
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 100
    }
})