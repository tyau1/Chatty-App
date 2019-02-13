import React, {Component} from 'react'

export default class Message extends Component {

 render() {
   console.log(this.props.messageProp);
   return (
     <div className='message'>
       <span className='message-username'>{this.props.messageProp.username}</span>
       <span className='message-content'>{this.props.messageProp.content}</span>
     </div>
   )
 }
}