import React, { Component } from 'react';
import Textarea from 'react-textarea-autosize';
import './normalize.css';
import './style.css';

class CommentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = { 
      author: '', 
      text: ''
    };
    this.changeAuthor = this.changeAuthor.bind(this);
    this.changeText = this.changeText.bind(this);
    this.submitComment = this.submitComment.bind(this);
    this.noBubble = this.noBubble.bind(this);
  }

  changeAuthor(e) {
    this.setState({ 
      author: e.target.value 
    });
  }
  changeText(e) {this.setState({ 
      text: e.target.value 
    });
  }
  submitComment(e) {
    e.preventDefault();
    this.props.submitComment({ 
      author: this.state.author.trim(), 
      text: this.state.text.trim() 
    });
    this.setState({ 
      author: '', 
      text: '' 
    }); 
    this.props.handleCloseModal();
  }

  noBubble(e) {
  	e.stopPropagation();
  }

  	render() {
	    return (
	    	<div>
	      	{(this.props.isOpen) && (
		        <div 
		        	className='modal'
		        	onClick={ this.props.handleCloseModal }
		        	>
		        	<form 
		        		className='modalForm' 
		        		onSubmit={ this.submitComment }
		        		onClick={ this.noBubble } >
			            <h3 className='modalTitle'>Post a comment!</h3>
			            <br/>
			            <Textarea
			              placeholder='Your name...'
			              className='modalFormAuthor'
			              value={ this.state.author }
			              onChange={ this.changeAuthor }
			              minRows={3}
			              maxRows={6} 
			              />
			            <Textarea
			              placeholder='Say something...'
			              className='modalFormText'
			              value={ this.state.text }
			              onChange={ this.changeText }
			              minRows={5}
			              maxRows={8} 
			              />
			            <input
			              type='submit'
			              className={(!this.state.author || !this.state.text) ? 'modalFormPost' : 'modalFormPost2' }
			              value='Post'
			              disabled={!this.state.author || !this.state.text} 
			              />
			            <input
			              type='submit'
			              className='modalClose' 
			              value='Close'
			              onClick={ this.props.handleCloseModal }
			              />
		          	</form>
		        </div>
	      	)}
	    	</div>
	  	)
	}
}

export default CommentModal;