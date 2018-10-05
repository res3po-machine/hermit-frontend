import React, { Component } from 'react'
import { connect } from 'react-redux'

import { Card, Text, ListItem, Avatar, FormInput, FormLabel, Button } from 'react-native-elements'
import { View, AsyncStorage } from 'react-native'
import { bindActionCreators } from 'redux';

import moment from 'moment'

import { patchComment, commentsByTrail, deleteComment } from '../actions/commentActions'

const mapStateToProps = ({trails, comments, users}) => ({trails, comments, users})
const mapDispatchtoProps = (dispatch) => bindActionCreators({
    patchComment, commentsByTrail, deleteComment
}, dispatch)

class CommentPage extends Component {
    constructor(props) {
        super(props)
        const thisComment = this.props.comments.comments.find(comm => comm.id === this.props.comments.selected)
        this.state = {
            body: thisComment.body,
            userId: thisComment.user_id,
            trailId: thisComment.trail_id,
            trailName: thisComment.trail_name,
            full: thisComment,
            auth: false
        }
    }

    static navigationOptions = {
        title: 'Edit/Delete Comment',
        headerMode: 'screen',
        headerTintColor: '#fff',
        headerStyle: {
            backgroundColor: '#448A34',
        },
    }

    componentDidMount = async () => {
        const auth = await this.isAuthorized()
        this.setState({...this.state, auth: !auth })
    }

    isAuthorized = async () => {
        const preToken = await AsyncStorage.getItem('hermitToken')
        const token = JSON.parse(preToken)
        console.log(this.state.userId, token.id)
        if (this.state.userId !== token.id) return false
        else return true
    }

    onSubmit = async () => {
        const preToken = await AsyncStorage.getItem('hermitToken')
        const token = JSON.parse(preToken)
        await this.props.patchComment(this.state.full.id, this.state.userId, this.state.body, token.token)
        await this.props.commentsByTrail(this.props.trails.trailSelect, token.token)
        this.props.navigation.navigate('Profile')
    }

    onDelete = async () => {
        const preToken = await AsyncStorage.getItem('hermitToken')
        const token = JSON.parse(preToken)
        await this.props.deleteComment(this.state.full.id, this.state.userId, token.token)
        await this.props.commentsByTrail(this.props.trails.trailSelect, token.token)
        this.props.navigation.navigate('Profile')
    }

    render() {
        return (
            <View>
                <Card>
                    <ListItem
                            key={this.state.full.id}
                            hideChevron
                            containerStyle={{borderBottomWidth: 0, borderTopWidth: 0}}
                            title={
                                <View style={{paddingLeft: 5}}>
                                    <Text>{this.state.full.body}</Text>
                                </View>
                            }
                            subtitle={
                                <View style={{alignSelf: 'flex-end'}}>
                                    <Text 
                                    style={{fontSize: 10, color: 'grey'}}>
                                        {this.state.full.created_at === this.state.full.updated_at ? `Created ${moment(this.state.full.created_at).startOf(Date.now()).fromNow()}` : `Updated ${moment(this.state.full.updated_at).startOf(Date.now()).fromNow()}`}
                                    </Text>
                                </View>
                            }
                            avatar={
                                <Avatar
                                size="small"
                                rounded
                                title={`${this.state.full.first_name[0]}${this.state.full.last_name[0]}`}
                                />
                            }
                            />
                </Card>
                <Card style={{padding: 0}}>
                    <FormLabel for="body">Edit your Comment:</FormLabel>
                    <FormInput 
                    multiline={true} 
                    numberOfLines={10} 
                    style={{paddingBottom: 10}}
                    inputStyle={{width: 280}}
                    onChangeText={(text) => this.setState({...this.state, body: text})} 
                    value={this.state.body} 
                    name="body"/>
                        
                    <Button 
                    onPress={() => this.onSubmit()} 
                    disabled={this.state.auth} 
                    style={{paddingVertical: 10}} 
                    loading={this.props.comments.isLoading}
                    buttonStyle={{
                        backgroundColor: "rgba(255, 171,51, 1)",
                        width: 300,
                        height: 45,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 100,
                      }}
                    title="UPDATE"  />
                    <Button 
                    onPress={() => this.onDelete()} 
                    disabled={this.state.auth} 
                    style={{paddingVertical: 10}} 
                    loading={this.props.comments.isLoading}
                    buttonStyle={{
                        backgroundColor: "rgba(255, 171,51, 1)",
                        width: 300,
                        height: 45,
                        borderColor: "transparent",
                        borderWidth: 0,
                        borderRadius: 100,
                      }}
                    title="DELETE"  />
                        
                </Card>
            </View>
            
        )
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(CommentPage)