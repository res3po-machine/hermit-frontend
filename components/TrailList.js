import React, {Component} from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { ListItem, Rating } from 'react-native-elements'

import { Location, Permissions } from 'expo'

import { DoubleCircleLoader } from 'react-native-indicator'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getTrails, getBuzz, selectOneTrail, moreTrails, resetLoad } from '../actions/trailActions'

const mapStateToProps = ({trails}) => ({trails})
const mapDispatchtoProps = (dispatch) => bindActionCreators({
    getTrails, getBuzz, selectOneTrail, moreTrails, resetLoad
}, dispatch)

class TrailList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            sortedData: []
        }
    }

    componentDidMount = async () => {
        await this.props.resetLoad()
        await this.load()
    }

    _getLocationAsync = async () => {
        try {
            let { status } = await Permissions.askAsync(Permissions.LOCATION)
            // Must add route if user says 'no'
    
            let location = await Location.getCurrentPositionAsync({})
            return location
        } catch (e) {
            console.log(e)
        }
    }

    load = async () => {
        try {
            const location = await this._getLocationAsync()
            await this.props.getTrails({
                lat: location.coords.latitude,
                long: location.coords.longitude,
                maxTrail: this.props.trails.visualMax,
                maxLength: this.props.trails.maxLength,
                minLength: this.props.trails.minLength
            })
        } catch (e) {
            console.log(e)
        }
    }

    select = (id) => {
        this.props.selectOneTrail(id)
        this.props.navigation('Profile')
    }

    loadMore = async () => {
        setTimeout(async () => {
            await this.props.moreTrails()
            await this.load()
        }, 1000)
        
    }

    rederFooter = () => {
        if (!this.props.trails.isLoading) return null;
        return (
        <View style={styles.loader}>
           <DoubleCircleLoader size={80} color="#FFAB33"/>
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
        let data = this.props.trails.sort.function(this.props.trails.data)
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
                                    style={styles.rating} 
                                    imageSize={12} 
                                    readonly 
                                    fractions={1} 
                                    startingValue={item.stars} /> 
                                    {this.difficulty(item.difficulty)} 
                                    {`  ${item.length} miles`}
                                </Text>
                            </View>
                        }
                        roundAvatar
                        avatar={item.imgSmallMed.length > 0 ? 
                                    { uri: item.imgSmallMed } : 
                                    { uri: 'https://dummyimage.com/100x100/ffffff/525152&text=?' }}
                        avatarStyle={styles.avatarStyle}
                        avatarContainerStyle={styles.avatarContainer}
                        />
                    )
                }}
                ListFooterComponent={this.rederFooter}
                refreshing={true}
                onEndReached={async () => await this.loadMore()}
                onEndThreshold={0.001}
                /> 
       )
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(TrailList)

const styles = StyleSheet.create({
    subtitle: {
        flexDirection: 'row',
        paddingLeft: 10
    },
    loader: {
        paddingVertical: 20,
        borderTopWidth: 1,
        borderColor: "#CED0CE",
        alignItems: "center"
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
    rating: {
        paddingLeft: 10, 
        paddingTop: 5
    },
    avatarStyle: {
        height: 100, 
        width: 100, 
        alignSelf:'flex-end', 
        borderRadius: 50 
    },
    avatarContainer: {
        width: 50
    }
})