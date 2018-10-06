import React from 'react';
import { StyleSheet } from 'react-native'
import { createStackNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs'

import Icon from 'react-native-vector-icons/Foundation'
import Colors from '../constants/Colors';

import TrailsScreen from '../screens/TrailsScreen';
import TrailsProfile from '../screens/TrailProfile'
import CommentPage from '../screens/CommentPage'
import FavTrailsScreen from '../screens/FavTrailsScreen';
import UserProfile from '../screens/UserProfile';

const TrailsStack = createStackNavigator({
  Home: TrailsScreen,
  Profile: TrailsProfile,
  Comment: CommentPage
});

TrailsStack.navigationOptions = {
  tabBarLabel: 'Home',
  tabBarIcon: ({ focused }) => (
    <Icon
        name="trees"
        size={26}
        style={styles.iconStyle}
        color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
  ),
  tabBarColor: '#448A34'
};

const FavsStack = createStackNavigator({
  Favs: FavTrailsScreen,
  Profile: TrailsProfile,
  Comment: CommentPage
});

FavsStack.navigationOptions = {
  tabBarLabel: 'Favs',
  tabBarIcon: ({ focused }) => (
    <Icon
        name="heart"
        size={26}
        style={styles.iconStyle}
        color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
  ),
  tabBarColor: '#8A3434'
};

const UserStack = createStackNavigator({
  Profile: UserProfile,
});

UserStack.navigationOptions = {
  tabBarLabel: 'User',
  tabBarIcon: ({ focused }) => (
    <Icon
        name="torso"
        size={26}
        style={styles.iconStyle}
        color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
      />
  ),
  tabBarColor: '#344D8A'
};

export default createMaterialBottomTabNavigator({
  TrailsStack,
  FavsStack,
  UserStack,
},
{
  shifting: true,
  initialRouteName: 'TrailsStack',
  activeColor: '#f0edf6',
  inactiveColor: '#3e2465',
});

const styles = StyleSheet.create({
  iconStyle: { 
    marginBottom: -3 
  }
})
