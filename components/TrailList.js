import React, {Component} from 'react'
import { View, Text, FlatList, StyleSheet } from 'react-native'
import { List, ListItem } from 'react-native-elements'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { getTrails } from '../actions/trailActions'

const mapStateToProps = ({trails}) => ({trails})
const mapDispatchtoProps = (dispatch) => bindActionCreators({
    getTrails
}, dispatch)

class TrailList extends Component {
    async componentDidMount() {


        // console.log('hi', navigator)
        navigator.geolocation.getCurrentPosition(
            (position) => {
                console.log(position)
                this.props.getTrails({ 
                    lat: position.coords.latitude,
                    long: position.coords.longitude
                })
            },
            (error) => console.log(error)
        )
        // console.log(this.props.trails.data)
        // this.props.getTrails()
    }
    
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
                                <Text style={styles.subtitle}>Stars: {item.stars} | Difficulty: {item.difficulty}</Text>
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