import React, { Component } from 'react';
import Comment from './Comment';
import './normalize.css';
import './style.css';


class CommentList extends Component {
  render() {
    let indvComments = this.props.data.map(comment => {
      return (
        <Comment
          author={ comment.author }
          text={ comment.text }
          date={ comment.date }
          editDate={ comment.editDate }
          color={ comment.color }
          opacity={ comment.opacity }
          id={ comment['_id'] }
          deleteComment={ this.props.deleteComment }
          updateComment={ this.props.updateComment }
          key={ comment['_id'] }>
        </Comment>
      )
    })
    return (
      <div className='commentList'>
        { indvComments }
      </div>
    )
  }
}

export default CommentList;
