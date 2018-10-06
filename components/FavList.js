import React, {Component} from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { ListItem, Rating } from 'react-native-elements'

import { DoubleCircleLoader } from 'react-native-indicator'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getTrails, getBuzz, selectOneTrail, moreTrails, resetLoad,  } from '../actions/trailActions'
import { getFavsFull } from '../actions/favActions'

const mapStateToProps = ({trails, fav_trails}) => ({trails, fav_trails})
const mapDispatchtoProps = (dispatch) => bindActionCreators({
    getTrails, getBuzz, selectOneTrail, moreTrails, resetLoad, getFavsFull
}, dispatch)

class FavList extends Component {
    componentDidMount = async () => {
        await this.props.resetLoad()
    }

    select = (id) => {
        this.props.selectOneTrail(id)
        this.props.navigation('Profile')
    }

    rederFooter = () => {
        if (!this.props.fav_trails.isLoading) return null;
        return (
        <View
        style={styles.loader} >
            <DoubleCircleLoader 
                size={20} 
                color="#FFAB33" />
        </View>
        );
    }

    difficulty = (diffCode) => {
        switch (diffCode) {
            case "green": 
                return <Text style={styles.easy}>Easy</Text>
            case "greenBlue":
                return <Text style={styles.easyInt}>Easy/Int</Text>
            case "blue":
                return <Text style={styles.int}>Intermediate</Text>
            case "blueBlack":
                return <Text style={styles.intHard}>Int/Hard</Text>
            case "black":
                return <Text style={styles.hard}>Hard</Text>
            default:
                return <Text>Diff Unknown</Text>
        }
    }
    
    render() {
        let data = this.props.trails.sort.function(this.props.fav_trails.full)
        return (
                <FlatList
                data={data}
                keyExtractor={item => `${item.id}`}
                renderItem={({ item }) => {
                    return (
                        <ListItem 
                        onPress={() => this.select(item.id)}
                        title={item.name}
                        subtitle={
                            <View>
                                <Text style={styles.subtitle}>{item.location}</Text>
                                <Text style={styles.subtitle}>
                                    <Rating 
                                    style={styles.rating} imageSize={12} 
                                    readonly 
                                    fractions={1} 
                                    startingValue={item.stars} /> 
                                    {this.difficulty(item.difficulty)} {`  ${item.length} miles`}
                                </Text>
                            </View>
                        }
                        roundAvatar
                        avatar={{ uri: item.imgSmallMed }}
                        avatarStyle={styles.avatarStyle}
                        avatarContainerStyle={styles.avatarContainer}
                        />
                    )
                }}
                ListFooterComponent={this.rederFooter}
                refreshing={true}
                onEndReached={this.loadMore}
                onEndReachedThreshold={0}
                />
            
       )
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(FavList)

const styles = StyleSheet.create({
    loader: {
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: "#CED0CE"
    },
    easy: {
        color: "green"
    },
    easyInt: {
        color: "teal"
    },
    int: {
        color: "orange"
    },
    intHard: {
        color: "red"
    },
    hard: {
        color: 'black'
    },
    subtitle: {
        flexDirection: 'row',
        paddingLeft: 10
    },
    rating: {
        paddingLeft: 10, 
        paddingTop: 5
    },
    avatarStyle: {
        height: 100, 
        width: 100, 
        alignSelf: "flex-end", 
        borderRadius: 50 
    },
    avatarContainer: {
        width: 50
    }
})