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

    onSubmit = async (e) => {
        e.preventDefault()
        try {
            await this.props.userLogin(this.state)
            if (!this.props.users.showLoginError) {
                this.setState({
                    email: '',
                    password: ''
                })
                this.props.navigation('AuthLoading')
            }

        } catch (e) {
            console.log(e)
        }

    }

    render = () => {
        return (
            <View style={{paddingBottom: 20}}>

                <Card 
                containerStyle={styles.formCard}>
 
                    {/* <FormLabel for="email">Email:</FormLabel> */}
                    {/* Set value to state: this is for convenience */}
                    <View style={{paddingVertical: 10}}>
                        <FormInput 
                        shake={this.props.users.showLoginError}
                        errorStyle={{color: 'red'}}
                        error="ERROR"
                        placeholder="Email" 
                        placeholderTextColor="#fff"
                        inputStyle={{color: "#fff"}}
                        onChangeText={(text) => this.onChange({name: "email", value: text})} 
                        value={this.state.email} 
                        autoCapitalize="none" 
                        textContentType="emailAddress" 
                        name="email" />
                    </View>

                    <View style={{paddingVertical: 10}}>
                        <FormInput 
                        shake={this.props.users.showLoginError}
                        placeholder="Password" 
                        placeholderTextColor="#fff"
                        inputStyle={{color: "#fff"}}
                        onChangeText={(text) => this.onChange({name: "password", value: text})} 
                        value={this.state.password} 
                        autoCapitalize="none" 
                        secureTextEntry={true} 
                        name="password" />
                    </View>
                    {/* <FormLabel for="password">Password:</FormLabel> */}

                    <Button 
                    raised 
                    onPress={this.onSubmit} 
                    title="LOGIN"
                    buttonStyle={{
                        backgroundColor: "rgba(255, 171,51, 1)",
                        width: 300,
                        height: 45,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 100
                      }} />

                      {this.props.users.showLoginError ? <Text style={{color: "#fff", alignSelf: 'center'}}>* Either your email or password is incorrect</Text> : ''}

                </Card>

            </View>
        )
    }

}

const styles = StyleSheet.create({
    formCard: {
        justifyContent: 'space-between',
        // alignContent: 'space-around',
        // alignContent: 'center',
      backgroundColor: '#403f41',
      borderColor: 'transparent',
      width: 350,
      height: 200
}})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)