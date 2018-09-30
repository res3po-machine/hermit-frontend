import React, { Component } from 'react'
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, AsyncStorage } from 'react-native'
import ProfileHeader from '../components/ProfileHeader'
import CommentsList from '../components/CommentsList'
import ImageView from '../components/ImageView'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getFavsUser } from '../actions/favActions'

const mapStatetoProps = ({trails, fav_trails}) => ({trails, fav_trails})
// const mapDispatchtoProps = (dispatch) => bindActionCreators({
//     getFavsUser
// }, dispatch)

class TrailsProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trail: this.props.trails.data.find(trail => trail.id === this.props.trails.trailSelect) || null
        }
    }

    static navigationOptions = {
        title: 'Details'
    }


    render() {
        return (
            <View>
                <ProfileHeader />
                {this.props.trails.profView === 0 ? <CommentsList navigation={this.props.navigation.navigate} /> : <ImageView />}
            </View>

        )
    }
}

export default connect(mapStatetoProps)(TrailsProfile)