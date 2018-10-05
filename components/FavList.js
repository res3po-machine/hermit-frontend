import React, {Component} from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import { List, ListItem, Rating } from 'react-native-elements'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getTrails, getBuzz, selectOneTrail, moreTrails, resetLoad,  } from '../actions/trailActions'
import { getFavsFull } from '../actions/favActions'

const mapStateToProps = ({trails, fav_trails}) => ({trails, fav_trails})
const mapDispatchtoProps = (dispatch) => bindActionCreators({
    getTrails, getBuzz, selectOneTrail, moreTrails, resetLoad, getFavsFull
}, dispatch)

class FavList extends Component {
    async componentDidMount() {
       
        await this.props.resetLoad()
        
        // this.load()
    }

    load = async () => {
        // navigator.geolocation.getCurrentPosition(
        //     async (position) => {
        //         console.log(position)
        //         await this.props.getTrails({ 
        //             lat: position.coords.latitude,
        //             long: position.coords.longitude,
        //             maxTrail: this.props.trails.visualMax
        //         })
                // await this.props.getBuzz(this.props.trails.data, this.props.trails.date)
        //     },
        //     (error) => console.log(error)
        // )
    }

    select = (id) => {
        this.props.selectOneTrail(id)
        this.props.navigation('Profile')
    }

    loadMore = async () => {
        await this.props.moreTrails()
        await this.load()
    }

    rederFooter = () => {
        if (!this.props.trails.isLoading) return null;

        return (
        <View
            style={{
            paddingVertical: 20,
            borderTopWidth: 1,
            borderColor: "#CED0CE"
            }}
        >
            <ActivityIndicator animating size="large" />
        </View>
        );
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
                                    <Rating style={{paddingLeft: 10, paddingTop: 5}} imageSize={12} readonly fractions={1} startingValue={item.stars} /> {this.difficulty(item.difficulty)} {`  ${item.length} miles`}
                                </Text>
                            </View>
                        }
                        roundAvatar
                        avatar={{ uri: item.imgSmallMed }}
                        avatarStyle={{height: 100, width: 100, alignSelf: "flex-end", borderRadius: 50 }}
                        avatarContainerStyle={{width: 50}}
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

const styles = StyleSheet.create({
    subtitle: {
        flexDirection: 'row',
        paddingLeft: 10
    }
})

export default connect(mapStateToProps, mapDispatchtoProps)(FavList)