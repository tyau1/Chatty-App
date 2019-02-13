import React, { Component } from 'react';
import ChatBar from './ChatBar.jsx';
import MessageList from './MessageList.jsx';

export default class App extends Component {
  constructor(props) {
  super(props);
   this.state =
      {
        currentUser: { name: 'Bob' },
        messages: [
          { id: '1',
            username: 'Bob',
            content: 'Has anyone seen my marbles?',
          },
          { id: '2',
            username: 'Anonymous',
            content: 'No, I think you lost them. You lost your marbles Bob. You lost them for good.'
          }
        
        ]
      };
  }

  render() {
    return (
      <div>
        <div>
          <MessageList messages={this.state.messages} />
        </div>
        <div>
          <ChatBar username={this.state.currentUser.name} />
        </div>
        
      </div>
    );
  }
}

