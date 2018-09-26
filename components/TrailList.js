import React, {Component} from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { List, ListItem } from 'react-native-elements'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getTrails, getBuzz } from '../actions/trailActions'

const mapStateToProps = ({trails}) => ({trails})
const mapDispatchtoProps = (dispatch) => bindActionCreators({
    getTrails, getBuzz
}, dispatch)

class TrailList extends Component {
    async componentDidMount() {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                console.log(position)
                await this.props.getTrails({ 
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                })
                await this.props.getBuzz(this.props.trails.data, new Date(Date.now()))
            },
            (error) => console.log(error)
        )
        
    }

    // async componentDidUpdate() {
    //     const today = new Date(Date.now())
    //     await this.props.getBuzz(this.props.trails.data, today)
    // }
    
    render() {
       return (
            <List>
                <FlatList
                data={this.props.trails.data}
                renderItem={({ item }) => {
                    return (
                        <ListItem 
                        key={item.id}
                        title={`${item.name}`}
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
                />
            </List>
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