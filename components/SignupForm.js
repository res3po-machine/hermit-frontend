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
            // <View style={{backgroundColor: "#403f41"}}>
                // <Card style={styles.formCard}>
                    <ScrollView 
                    style={{backgroundColor: "#403f41"}}
                    contentContainerStyle={{justifyContent: 'space-around', width: 350, height: 700}}>
                        {/* <FormLabel for="firstName">First Name:</FormLabel> */}
                        {/* Set value to state: this is for convenience */}
                        <FormInput 
                        onChangeText={(text) => this.onChange({name: "firstName", value: text})} 
                        value={this.state.firstName} 
                        textContentType="name" 
                        placeholder="First Name"
                        placeholderTextColor="#fff"
                        inputStyle={{color: '#fff'}} />

                        {/* <FormLabel for="lastName">Last Name:</FormLabel> */}
                        <FormInput 
                        onChangeText={(text) => this.onChange({name: "lastName", value: text})} 
                        value={this.state.lastName} 
                        textContentType="name" 
                        placeholder="Last Name"
                        placeholderTextColor="#fff"
                        inputStyle={{color: '#fff'}} />

                        {/* <FormLabel for="email">Email:</FormLabel> */}
                        <FormInput 
                        onChangeText={(text) => this.onChange({name: "email", value: text})} 
                        value={this.state.email} 
                        autoCapitalize="none" 
                        textContentType="emailAddress" 
                        placeholder="Email"
                        placeholderTextColor="#fff"
                        inputStyle={{color: '#fff'}} />

                        {/* <FormLabel for="username">Username:</FormLabel> */}
                        <FormInput 
                        onChangeText={(text) => this.onChange({name: "username", value: text})} 
                        value={this.state.username} 
                        autoCapitalize="none" 
                        textContentType="username" 
                        placeholder="Username"
                        placeholderTextColor="#fff"
                        inputStyle={{color: '#fff'}} />

                        <FormLabel labelStyle={{color: "#fff"}} for="proff">Hiking Profficiency:</FormLabel>
                        <Picker 
                        selectedValue={this.state.proff} 
                        onValueChange={(text) => this.onChange({name: "proff", value: text})} 
                        name="proff"
                        itemStyle={{color: '#fff'}}>
                            <Picker.Item label="Advanced" value="Advanced" />
                            <Picker.Item label="Intermediate" value="Intermediate" />
                            <Picker.Item label="Beginner" value="Beginner" />
                        </Picker>

                        {/* <FormLabel for="password">Password:</FormLabel> */}
                        <FormInput 
                        onChangeText={(text) => this.onChange({name: "password", value: text})} 
                        value={this.state.password} 
                        autoCapitalize="none" 
                        secureTextEntry={true}
                        placeholder="Password"
                        placeholderTextColor="#fff"
                        inputStyle={{color: '#fff'}} />

                        {/* <FormLabel for="password2">Re-Enter Password:</FormLabel>
                        <FormInput onChangeText={(text) => this.onChange({name: "password2", value: text})} value={this.state.password2} autoCapitalize="none" textContentType="password" name="password2" /> */}

                        {this.props.users.showSignupError ? <Text style={{color: '#fff', alignSelf: 'center'}}>* Please Make Sure All Forms Are Filled</Text> : ''}

                        <Button 
                        raised 
                        loading={this.props.users.isLoading}
                        onPress={this.onSubmit} 
                        title="SIGN UP"
                        buttonStyle={{
                            backgroundColor: "rgba(255, 171,51, 1)",
                            width: 300,
                            height: 45,
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 100
                          }} />

                    </ScrollView>


                // {/* </Card> */}
            // </View>
        )
    }

}

const styles = StyleSheet.create({
    formCard: {
        // justifyContent: 'space-between',
        backgroundColor: "#403f41",
        // borderColor: 'transparent',
        width: 350,
        height: 200
}})

export default connect(mapStateToProps, mapDispatchToProps)(SignupForm)