import React, {Component} from 'react'
import { View, Text, StyleSheet } from 'react-native'
import { Avatar, Card, Divider } from 'react-native-elements'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'

const mapStateToProps = ({trails}) => ({trails})
// const mapDispatchtoProps = (dispatch) => bindActionCreators({

// })

class ImageView extends Component {
    render() {
        return (
            <Text>Image</Text>
        )
    }
}

export default connect(mapStateToProps)(ImageView)