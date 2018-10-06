import React, { Component } from 'react'
import { AsyncStorage } from 'react-native'
import { Icon } from 'react-native-elements'

import { DoubleCircleLoader } from 'react-native-indicator'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { favTrail, unFavTrail, getFavsTrail, getFavsFull } from '../actions/favActions'

const mapStateToProps = ({fav_trails, trails}) => ({fav_trails, trails})
const mapDispatchToProps = (dispatch) => bindActionCreators({
    favTrail, unFavTrail, getFavsTrail, getFavsFull
}, dispatch)

class FavHeart extends Component {
    constructor(props) {
        super(props)
        this.state = {
            fav: false
        }
    }

    componentDidMount = () => {
        this.load()
    }

    load = () => {
        const doesExist = this.props.fav_trails.favs.find(fav => {
            if (fav.trail_id === this.props.trails.trailSelect) return fav
        })
        doesExist ? this.setState({fav: true}) : this.setState({fav: false})
    }

    refreshFavs = async () => {
        const favs = this.props.fav_trails.favs.map(fav => fav.trail_id)
        await this.props.getFavsFull(favs)
    }

    getToken = async () => {
        const preToken = await AsyncStorage.getItem('hermitToken')
        return JSON.parse(preToken)
    }

    onFav = async () => {
        const token = await this.getToken()
        await this.props.favTrail(token.id, this.props.trails.trailSelect, token.token)
        await this.props.getFavsTrail(this.props.trails.trailSelect, token.token)
        this.load()
        this.refreshFavs()
    }

    unFav = async () => {
        const preToken = await AsyncStorage.getItem('hermitToken')
        const token = JSON.parse(preToken)
        await this.props.unFavTrail(token.id, this.props.trails.trailSelect, token.token)
        await this.props.getFavsTrail(this.props.trails.trailSelect, token.token)
        this.load()
        this.refreshFavs()
    }

    render = () => {
        if (this.props.fav_trails.isLoading) {
            return (
                <DoubleCircleLoader 
                size={20} 
                color="#FFAB33" />
            )
        } else if (!this.props.fav_trails.isLoading) {
            if (this.state.fav) {
                return (
                    <Icon
                    name="heart"
                    color="red"
                    type="font-awesome"
                    onPress={this.unFav} />
                )
            } else {
                return (
                    <Icon
                    name="heart"
                    color="grey"
                    type="font-awesome"
                    onPress={this.onFav} />
                ) 
            }
        }
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(FavHeart)