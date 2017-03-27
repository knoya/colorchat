import React, { Component } from 'react';
import './normalize.css';
import './style.css';

class InfoModal extends React.Component {
  constructor(props) {
    super(props);
    this.noBubble = this.noBubble.bind(this);
  }

  noBubble(e) {
  	e.stopPropagation();
  }

  render() {
    return (
      <div>
	      {(this.props.isOpen) &&
	        (<div
	        	className='modal'
      			onClick={ this.props.handleCloseModal }>	
      			<div
      				className='infoModal'
      				onClick={ this.noBubble } >
		        	<span
			            className="infoClose"
			            onClick={ this.props.handleCloseModal }
			            >x</span>
			        <p className='infoText'>Thanks for visiting my page! What you see here is an interface for a REST API running on the server. Clients also have a websocket connection to the server, so if you see any behavior on screen not prompted by you, that means there's someone on the other end!</p>
	      		</div>
	      	</div>
	      	)}
      </div>);
    }
}

export default InfoModal;