import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  ListView,
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
import TrailList from '../components/TrailList'
import Toolbar from '../components/Toolbar'

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
    title: 'Local Trails'
  };

  componentDidMount = async () => {
    const preToken = await AsyncStorage.getItem('hermitToken')
    const token = JSON.parse(preToken)
    console.log('hi')
    await this.props.getFavsUser(token.id, token.token)
    await this.props.getUser(token)
} 

  render() {
    console.log(this.props)
    return (
      <View style={styles.container}>
        <Toolbar />
        {/* <ScrollView contentContainerStyle={styles.contentContainer}> */}
          <TrailList navigation={this.props.navigation.navigate} />
        {/* </ScrollView> */}

      </View>
    );
  }

}

export default connect(mapStateToProps, mapDispatchtoProps)(TrailsScreen)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  developmentModeText: {
    marginBottom: 20,
    color: 'rgba(0,0,0,0.4)',
    fontSize: 14,
    lineHeight: 19,
    textAlign: 'center',
  },
  contentContainer: {
    paddingTop: 0,
    position: 'relative',
    // height: 1500
  },
  welcomeContainer: {
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 20,
  },
  welcomeImage: {
    width: 100,
    height: 80,
    resizeMode: 'contain',
    marginTop: 3,
    marginLeft: -10,
  },
  getStartedContainer: {
    alignItems: 'center',
    marginHorizontal: 50,
  },
  homeScreenFilename: {
    marginVertical: 7,
  },
  codeHighlightText: {
    color: 'rgba(96,100,109, 0.8)',
  },
  codeHighlightContainer: {
    backgroundColor: 'rgba(0,0,0,0.05)',
    borderRadius: 3,
    paddingHorizontal: 4,
  },
  getStartedText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    lineHeight: 24,
    textAlign: 'center',
  },
  tabBarInfoContainer: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    ...Platform.select({
      ios: {
        shadowColor: 'black',
        shadowOffset: { height: -3 },
        shadowOpacity: 0.1,
        shadowRadius: 3,
      },
      android: {
        elevation: 20,
      },
    }),
    alignItems: 'center',
    backgroundColor: '#fbfbfb',
    paddingVertical: 20,
  },
  tabBarInfoText: {
    fontSize: 17,
    color: 'rgba(96,100,109, 1)',
    textAlign: 'center',
  },
  navigationFilename: {
    marginTop: 5,
  },
  helpContainer: {
    marginTop: 15,
    alignItems: 'center',
  },
  helpLink: {
    paddingVertical: 15,
  },
  helpLinkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
