import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import { WebBrowser } from 'expo';
import { AsyncStorage } from 'react-native'
import { SearchBar, Icon } from 'react-native-elements'

import { MonoText } from '../components/StyledText';
import LoginForm from '../components/LoginForm';
import FavList from '../components/FavList'
import FavToolbar from '../components/FavToolbar'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getFavsUser, getFavsFull } from '../actions/favActions'

const mapStateToProps = ({fav_trails}) => ({fav_trails})
const mapDispatchtoProps = (dispatch) => bindActionCreators({
  getFavsUser, getFavsFull
}, dispatch)

class FavTrailsScreen extends React.Component {
  static navigationOptions = {
    title: 'My Fav Trails',
    headerMode: 'screen',
    headerTintColor: '#fff',
    headerStyle: {
        backgroundColor: '#8A3434',
      },
  };

  componentDidMount = async () => {
    const preToken = await AsyncStorage.getItem('hermitToken')
    const token = JSON.parse(preToken)
    // console.log('hi')
    await this.props.getFavsUser(token.id, token.token)
    const favs = this.props.fav_trails.favs.map(fav => fav.trail_id)
    // console.log(favs)
    await this.props.getFavsFull(favs)
} 

  render() {
    console.log(this.props)
    return (
      <View style={{flex: 1, backgroundColor: "white"}}>
        <FavToolbar />
        <ScrollView>
          <FavList navigation={this.props.navigation.navigate} />
        </ScrollView>

      </View>
    );
  }

}

export default connect(mapStateToProps, mapDispatchtoProps)(FavTrailsScreen)