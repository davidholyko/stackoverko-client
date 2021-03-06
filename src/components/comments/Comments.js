import React, { Component, Fragment } from 'react'
import { withRouter } from 'react-router-dom'

import Comment from './Comment'
import CommentCreate from './CommentCreate'

class Comments extends Component {
  constructor (props) {
    super(props)

    const { comments } = this.props.question

    this.state = {
      comments
    }
  }

  componentDidMount = () => { }

  createComment = createdComment => {
    const comments = this.state.comments
    comments.push(createdComment)
    this.setState({ comments })
  }

  render () {
    const { user, alert, question } = this.props
    const { comments } = this.state

    const commentCreateForm = <CommentCreate
      user={user}
      alert={alert}
      question={question}
      createComment={this.createComment}/>

    return (
      <Fragment>
        <p className="border-bottom mt-3">{comments.length ? 'Comments' : '0 Comments'}</p>

        {user ? commentCreateForm : ''}

        {comments
          ? comments.map((comment, index) => {
            return <Comment
              key={index}
              comment={comment}
              user={user}
              alert={alert}
              question={question}/>
          })
          : ''}
      </Fragment>
    )
  }
}

export default withRouter(Comments)
