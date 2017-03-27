import React, { Component } from 'react';
import './normalize.css';
import './style.css';


class Comment extends Component {
  constructor(props) {
    super(props);
    this.state= {
      author: '',
      text: '',
      updateFormActive: false
    };

    this.deleteComment = this.deleteComment.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.changeAuthor = this.changeAuthor.bind(this);
    this.changeText = this.changeText.bind(this);
    this.submitCommentUpdate = this.submitCommentUpdate.bind(this);
  }

  updateComment(e) {
    e.preventDefault();
    this.setState({ 
      updateFormActive: !this.state.updateFormActive 
    });
  }

  submitCommentUpdate(e) {
    e.preventDefault();
    let id = this.props.id;
    let opacity = this.props.opacity;
    let author = (this.state.author) ? this.state.author : null;
    let text = (this.state.text) ? this.state.text : null;
    let comment = { 
      author: author, 
      text: text,
      opacity: opacity
    };
    this.props.updateComment(id, comment);
    this.setState({
      updateFormActive: !this.state.updateFormActive,
      author: '',
      text: ''
    })
  }

  deleteComment(e) {
    e.preventDefault();
    let id = this.props.id;
    this.props.deleteComment(id);
  }

  changeText(e) {
    this.setState({ 
      text: e.target.value 
    });
  }

  changeAuthor(e) {
    this.setState({ 
      author: e.target.value 
    });
  }

  render() {
    return (
      <div 
        className='comment'
        style={ {backgroundColor: `rgba(${this.props.color[0]}, ${this.props.color[1]}, ${this.props.color[2]}, ${(this.props.opacity<1) ? this.props.opacity : 1})` } }>
        <span className='author'>Author: {this.props.author}</span>
        <span className='date'>Posted: {this.props.date}</span>
        {(this.props.editDate) ? <span className='editDate'>Last edited: {this.props.editDate}</span> : null}
        <span className='text'>{this.props.text}</span>
        <div className='upDelLinks'>
          <a className='updateLink' href='#' onClick={ this.updateComment }>Update</a>
          <a className='deleteLink' href='#' onClick={ this.deleteComment }>Delete</a>
        </div>
        {this.state.updateFormActive && (
          <form onSubmit={ this.submitCommentUpdate } className="editForm">
            <div className='editText'>
              <input
                type='text'
                placeholder='Update author...'
                className='commentFormAuthor'
                value={ this.state.author }
                onChange={ this.changeAuthor } />
              <input
                type='text'
                placeholder='Update comment...'
                className='commentFormText'
                value={ this.state.text }
                onChange={ this.changeText } />
            </div>
            <div className='editButtons'>
              <input
                type='submit'
                className={ (!this.state.author && !this.state.text) ? 'commentFormPost' : 'commentFormPost2' }
                value='Update'
                disabled={ !this.state.author && !this.state.text } />
              <input
                type='submit'
                className='commentFormClose' 
                value='Close'
                onClick={ this.updateComment }
                />
              </div>
          </form>
          )}
      </div>
    )
  }
}

export default Comment;
