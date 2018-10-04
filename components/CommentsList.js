import React, {Component} from 'react'
import { View, Text, StyleSheet, AsyncStorage } from 'react-native'
import { Avatar, Card, Divider, ListItem, FormLabel, FormInput, Button } from 'react-native-elements'
import moment from 'moment'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { commentsByTrail, postComment, selectComment } from '../actions/commentActions'

const mapStateToProps = ({trails, comments, users}) => ({trails, comments, users})
const mapDispatchtoProps = (dispatch) => bindActionCreators({
    commentsByTrail, postComment, selectComment
}, dispatch)

class CommentsList extends Component {
    constructor(props) {
        super(props)
        this.state = {
            body: '',
        }
    }

    async componentDidMount() {
        const preToken = await AsyncStorage.getItem('hermitToken')
        const token = JSON.parse(preToken)
        this.props.commentsByTrail(this.props.trails.trailSelect, token.token)
    }

    async onSubmit() {
        const preToken = await AsyncStorage.getItem('hermitToken')
        const token = JSON.parse(preToken)
        const trailId = this.props.trails.trailSelect
        const trailName = this.props.trails.data.find(trail => trail.id === trailId).name
        await this.props.postComment({body: this.state.body, userId: token.id, trailId, trailName }, token.token)
        this.setState({body: ''})
        this.props.commentsByTrail(this.props.trails.trailSelect, token.token)
    }

    select = (id) => {
        this.props.selectComment(id)
        this.props.navigation('Comment')
    }

    render() {
        return (
            <View>
                <Card containerStyle={{padding: 0}} >
                    <FormLabel for="body">Post a Comment:</FormLabel>
                    <FormInput multiline={true} style={{paddingBottom: 10}} onChangeText={(text) => this.setState({body: text})} value={this.state.body} name="body"/>
                    <Button 
                        loading={this.props.comments.postLoading}
                        onPress={() => this.onSubmit()} 
                        style={{paddingVertical: 10, alignSelf: 'flex-end'}} 
                        title="SEND" 
                        buttonStyle={{
                            backgroundColor: "rgba(255, 171,51, 1)",
                            width: 100,
                            height: 45,
                            borderColor: "transparent",
                            borderWidth: 0,
                            borderRadius: 100,
                          }} />
                </Card>
                <View style={{flexDirection: 'column-reverse', paddingBottom: 10}}>
                    <Card containerStyle={{padding: 0}} >
                    {
                        this.props.comments.comments.map((comment, i) => {
                        return (
                            <ListItem
                            key={i}
                            onPress={() => this.select(comment.id)}
                            title={
                                <View style={{paddingLeft: 5}}>
                                    <Text>{comment.body}</Text>
                                </View>
                            }
                            subtitle={
                                <View style={{alignSelf: 'flex-end'}}>
                                    <Text style={{fontSize: 10, color: 'grey'}}>{comment.created_at === comment.updated_at ? `Created ${moment(comment.created_at).startOf(Date.now()).fromNow()}` : `Updated ${moment(comment.updated_at).startOf('day').fromNow()}`}</Text>
                                </View>
                            }
                            avatar={
                                <Avatar
                                size="small"
                                rounded
                                title={`${comment.first_name[0]}${comment.last_name[0]}`}
                                />
                            }
                            />
                        );
                        }).reverse()
                    }
                    </Card>
                </View>
            </View>
        )
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(CommentsList)