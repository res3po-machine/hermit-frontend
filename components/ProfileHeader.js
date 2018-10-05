import React, {Component} from 'react'
import { View, Text, FlatList, StyleSheet, AsyncStorage, ScrollView } from 'react-native'
import { Avatar, Card, Divider, ButtonGroup, Rating, Icon, ListItem, Tile } from 'react-native-elements'
import moment from 'moment'
import FavHeart from './FavHeart'
import { DoubleCircleLoader } from 'react-native-indicator'

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
        const regTrail = this.props.trails.data.find(trail => trail.id === this.props.trails.trailSelect)
        const favTrail = this.props.fav_trails.full.find(trail => trail.id === this.props.trails.trailSelect)
        const thisTrail = regTrail ? regTrail : favTrail
        console.log(thisTrail)
        await this.props.getBuzz(thisTrail, this.props.trails.date)
        await this.props.getFavsTrail(thisTrail.id, token.token)
    }

    difficulty = (diffCode) => {
        switch (diffCode) {
            case "green": 
                return <Text style={{color: "green", fontWeight: 'bold'}}>Easy</Text>
            case "greenBlue":
                return <Text style={{color: "teal", fontWeight: 'bold'}}>Easy/Int</Text>
            case "blue":
                return <Text style={{color: "orange", fontWeight: 'bold'}}>Intermediate</Text>
            case "blueBlack":
                return <Text style={{color: "red", fontWeight: 'bold'}}>Int/Hard</Text>
            case "black":
                return <Text style={{color: 'black', fontWeight: 'bold'}}>Hard</Text>
            default:
                return <Text>Diff Unknown</Text>
        }
    }

    buzzTranslate = (buzz) => {
        console.log(typeof buzz)
        if (!buzz || buzz === null || buzz === 0) return <Text>Relatively Empty</Text>
        if (buzz > 0 && buzz <= 10) return <Text>Sparsely Populated</Text>
        if (buzz > 10 && buzz <= 30) return <Text>Regular Traffic</Text>
        if (buzz > 30) return <Text>Highly Populated</Text>
    }

    render() {
        const regTrail = this.props.trails.data.find(trail => trail.id === this.props.trails.trailSelect)
        const favTrail = this.props.fav_trails.full.find(trail => trail.id === this.props.trails.trailSelect)
        const thisTrail = regTrail ? regTrail : favTrail
        return (
            <ScrollView style={{backgroundColor: '#fff'}}>
                <Tile
                    imageSrc={{uri: thisTrail.imgMedium}}
                    activeOpacity={1}
                    featured
                    title={thisTrail.name}
                    />
                <Card
                containerStyle={{marginVertical: 0, marginHorizontal: 0}}
                // image={{uri: thisTrail.imgMedium}}
                // imageStyle={{borderRadius: 50}}
                >
                <ListItem
                    hideChevron
                    leftIcon={
                        <Icon
                        name='ellipsis-h'
                        type='font-awesome'
                        color='grey' />
                    }
                    subtitle={thisTrail.summary}
                    subtitleStyle={{flexWrap: 'wrap', paddingLeft: 10}}
                    subtitleContainerStyle={{flexDirection: 'row-reverse'}}
                    subtitleNumberOfLines={10}
                    />
                <ListItem
                    hideChevron
                    leftIcon={
                        <Icon
                        name='balance-scale'
                        type='font-awesome'
                        color='grey' />
                    }
                    subtitle={this.difficulty(thisTrail.difficulty)}
                    subtitleContainerStyle={{flexDirection: 'row-reverse'}}
                    />
                <ListItem
                    hideChevron
                    leftIcon={
                        <Icon
                        name='star'
                        type='font-awesome'
                        color='grey' />
                    }
                    subtitle={<Rating 
                        imageSize={20} 
                        readonly 
                        fractions={1} 
                        startingValue={thisTrail.stars} />}
                    subtitleContainerStyle={{flexDirection: 'row-reverse'}}
                    />
                <ListItem
                    hideChevron
                    leftIcon={
                        <FavHeart />
                    }
                    subtitle={
                        <Text>
                            <Icon name="heart" type="font-awesome" color="red" size={15} />'s ({this.props.fav_trails.isLoading ? <DoubleCircleLoader size={20} color="#FFAB33"/> : this.props.fav_trails.count})
                        </Text>
                    }
                    subtitleContainerStyle={{flexDirection: 'row-reverse'}}
                    />
                <ListItem
                    hideChevron
                    containerStyle={{borderBottomWidth: 0}}
                    title={
                        <Text style={{fontSize: 16, alignSelf: 'center'}}>
                            For {moment(this.props.trails.date).format("MMM Do YYYY")}, expect:
                        </Text>
                    }
                    
                    subtitle={this.props.trails.buzzLoading ? <DoubleCircleLoader size={20} color="#FFAB33"/> : this.buzzTranslate(this.props.trails.buzz)}
                    subtitleContainerStyle={{alignSelf: 'center', paddingTop: 5}}
                    />
                    
                    {/* Re-Add this feature when pictures are incorporated */}
                    {/* <ButtonGroup
                        buttons={['COMMENTS', 'PICS']}
                        containerStyle={{height: 40}}
                        selectedIndex={this.props.trails.profView}
                        onPress={() => this.props.switchView(this.props.trails.profView)} /> */}
                </Card>
            </ScrollView>
        )
    }
}

export default connect(mapStateToProps, maptDispatchtoProps)(ProfileHeader)