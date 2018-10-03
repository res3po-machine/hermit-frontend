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
    headerMode: 'screen',
    headerTintColor: '#000000',
    headerStyle: {
        backgroundColor: 'rgba(255, 171,51, 1)',
    }
  };

  render() {
    return (

        <View style={styles.container}>

            <LoginForm navigation={this.props.navigation.navigate}/>
            <Button 
            title="No Account? Sign-up!" 
            onPress={() => this.props.navigation.navigate('SignUp')}
            buttonStyle={{
                backgroundColor: "#448A34",
                width: 300,
                height: 45,
                borderColor: "transparent",
                borderWidth: 0,
                borderRadius: 100
              }} />
            
        </View>
    )
  }

}

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center', 
    backgroundColor: '#403f41'
  },
  form: {
    marginHorizontal: 10
  }
});
