import React, { Component } from 'react';

export default class ChatBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    console.log(this.props);
    return (
      <footer className="chatbar">
        <input className="chatbar-username" placeholder="Your Name (Optional)" value={this.props.username} />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onChange={this.props.handleChange} 
          onKeyPress={this.props.handleKeyPress}
          />
      </footer>
    )
  }

}