import React, { Component } from 'react';

export default class ChatBar extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="chatbar">
        <input
          className="chatbar-username"
          placeholder="Your Name (Optional)"
          // onBlur={this.createUser}
          onKeyPress={this.props.handleNameChange}
        />
        <input
          className="chatbar-message"
          placeholder="Type a message and hit ENTER"
          onChange={this.props.handleChange}
          onKeyPress={this.props.handleEnterPress}

        />
      </footer>
    )
  }
}

