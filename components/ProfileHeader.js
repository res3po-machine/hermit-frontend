import React, {Component} from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { Avatar, Card, Divider, ButtonGroup } from 'react-native-elements'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { switchView } from '../actions/trailActions'

const mapStateToProps = ({trails}) => ({trails})
const maptDispatchtoProps = (dispatch) => bindActionCreators({
    switchView
}, dispatch)

class ProfileHeader extends Component {
    render() {
        const thisTrail = this.props.trails.data.find(trail => trail.id === this.props.trails.trailSelect)
        return (
            <Card
            title={thisTrail.name}
            image={{uri: thisTrail.imgMedium}}>
                <Text style={{marginBottom: 10}}>
                    {thisTrail.summary}
                </Text>
                <Text>
                Difficulty: {thisTrail.difficulty} | Stars: {thisTrail.stars} ({thisTrail.starVotes}) | Buzz: {thisTrail.buzz} |
                </Text>
                <Divider style={{paddingVertical: 10, backgroundColor: 'white'}} />
                <ButtonGroup
                    buttons={['COMMENTS', 'PICS']}
                    containerStyle={{height: 40}}
                    selectedIndex={this.props.trails.profView}
                    onPress={() => this.props.switchView(this.props.trails.profView)} />
            </Card>
        )
    }
}

export default connect(mapStateToProps, maptDispatchtoProps)(ProfileHeader)