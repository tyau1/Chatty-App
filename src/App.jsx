import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';
import Counter from './Counter.jsx';

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state =
      {
        currentUser: { name: 'Anonymous' },
        messages: [],
        nextMsg: '',
        userCounter: 1,
      };

    this.handleChange = this.handleChange.bind(this);
    this.handleEnterPress = this.handleEnterPress.bind(this);
    this.changeUser = this.changeUser.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
  }

  handleChange(event) {
    const nextMsg = event.target.value;
    this.setState({ nextMsg });
  }

  handleEnterPress(event) {
    const keyPressed = event.key;

    if (keyPressed === 'Enter') {
      const newMsg = {
        type: 'postMessage',
        username: this.state.currentUser.name,
        content: this.state.nextMsg,
      }

      const strMsg = JSON.stringify(newMsg);
      this.wss.send(strMsg);

      event.target.value = '';
    }
  }

  changeUser(newUser) {
    this.setState({
      currentUser: { name: newUser }
    })
  }

  handleNameChange(event) {
    const keyPressed = event.key;

    if (keyPressed === 'Enter') {
      const newUser = {
        type: 'postNotification',
        content: `${this.state.currentUser.name} has change their name to ${event.target.value}`
      }

      this.setState({
        currentUser: { name: event.target.value }
      });

      const strUser = JSON.stringify(newUser);
      this.wss.send(strUser);
    }
  }

  componentDidMount() {
    this.wss = new WebSocket('ws://0.0.0.0:3001/')

    this.wss.onopen = function (event) {
      console.log('Connected to server');
    }

    this.wss.onmessage = (event) => {
      console.log(event.data);
      let newMsg = JSON.parse(event.data);

      switch (newMsg.type) {

        case 'incomingMessage':
          const allMessages = this.state.messages.concat(newMsg)
          this.setState({
            messages: allMessages
          })
          break;

        case 'incomingNotification':
          const notification = this.state.messages.concat(newMsg)
          this.setState({
            messages: notification
          })
          break;

        case 'info':
          this.setState({
            userCounter: newMsg.numberOfUsers
          })
          break;

        default:
          throw new Error('Unknown event type ' + newMsg.type);
      }
    }

  }

  render() {
    return (
      <div>
        <Counter argm={this.state} />
        <MessageList messages={this.state.messages} />
        <ChatBar
          username={this.state.currentUser.name}
          handleChange={this.handleChange}
          handleEnterPress={this.handleEnterPress}
          handleNameChange={this.handleNameChange}
        />
      </div>
    );
  }
}

