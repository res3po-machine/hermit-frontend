import React, {Component} from 'react'
import { View, StyleSheet, Text } from 'react-native'
import { Icon, Slider, CheckBox } from 'react-native-elements'
import { Calendar } from 'react-native-calendars'
import moment from 'moment'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { dateChange, getTrails, resetLoad, changeMax, changeMin, changeSort } from '../actions/trailActions'

const mapStateToProps = ({trails}) => ({trails})
const mapDispatchtoProps = (dispatch) => bindActionCreators({
    dateChange, getTrails, changeMax, changeMin, resetLoad, changeSort
}, dispatch)

class Toolbar extends Component {
    constructor(props) {
        super(props)
        this.state={
            showCal: false,
            showFilter: false,
            showSort: false
        }
    }

    dateChange = async (day) => {
        this.setState({showCal: false})
        console.log(day)
        this.props.dateChange(day.dateString)
        // const thisTrail = this.props.trails.data.find(trail => trail.id === this.props.trails.trailSelect)
        // navigator.geolocation.getCurrentPosition(
        //     async (position) => {
        //         console.log(position)
        //         await this.props.getTrails({ 
        //             lat: position.coords.latitude,
        //             long: position.coords.longitude,
        //         })
        //         await this.props.getBuzz(thisTrail, this.props.trails.date)
        //     },
        //     (error) => console.log(error)
        // )
    }

    reLoad = async () => {
        await this.props.resetLoad()
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                console.log(position)
                await this.props.getTrails({ 
                    lat: position.coords.latitude,
                    long: position.coords.longitude,
                    maxTrail: this.props.trails.visualMax,
                    maxLength: this.props.trails.maxLength,
                    minLength: this.props.trails.minLength
                })
                // await this.props.getBuzz(this.props.trails.data, this.props.trails.date)
            },
            (error) => console.log(error)
        )
    }

    handleMax = async (value) => {
        await this.props.changeMax(value)
        await this.reLoad()
    }

    handleMin = async (value) => {
        await this.props.changeMin(value)
        await this.reLoad()
    }

    slider = () => {
        return (
            <View style={{paddingVertical: 10, justifyContent: 'center'}}>
                <Text style={{alignSelf: 'center'}}>Max Trail Length: {this.props.trails.maxLength} miles</Text>
                <Slider onSlidingComplete={this.handleMax} value={this.props.trails.maxLength} step={1} minimumValue={1} maximumValue={200} thumbTintColor="grey"/>
                <Text style={{alignSelf: 'center'}}>Min Trail Length: {this.props.trails.minLength} miles</Text>
                <Slider onSlidingComplete={this.handleMin} value={this.props.trails.minLength} step={1} minimumValue={0} maximumValue={200} thumbTintColor="grey" />
            </View>
        )
    }

    sortBox = () => {
        return (
            <View style={{paddingVertical: 10, justifyContent: 'center'}}>

                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
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

                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
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

                <View style={{flexDirection: 'row', justifyContent: 'center'}}>
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
                    iconStyle={{paddingVertical: 5, paddingHorizontal: 5, alignSelf: 'flex-start'}}
                    color={this.state.showCal ? '#FFAB33' : '#fff'}
                    underlayColor='transparent'
                    name='calendar'
                    type="font-awesome"
                    onPress={() => this.setState({...this.state, showCal: !this.state.showCal})} />

                    <Icon
                    iconStyle={{paddingVertical: 5, paddingHorizontal: 5, alignSelf: 'flex-start'}}
                    color={this.state.showFilter ? '#FFAB33' : '#fff'}
                    underlayColor='transparent'
                    name='filter'
                    type="font-awesome"
                    onPress={() => this.setState({...this.state, showFilter: !this.state.showFilter})}
                     />

                    <Icon
                    iconStyle={{paddingVertical: 5, paddingHorizontal: 5, alignSelf: 'flex-start'}}
                    color={this.state.showSort ? '#FFAB33' : '#fff'}
                    underlayColor='transparent'
                    name='sort'
                    type="font-awesome"
                    onPress={() => this.setState({...this.state, showSort: !this.state.showSort})}
                     />
                        
                    <Text style={{color: 'white', fontSize: 15, alignSelf: "center", paddingRight: 5}}>
                        Prediction Date: {moment(this.props.trails.date).format("MMM Do YYYY")}
                    </Text>
                </View>
                {this.state.showFilter ? this.slider() : ''}
                {this.state.showSort ? this.sortBox() : ''}
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
        flexDirection: 'row',
        justifyContent: 'space-around',
        height: 35,
        backgroundColor: '#448A34',
        elevation: 4,
    },
    cal: {
        paddingVertical: 5
    }
});

export default connect(mapStateToProps, mapDispatchtoProps)(Toolbar)