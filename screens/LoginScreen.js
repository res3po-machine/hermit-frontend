import React from 'react';
import {
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { Button } from 'react-native-elements'
import { WebBrowser } from 'expo';

import { MonoText } from '../components/StyledText';
import LoginForm from '../components/LoginForm';

export default class LoginScreen extends React.Component {
  static navigationOptions = {
    title: 'Please log in',
  };

  render() {
    return (

        <View style={styles.container}>

            <LoginForm navigation={this.props.navigation.navigate}/>
            <Button title="No Account? Sign-up!" onPress={() => this.props.navigation.navigate('SignUp')} />
            
        </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: '#fff',
  }
});
