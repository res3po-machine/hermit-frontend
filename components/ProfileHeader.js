import React, {Component} from 'react'
import { Text, StyleSheet, AsyncStorage, ScrollView } from 'react-native'
import { Card, ButtonGroup, Rating, Icon, ListItem, Tile } from 'react-native-elements'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { switchView, getBuzz } from '../actions/trailActions'
import { getFavsTrail } from '../actions/favActions'

import { DoubleCircleLoader } from 'react-native-indicator'
import moment from 'moment'
import FavHeart from './FavHeart'

const mapStateToProps = ({trails, fav_trails}) => ({trails, fav_trails})
const maptDispatchtoProps = (dispatch) => bindActionCreators({
    switchView, getBuzz, getFavsTrail
}, dispatch)

class ProfileHeader extends Component {
    componentDidMount = async () => {
        const token = await this.getToken()
        const regTrail = this.props.trails.data.find(trail => trail.id === this.props.trails.trailSelect)
        const favTrail = this.props.fav_trails.full.find(trail => trail.id === this.props.trails.trailSelect)
        const thisTrail = regTrail ? regTrail : favTrail
        await this.props.getBuzz(thisTrail, this.props.trails.date)
        await this.props.getFavsTrail(thisTrail.id, token.token)
    }

    getToken = async () => {
        const preToken = await AsyncStorage.getItem('hermitToken')
        return JSON.parse(preToken)
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
        if (!buzz || buzz === null || buzz === 0) return <Text>Relatively Empty</Text>
        if (buzz > 0 && buzz <= 10) return <Text>Sparsely Populated</Text>
        if (buzz > 10 && buzz <= 30) return <Text>Regular Traffic</Text>
        if (buzz > 30) return <Text>Highly Populated</Text>
    }

    render() {
        // Not super efficient; revisit
        const regTrail = this.props.trails.data.find(trail => trail.id === this.props.trails.trailSelect)
        const favTrail = this.props.fav_trails.full.find(trail => trail.id === this.props.trails.trailSelect)
        const thisTrail = regTrail ? regTrail : favTrail
        return (
            <ScrollView style={styles.container}>

                <Tile
                imageSrc={{uri: thisTrail.imgMedium}}
                activeOpacity={1}
                featured
                title={thisTrail.name}
                />

                <Card
                containerStyle={styles.profileContainer}>

                    <ListItem
                    hideChevron
                    leftIcon={
                        <Icon
                        name='ellipsis-h'
                        type='font-awesome'
                        color='grey' />
                    }
                    subtitle={thisTrail.summary}
                    subtitleStyle={styles.subText}
                    subtitleContainerStyle={styles.subContainer}
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
                    subtitleContainerStyle={styles.subContainer}
                    />
                    <ListItem
                    hideChevron
                    leftIcon={
                        <Icon
                        name='star'
                        type='font-awesome'
                        color='grey' />
                    }
                    subtitle={
                        <Rating 
                        imageSize={20} 
                        readonly 
                        fractions={1} 
                        startingValue={thisTrail.stars} />
                    }
                    subtitleContainerStyle={styles.subContainer}
                    />
                    <ListItem
                    hideChevron
                    leftIcon={
                        <FavHeart />
                    }
                    subtitle={
                        <Text>
                            <Icon 
                            name="heart" 
                            type="font-awesome" 
                            color="red" 
                            size={15} />'s ({this.props.fav_trails.isLoading ? 
                                                <DoubleCircleLoader size={20} color="#FFAB33"/> : 
                                                this.props.fav_trails.count})
                        </Text>
                    }
                    subtitleContainerStyle={styles.subContainer}
                    />
                    <ListItem
                    hideChevron
                    containerStyle={styles.listBottom}
                    title={
                        <Text style={styles.prediction}>
                            For {moment(this.props.trails.date).format("MMM Do YYYY")}, expect:
                        </Text>
                    }
                    subtitle={this.props.trails.buzzLoading ? 
                                <DoubleCircleLoader size={20} color="#FFAB33"/> : 
                                this.buzzTranslate(this.props.trails.buzz)}
                    subtitleContainerStyle={styles.predictionSub}
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

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff'
    },
    profileContainer: {
        marginVertical: 0, 
        marginHorizontal: 0
    },
    subText: {
        flexWrap: 'wrap', 
        paddingLeft: 10
    },
    subContainer: {
        flexDirection: 'row-reverse'
    },
    listBottom: {
        borderBottomWidth: 0
    },
    prediction: {
        fontSize: 16, 
        alignSelf: 'center'
    },
    predictionSub: {
        alignSelf: 'center', 
        paddingTop: 5
    }
})