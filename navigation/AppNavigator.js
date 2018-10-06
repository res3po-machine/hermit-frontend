import { createSwitchNavigator, createStackNavigator } from 'react-navigation';

import MainTabNavigator from './MainTabNavigator';

import SplashScreen from '../screens/SplashScreen'
import LoginScreen from '../screens/LoginScreen'
import SignupScreen from '../screens/SignupScreen'
import AuthLoadingScreen from './AuthLoading'

const AuthStack = createStackNavigator({ Splash: SplashScreen, SignIn: LoginScreen, SignUp: SignupScreen })

export default createSwitchNavigator({
  AuthLoading: AuthLoadingScreen,
  Main: MainTabNavigator,
  Auth: AuthStack,
},
{
  initialRouteName: 'AuthLoading'
});