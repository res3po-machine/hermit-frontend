import React, {Component} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Button, FormInput} from 'react-native-elements'

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

    onChange = (input) => {
        this.setState({
            ...this.state,
            [input.name]: input.value
        })
    }

    onSubmit = async () => {
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
            <View style={styles.container}>

                <Text style={styles.title}>Login</Text>

                <View style={styles.inputContainer}>
                    <FormInput 
                    shake={this.props.users.showLoginError}
                    placeholder="Email" 
                    placeholderTextColor="#fff"
                    inputStyle={styles.input}
                    onChangeText={(text) => this.onChange({name: "email", value: text})} 
                    value={this.state.email} 
                    autoCapitalize="none" 
                    textContentType="emailAddress" 
                    name="email" />
                </View>

                <View style={styles.inputContainer}>
                    <FormInput 
                    shake={this.props.users.showLoginError}
                    placeholder="Password" 
                    placeholderTextColor="#fff"
                    inputStyle={styles.input}
                    onChangeText={(text) => this.onChange({name: "password", value: text})} 
                    value={this.state.password} 
                    autoCapitalize="none" 
                    secureTextEntry={true} 
                    name="password" />
                </View>

                <Button 
                raised 
                loading={this.props.users.isLoading}
                onPress={this.onSubmit} 
                title="LOGIN"
                buttonStyle={styles.buttonStyle} />

                {this.props.users.showLoginError ? 
                    <Text style={{color: "#fff", alignSelf: 'center'}}>* Either your email or password is incorrect</Text> : 
                    ''}

            </View>
        )
    }

}

const styles = StyleSheet.create({
    container: {
        paddingBottom: 20, 
        width: 350, 
        alignContent: 'center'
    },
    title: {
        fontSize: 25, 
        fontWeight: 'bold', 
        alignSelf: 'center', 
        paddingBottom: 10, 
        color: '#fff'
    },
    inputContainer: {
        paddingVertical: 10
    },
    input: {
        color: "#fff"
    },
    buttonStyle: {
        alignSelf: 'center',
        backgroundColor: "rgba(255, 171,51, 1)",
        width: 300,
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 100
    }
})

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)