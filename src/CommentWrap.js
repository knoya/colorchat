import React, { Component } from 'react';
import CommentList from './CommentList';
import CommentForm from './CommentForm';
import CommentInfo from './CommentInfo';
import './normalize.css';
import './style.css';
import io from 'socket.io-client';

let socket = io();

class CommentWrap extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      data: []
    };
    this.getComments = this.getComments.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.updateComment = this.updateComment.bind(this);
    this.deleteComment = this.deleteComment.bind(this);
    this.addComment = this.addComment.bind(this);
    this.editComment = this.editComment.bind(this);
    this.removeComment = this.removeComment.bind(this);
    this.fadeColor = this.fadeColor.bind(this);
  }

  getComments() {
    return fetch(this.props.api, { 
      headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json' 
        }
      })
    .then((res) => {
      return res.json();
    })
    .then((resjson) => {
      this.setState({ 
        data: resjson 
      });
    });
  }

  submitComment(comment) {
    comment.date = new Date().toUTCString();
    comment.id = Date.now();
    comment.color = [(Math.floor((Math.random() * 255) + 1)), (Math.floor((Math.random() * 255) + 1)), (Math.floor((Math.random() * 255) + 1))];
    comment.opacity = .3;
    return fetch(this.props.api, {
      method: 'POST',
      body: JSON.stringify(comment),
      headers: {
        'Accept': 'application/json',
        "Content-Type": "application/json"
      }
    })
    .catch(err => {
      console.error(err);
    })
  }

  updateComment(id, comment) {
    comment.editDate = new Date().toUTCString();
    comment.opacity+=.1;
    return fetch(`${this.props.api}/${id}`, {
      method: 'PUT',
      body: JSON.stringify(comment),
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      }
    })
    .catch(err => {
      console.error(err);
    })
  }

  deleteComment(id) {
    return fetch(`${this.props.api}/${id}`, {
      method: 'DELETE',
      headers: { 
        'Accept': 'application/json', 
        'Content-Type': 'application/json' 
        }
    })
    .catch(err => {
      console.error(err);
    })
  }

  addComment(comment) {
    let comments = this.state.data;
    let color = comment.color;
    this.setState({
      data: comments.concat([comment])
      },
      this.fadeColor(color)
    );
  }

  editComment(comment) {
    let comments = this.state.data;
    let color = comment.color;
    let currentIndex = comments.findIndex(item => {
      return item._id == comment._id
    });
    comments.splice(currentIndex, 1, comment);
    this.setState({
      data: comments
      },
      this.fadeColor(color)
    );
  }

  removeComment(id) {
    let comments = this.state.data;
    let currentIndex = comments.findIndex(item => {
      return item._id == id
    });
    comments.splice(currentIndex, 1);
    this.setState({
      data: comments
      },
      this.fadeColor([0,0,0])
    );
  }

  fadeColor(color) {
    let clone = color.slice();
    let animation = setInterval(function() {
      if ((clone[0] >= 255) && (clone[1] >= 255) && (clone[2] >= 255)) {
        document.body.style.backgroundColor = 'rgba(255,255,255,1)';
        clearInterval(animation);
      }
      else {
        ((clone[0] < 255) ? clone[0] = clone[0] + 35 : 255);
        ((clone[1] < 255) ? clone[1] = clone[1] + 35 : 255);
        ((clone[2] < 255) ? clone[2] = clone[2] + 35 : 255);
        document.body.style.backgroundColor = `rgba(${clone[0]}, ${clone[1]}, ${clone[2]}, 1)`;
      }
    }, 50);
  }

  componentDidMount() {
    this.getComments();
    socket.on('newComment', this.addComment);
    socket.on('editComment', this.editComment);
    socket.on('removeComment', this.removeComment);
  }

  render() {
    return (
      <div className='commentWrap'  id='commentWrap' >
        <div className='commentHeader'>
          <CommentForm submitComment={ this.submitComment }/>
          <h2 className='title'>color comments.</h2>
          <CommentInfo/>
        </div>
        <CommentList
        deleteComment={ this.deleteComment }
        updateComment={ this.updateComment }
        data={ this.state.data }/>
        <div className='footer'></div>
      </div>
    )
  }
}

export default CommentWrap;