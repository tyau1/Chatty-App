import React, { Component } from 'react';

export default class Counter extends Component {
  render() {
    console.log(this.props.argm.userCounter)
    return (
      <nav className="navbar">
        <div>
          <a href="/" className="navbar-brand">Chatty</a>
          <a className="counter"> {this.props.argm.userCounter} users online</a>
        </div>
      </nav>

    );
  }
}