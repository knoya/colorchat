import React, { Component } from 'react';
import CommentModal from './CommentModal';
import './normalize.css';
import './style.css';

class CommentForm extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      showModal: false
    };
    this.handleOpenModal = this.handleOpenModal.bind(this);
    this.handleCloseModal = this.handleCloseModal.bind(this);
  }
  
  handleOpenModal() {
    this.setState({ showModal: true });
  }

  handleCloseModal() {
    this.setState({ showModal: false });
  }  

  render() {
    return (
      <div className="commentForm">
        <span 
          className="plus" 
          onClick={ this.handleOpenModal }>+</span>
        <CommentModal 
          isOpen={ this.state.showModal }
          submitComment={ this.props.submitComment }
          handleCloseModal={ this.handleCloseModal } />
      </div>
    )
  }
}

export default CommentForm;