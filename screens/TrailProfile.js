import React, { Component } from 'react'
import { ScrollView, StyleSheet, View } from 'react-native'

import { connect } from 'react-redux'

import ProfileHeader from '../components/ProfileHeader'
import CommentsList from '../components/CommentsList'
import ImageView from '../components/ImageView'


const mapStatetoProps = ({trails}) => ({trails})

class TrailsProfile extends Component {
    constructor(props) {
        super(props)
        this.state = {
            trail: this.props.trails.data.find(trail => trail.id === this.props.trails.trailSelect) || null
        }
    }

    static navigationOptions = {
        title: 'Details',
        headerMode: 'screen',
        headerTintColor: '#fff',
        headerStyle: {
            backgroundColor: '#448A34',
        },
    }

    render() {
        return (
            <View>
                 <ScrollView style={styles.container}>
                    <ProfileHeader />

                    {/* This turinary will be used when picture-view is incorporated into the app */}
                    {this.props.trails.profView === 0 ? 
                        <CommentsList navigation={this.props.navigation.navigate} /> : 
                        <ImageView />}

                 </ScrollView>
            </View>

        )
    }
}

export default connect(mapStatetoProps)(TrailsProfile)

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    }
})