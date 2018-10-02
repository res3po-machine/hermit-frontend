import React, {Component} from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator, ListView } from 'react-native'
import { List, ListItem, Rating } from 'react-native-elements'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getTrails, getBuzz, selectOneTrail, moreTrails, resetLoad } from '../actions/trailActions'

const mapStateToProps = ({trails}) => ({trails})
const mapDispatchtoProps = (dispatch) => bindActionCreators({
    getTrails, getBuzz, selectOneTrail, moreTrails, resetLoad
}, dispatch)

class TrailList extends Component {
    async componentDidMount() {
        await this.props.resetLoad()
        this.load()
    }

    load = async () => {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                console.log(position)
                await this.props.getTrails({ 
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                    maxTrail: this.props.trails.visualMax
                })
                // await this.props.getBuzz(this.props.trails.data, this.props.trails.date)
            },
            (error) => console.log(error)
        )
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
       return (
           
                <FlatList
                data={this.props.trails.data}
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
                                    <Rating style={{paddingLeft: 10, paddingTop: 5}} imageSize={12} readonly fractions={1} startingValue={item.stars} /> {this.difficulty(item.difficulty)}
                                </Text>
                            </View>
                        }
                        avatar={item.imgSmallMed.length > 0 ? { uri: item.imgSmallMed } : { uri: 'https://dummyimage.com/100x100/ffffff/525152&text=?' }}
                        avatarStyle={{height: 80, width: 50, alignSelf: "flex-end" }}
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

const styles = StyleSheet.create({
    subtitle: {
        flexDirection: 'row',
        paddingLeft: 10
    }
})

export default connect(mapStateToProps, mapDispatchtoProps)(TrailList)