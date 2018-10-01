import React, {Component} from 'react'
import { View, Text, FlatList, StyleSheet, AsyncStorage } from 'react-native'
import { Avatar, Card, Divider, ButtonGroup, Rating, Icon } from 'react-native-elements'
import FavHeart from './FavHeart'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { switchView, getBuzz } from '../actions/trailActions'
import { getFavsTrail } from '../actions/favActions'

const mapStateToProps = ({trails, fav_trails}) => ({trails, fav_trails})
const maptDispatchtoProps = (dispatch) => bindActionCreators({
    switchView, getBuzz, getFavsTrail
}, dispatch)

class ProfileHeader extends Component {
    async componentDidMount() {
        const preToken = await AsyncStorage.getItem('hermitToken')
        const token = JSON.parse(preToken)
        const thisTrail = this.props.trails.data.find(trail => trail.id === this.props.trails.trailSelect)
        await this.props.getBuzz(thisTrail, this.props.trails.date)
        await this.props.getFavsTrail(thisTrail.id, token.token)
    }

    difficulty = (diffCode) => {
        switch (diffCode) {
            case "green": 
                return <Text style={{color: "green"}}>Easy</Text>
            case "greenBlue":
                return <Text style={{color: "teal"}}>Easy/Int</Text>
            case "blue":
                return <Text style={{color: "orange"}}>Intermediate</Text>
            case "blueBlack":
                return <Text style={{color: "red"}}>Int/Hard</Text>
            case "black":
                return <Text style={{color: 'black'}}>Hard</Text>
            default:
                return <Text>Diff Unknown</Text>
        }
    }

    render() {
        const thisTrail = this.props.trails.data.find(trail => trail.id === this.props.trails.trailSelect)
        return (
            <Card
            title={thisTrail.name}
            image={{uri: thisTrail.imgMedium}}>
                <Text style={{marginBottom: 10}}>
                    {thisTrail.summary}
                </Text>
                <Text style={{alignSelf: "center", paddingBottom: 5}}>
                    {this.difficulty(thisTrail.difficulty)} <Rating style={{paddingHorizontal: 10, paddingTop: 5}} imageSize={15} readonly fractions={1} startingValue={thisTrail.stars} /> <Icon name="heart" type="font-awesome" color="red" size={15} />'s ({this.props.fav_trails.count})
                </Text>
                <Text style={{alignSelf: "center", paddingTop: 5, paddingBottom: 10}}>
                    Buzz: {this.props.trails.buzz ? this.props.trails.buzz : "Not Enough Data"} 
                </Text>

                <FavHeart />
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