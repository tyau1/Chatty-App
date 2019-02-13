import React, { Component } from 'react';
import Message from './Message.jsx'

export default class MessageList extends Component {

  render() {
    let messages = this.props.messages.map((message) => {
      return <Message key={message.id} messageProp={message}/>
    });
    return (
      <div className='messages'>
      {messages}
      <div className='message system'>
      </div>
    </div>
    )
  }
 }