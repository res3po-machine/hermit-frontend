import React, {Component} from 'react'
import { View, Text, StyleSheet, AsyncStorage } from 'react-native'
import { Avatar, Card, ListItem, FormLabel, FormInput, Button } from 'react-native-elements'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import { commentsByTrail, postComment, selectComment } from '../actions/commentActions'

import moment from 'moment'

const mapStateToProps = ({trails, fav_trails, comments}) => ({trails, fav_trails, comments})
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

    componentDidMount = () => {
        this.loadComments()
    }

    loadComments = async () => {
        const token = await this.getToken()
        await this.props.commentsByTrail(this.props.trails.trailSelect, token.token)
    }

    getToken = async () => {
        const preToken = await AsyncStorage.getItem('hermitToken')
        return JSON.parse(preToken)
    }

    onSubmit = async () => {
        const token = await this.getToken()
        const trailId = this.props.trails.trailSelect
        if (this.props.trails.data.find(trail => trail.id === trailId)) {
            const trailName = this.props.trails.data.find(trail => trail.id === trailId).name
            await this.props.postComment({body: this.state.body, userId: token.id, trailId, trailName }, token.token)
        } else {
            const trailName = this.props.fav_trails.full.find(trail => trail.id === trailId).name
            await this.props.postComment({body: this.state.body, userId: token.id, trailId, trailName }, token.token)
        }
        this.setState({body: ''})
        this.loadComments()
    }

    select = (id) => {
        this.props.selectComment(id)
        this.props.navigation('Comment')
    }

    render() {
        return (
            <View>
                <Card 
                containerStyle={styles.formContainer} >

                    <FormLabel for="body">Post a Comment:</FormLabel>
                    <FormInput 
                    multiline={true} 
                    numberOfLines={10}
                    style={styles.inputContainer} 
                    inputStyle={styles.inputStyle}
                    onChangeText={(text) => this.setState({body: text})} value={this.state.body} 
                    name="body"/>
                    <Button 
                    loading={this.props.comments.postLoading}
                    onPress={this.onSubmit} 
                    style={styles.buttonContainer} 
                    title="SEND" 
                    buttonStyle={styles.buttonStyle} />

                </Card>
                <View 
                style={styles.listOrder}>
                    <Card 
                    containerStyle={styles.formContainer} >

                    {
                        this.props.comments.comments.map((comment, i) => {
                        return (
                            <ListItem
                            key={i}
                            onPress={() => this.select(comment.id)}
                            title={
                                <View 
                                style={styles.commentText}>
                                    <Text>{comment.body}</Text>
                                </View>
                            }
                            subtitle={
                                <View 
                                style={styles.subContainer}>
                                    <Text 
                                    style={styles.subText}>{comment.created_at === comment.updated_at ? 
                                        `Created ${moment(comment.created_at).startOf(Date.now()).fromNow()}` : 
                                        `Updated ${moment(comment.updated_at).startOf('day').fromNow()}`}</Text>
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

const styles = StyleSheet.create({
    formContainer: {
        padding: 0
    },
    inputContainer: {
        paddingBottom: 10
    },
    inputStyle: {
        width: 280
    },
    buttonContainer: {
        paddingVertical: 10, 
        alignSelf: 'flex-end'
    },
    buttonStyle: {
        backgroundColor: "rgba(255, 171,51, 1)",
        width: 100,
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 100,
      },
    listOrder: {
        flexDirection: 'column-reverse', 
        paddingBottom: 10
    },
    commentText: {
        paddingLeft: 5
    },
    subContainer: {
        alignSelf: 'flex-end'
    },
    subText: {
        fontSize: 10, 
        color: 'grey'
    }
})