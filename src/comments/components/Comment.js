import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

import CommentEdit from './CommentEdit'

const CommentWrapper = styled.div`
  padding: 0.25rem;
  margin: 0.25rem;
  background-color: white;
  color: black;
`

class Comment extends Component {
  constructor (props) {
    super(props)

    const { comment, question } = this.props

    this.state = {
      questionID: question.id,
      deleted: false,
      editable: false,
      comment
    }
  }

  componentDidMount () {
  }

  toggleEditable = () => this.setState({ editable: !this.state.editable })
  unmountEditable = () => this.setState({ editable: !this.state.editable })
  deleteComment = () => this.setState({ deleted: true })
  updateComment = updatedComment => this.setState({ comment: updatedComment })

  render () {
    const { comment, editable, deleted } = this.state
    const { user } = this.props
    const owned = user ? comment.creator === user.handle : false

    const commentEdit = <CommentEdit
      comment={comment}
      user={user}
      deleteComment={this.deleteComment}
      updateComment={this.updateComment}
      unmountEditable={this.unmountEditable}
      value={comment.text}/>

    const editButton = <button className="btn btn-info" onClick={this.toggleEditable}>Edit</button>

    if (deleted) { return '' }

    return (
      <CommentWrapper>
        <div>
          <p className="mb-1 bg-dark text-light px-2 rounded d-inline-block">{comment.creator}</p>
        </div>
        <p className="text-dark">{comment.text}</p>
        { owned ? editButton : ''}
        { owned && editable ? commentEdit : ''}
      </CommentWrapper>
    )
  }
}

export default withRouter(Comment)
