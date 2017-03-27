import React, { Component } from 'react';
import InfoModal from './InfoModal';
import './normalize.css';
import './style.css';


class CommentInfo extends Component {
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
      <div className="commentInfo">
        <span 
          className="icon" 
          onClick={ this.handleOpenModal }
          >i</span>
        <InfoModal
          isOpen={ this.state.showModal }
          handleCloseModal={ this.handleCloseModal } />
      </div>
    )
  }
}

export default CommentInfo;