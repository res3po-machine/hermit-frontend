import React from 'react';
import { Platform, StyleSheet, View, AsyncStorage } from 'react-native';

import Toolbar from '../components/Toolbar'
import TrailList from '../components/TrailList'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getFavsUser } from '../actions/favActions'
import { getUser } from '../actions/userActions'

const mapStateToProps = ({fav_trails}) => ({fav_trails})
const mapDispatchtoProps = (dispatch) => bindActionCreators({
  getFavsUser, getUser
}, dispatch)

class TrailsScreen extends React.Component {
  static navigationOptions = {
    title: 'Local Trails',
    headerMode: 'screen',
    headerTintColor: '#fff',
    headerStyle: {
        backgroundColor: '#448A34',
      },
  };

  componentDidMount = async () => {
    const preToken = await AsyncStorage.getItem('hermitToken')
    const token = JSON.parse(preToken)
    await this.props.getFavsUser(token.id, token.token)
    await this.props.getUser(token)
} 

  render() {
    return (
      <View style={styles.container}>

        <Toolbar />
        <TrailList navigation={this.props.navigation.navigate} />

      </View>
    );
  }

}

export default connect(mapStateToProps, mapDispatchtoProps)(TrailsScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  }
});
