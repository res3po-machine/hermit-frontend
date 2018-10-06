import React, {Component} from 'react'
import { Text } from 'react-native'

import { connect } from 'react-redux'

// Will be used to build Image View for Image features later

const mapStateToProps = ({trails}) => ({trails})

class ImageView extends Component {
    render() {
        return (
            <Text>Image</Text>
        )
    }
}

export default connect(mapStateToProps)(ImageView)