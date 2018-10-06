import React from 'react';
import { AsyncStorage, ScrollView, StyleSheet, View } from 'react-native';

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getFavsUser, getFavsFull } from '../actions/favActions'

import FavToolbar from '../components/FavToolbar'
import FavList from '../components/FavList'

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
    await this.props.getFavsUser(token.id, token.token)
    const favs = this.props.fav_trails.favs.map(fav => fav.trail_id)
    await this.props.getFavsFull(favs)
} 

  render() {
    return (
      <View style={styles.container}>

        <FavToolbar />
        <ScrollView>
          <FavList navigation={this.props.navigation.navigate} />
        </ScrollView>

      </View>
    );
  }

}

export default connect(mapStateToProps, mapDispatchtoProps)(FavTrailsScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1, 
    backgroundColor: "white"
  }
})