import React, {Component} from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Icon } from 'react-native-elements'
import { Calendar } from 'react-native-calendars'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { dateChange, getTrails, getBuzz } from '../actions/trailActions'

const mapStateToProps = ({trails}) => ({trails})
const mapDispatchtoProps = (dispatch) => bindActionCreators({
    dateChange, getTrails, getBuzz
}, dispatch)

class Toolbar extends Component {
    constructor(props) {
        super(props)
        this.state={
            showCal: false
        }
    }

    dateChange = async (day) => {
        this.setState({showCal: false})
        console.log(day)
        this.props.dateChange(day.dateString)
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                console.log(position)
                await this.props.getTrails({ 
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                })
                await this.props.getBuzz(this.props.trails.data, this.props.trails.date)
            },
            (error) => console.log(error)
        )
    }

    render() {
        return (
            <View>
                <View style={styles.container}>
                    <Icon
                    iconStyle={{paddingVertical: 5, paddingHorizontal: 5, alignSelf: 'flex-start'}}
                    color="white"
                    name='calendar'
                    type="font-awesome"
                    onPress={() => this.setState({showCal: !this.state.showCal})} />
                </View>
                {this.state.showCal ? <Calendar onDayPress={(day) => this.dateChange(day)} style={styles.cal} minDate={new Date(Date.now())} /> : ''}
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        // position: 'absolute',
        // top: 0,
        // left: 0,
        // right: 0,
        height: 35,
        backgroundColor: 'orange',
        elevation: 4,
    },
    cal: {
        paddingVertical: 5
    }
});

export default connect(mapStateToProps, mapDispatchtoProps)(Toolbar)