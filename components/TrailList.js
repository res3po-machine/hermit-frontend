import React, {Component} from 'react'
import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native'
import { List, ListItem } from 'react-native-elements'

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
                                <Text style={styles.subtitle}>Stars: {item.stars} | Difficulty: {item.difficulty} | Buzz: {item.buzz ? item.buzz[0] : 'null'}</Text>
                            </View>
                        }
                        avatar={{ uri: item.imgSmallMed }}
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

export default connect(mapStateToProps, mapDispatchtoProps)(TrailList)