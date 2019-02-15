import React, { Component } from 'react'

export default class Message extends Component {

  render() {
    console.log(this.props.messageProp);
    if (this.props.messageProp.username) {
      return (
        <div className='message'>
          <span className='message-username'>{this.props.messageProp.username}</span>
          <span className='message-content'>{this.props.messageProp.content}</span>
        </div>
      )

    } else {
      return (
        <div className="notification">
          <span className="notification-content"> {this.props.messageProp.content}
          </span>
        </div>
      )
    }
  }
}