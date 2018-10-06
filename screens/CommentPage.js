import React, { Component } from 'react'
import { View, AsyncStorage, StyleSheet } from 'react-native'
import { Card, Text, ListItem, Avatar, FormInput, FormLabel, Button } from 'react-native-elements'

import { connect } from 'react-redux'
import { bindActionCreators } from 'redux';

import moment from 'moment'

import { patchComment, commentsByTrail, deleteComment } from '../actions/commentActions'

const mapStateToProps = ({trails, comments}) => ({trails, comments})
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

    getToken = async () => {
        const preToken = await AsyncStorage.getItem('hermitToken')
        return JSON.parse(preToken)
    }

    isAuthorized = async () => {
        const token = await this.getToken()
        console.log(this.state.userId, token.id)
        if (this.state.userId !== token.id) return false
        else return true
    }

    onSubmit = async () => {
        const token = await this.getToken()
        await this.props.patchComment(this.state.full.id, this.state.userId, this.state.body, token.token)
        await this.props.commentsByTrail(this.props.trails.trailSelect, token.token)
        this.props.navigation.navigate('Profile')
    }

    onDelete = async () => {
        const token = await this.getToken()
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
                    containerStyle={styles.listContainer}
                    title={
                        <View 
                        style={styles.title}>
                            <Text>{this.state.full.body}</Text>
                        </View>
                    }
                    subtitle={
                        <View 
                        style={styles.subtitle}>
                            <Text 
                            style={styles.subText}>
                                {this.state.full.created_at === this.state.full.updated_at ? 
                                    `Created ${moment(this.state.full.created_at).startOf(Date.now()).fromNow()}` : 
                                    `Updated ${moment(this.state.full.updated_at).startOf(Date.now()).fromNow()}`}
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

                <Card>
                    <FormLabel for="body">Edit your Comment:</FormLabel>
                    <FormInput 
                    multiline={true} 
                    numberOfLines={10} 
                    inputStyle={styles.input}
                    onChangeText={(text) => this.setState({...this.state, body: text})} 
                    value={this.state.body} 
                    name="body"/>
                        
                    <Button 
                    onPress={() => this.onSubmit()} 
                    disabled={this.state.auth} 
                    style={styles.buttonContainer} 
                    loading={this.props.comments.isLoading}
                    buttonStyle={styles.buttonStyle}
                    title="UPDATE"  />
                    <Button 
                    onPress={() => this.onDelete()} 
                    disabled={this.state.auth} 
                    style={styles.buttonContainer} 
                    loading={this.props.comments.isLoading}
                    buttonStyle={styles.buttonStyle}
                    title="DELETE"  />
                        
                </Card>
            </View>
            
        )
    }
}

export default connect(mapStateToProps, mapDispatchtoProps)(CommentPage)

const styles = StyleSheet.create({
    listContainer: {
        borderBottomWidth: 0, 
        borderTopWidth: 0
    },
    title: {
        paddingLeft: 5
    },
    subtitle: {
        alignSelf: 'flex-end'
    },
    subText: {
        fontSize: 10, 
        color: 'grey'
    },
    input: {
        width: 280
    },
    buttonContainer: {
        paddingVertical: 5
    },
    buttonStyle: {
        backgroundColor: "rgba(255, 171,51, 1)",
        width: 300,
        height: 45,
        borderColor: "transparent",
        borderWidth: 0,
        borderRadius: 100,
      }
})