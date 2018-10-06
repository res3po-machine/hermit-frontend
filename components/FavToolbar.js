import React, {Component} from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Icon, CheckBox } from 'react-native-elements'
import { Calendar } from 'react-native-calendars'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { dateChange, getTrails, resetLoad, changeMax, changeMin, changeSort } from '../actions/trailActions'

import moment from 'moment'

const mapStateToProps = ({trails}) => ({trails})
const mapDispatchtoProps = (dispatch) => bindActionCreators({
    dateChange, getTrails, changeMax, changeMin, resetLoad, changeSort
}, dispatch)

class FavToolbar extends Component {
    constructor(props) {
        super(props)
        this.state={
            showCal: false,
            showSort: false
        }
    }

    dateChange = async (day) => {
        this.setState({showCal: false})
        this.props.dateChange(day.dateString)
    }

    sortBox = () => {
        return (
            <View style={styles.sortContainer}>

                <View style={styles.sortGroup}>
                    <CheckBox 
                    title="Difficulty Asc." 
                    onPress={() => this.props.changeSort('Difficulty Asc.')} 
                    center 
                    checked={this.props.trails.sort.type === "Difficulty Asc." ? true : false} 
                    checkedIcon='dot-circle-o' 
                    uncheckedIcon='circle-o'/>
                    <CheckBox 
                    title="Difficulty Desc." 
                    onPress={() => this.props.changeSort('Difficulty Desc.')} 
                    center 
                    checked={this.props.trails.sort.type === "Difficulty Desc." ? true : false} 
                    checkedIcon='dot-circle-o' 
                    uncheckedIcon='circle-o'/>
                </View>

                <View style={styles.sortGroup}>
                    <CheckBox 
                    title="Rating Asc." 
                    onPress={() => this.props.changeSort('Rating Asc.')} 
                    center 
                    checked={this.props.trails.sort.type === "Rating Asc." ? true : false} 
                    checkedIcon='dot-circle-o' 
                    uncheckedIcon='circle-o'/>
                    <CheckBox 
                    title="Rating Desc." 
                    onPress={() => this.props.changeSort('Rating Desc.')} 
                    center 
                    checked={this.props.trails.sort.type === "Rating Desc." ? true : false} 
                    checkedIcon='dot-circle-o' 
                    uncheckedIcon='circle-o'/>
                </View>

                <View style={styles.sortGroup}>
                    <CheckBox 
                    title="Length Asc." 
                    onPress={() => this.props.changeSort('Length Asc.')} 
                    center 
                    checked={this.props.trails.sort.type === "Length Asc." ? true : false} 
                    checkedIcon='dot-circle-o' 
                    uncheckedIcon='circle-o'/>
                    <CheckBox 
                    title="Length Desc." 
                    onPress={() => this.props.changeSort('Length Desc.')} 
                    center 
                    checked={this.props.trails.sort.type === "Length Desc." ? true : false} 
                    checkedIcon='dot-circle-o' 
                    uncheckedIcon='circle-o'/>
                </View>

                <CheckBox 
                title="Near Me" 
                onPress={() => this.props.changeSort('None')} 
                center 
                checked={this.props.trails.sort.type === "None" ? true : false} 
                checkedIcon='dot-circle-o' 
                uncheckedIcon='circle-o'/>
            </View>
        )
    }
    
    render() {
        return (
            <View>
                <View style={styles.container}>
                   
                    <Icon
                    iconStyle={styles.icon}
                    color={this.state.showCal ? '#FFAB33' : '#fff'}
                    underlayColor="transparent"
                    name='calendar'
                    type="font-awesome"
                    onPress={() => this.setState({...this.state, showCal: !this.state.showCal})} />

                    <Icon
                    iconStyle={styles.icon}
                    color={this.state.showSort ? '#FFAB33' : '#fff'}
                    underlayColor="transparent"
                    name='sort'
                    type="font-awesome"
                    onPress={() => this.setState({...this.state, showSort: !this.state.showSort})}
                     />
                        
                    <Text style={styles.prediction}>
                        Prediction Date: {moment(this.props.trails.date).format("MMM Do YYYY")}
                    </Text>

                </View>
                {this.state.showSort ? this.sortBox() : ''}
                {this.state.showCal ? <Calendar onDayPress={(day) => this.dateChange(day)} style={styles.cal} minDate={new Date(Date.now())} /> : ''}

            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 35,
        backgroundColor: '#8A3434',
        elevation: 4,
    },
    sortContainer: {
        paddingVertical: 10, 
        justifyContent: 'center'
    },
    sortGroup: {
        flexDirection: 'row', 
        justifyContent: 'center'
    },
    cal: {
        paddingVertical: 5
    },
    icon: {
        paddingVertical: 5, 
        paddingHorizontal: 5, 
        alignSelf: 'flex-start'
    },
    prediction: {
        color: 'white', 
        fontSize: 15, 
        alignSelf: "center", 
        paddingRight: 5
    }
});

export default connect(mapStateToProps, mapDispatchtoProps)(FavToolbar)