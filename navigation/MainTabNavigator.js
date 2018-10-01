import React from 'react';
import { Platform } from 'react-native';
import { createStackNavigator, createBottomTabNavigator } from 'react-navigation';

import TabBarIcon from '../components/TabBarIcon';
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
    <TabBarIcon
      focused={focused}
      name={
        Platform.OS === 'ios'
          ? `ios-information-circle${focused ? '' : '-outline'}`
          : 'md-information-circle'
      }
    />
  ),
};

const FavsStack = createStackNavigator({
  Favs: FavTrailsScreen,
  Profile: TrailsProfile
});

FavsStack.navigationOptions = {
  tabBarLabel: 'Favs',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-link${focused ? '' : '-outline'}` : 'md-link'}
    />
  ),
};

const UserStack = createStackNavigator({
  Profile: UserProfile,
});

UserStack.navigationOptions = {
  tabBarLabel: 'User',
  tabBarIcon: ({ focused }) => (
    <TabBarIcon
      focused={focused}
      name={Platform.OS === 'ios' ? `ios-options${focused ? '' : '-outline'}` : 'md-options'}
    />
  ),
};

export default createBottomTabNavigator({
  TrailsStack,
  FavsStack,
  UserStack,
});
