'use strict';

var Colr = require('colr');
var React = require('react');
var ColorPicker = require('../lib/index');

window.React = React;
React.initializeTouchEvents(true);

var App = React.createClass({
  displayName: 'App',

  getInitialState: function getInitialState() {
    return {
      color: '#000000'
    };
  },

  setColor: function setColor() {
    var color = Colr.fromRgb(Math.random() * 255, Math.random() * 255, Math.random() * 255);

    // replace current color and origin color
    this.setState({
      color: color.toHex()
    });
  },

  handleChange: function handleChange(color) {
    this.setState({
      color: color.toHex()
    });
  },

  render: function render() {
    /* jshint ignore: start */
    return React.createElement(
      'div',
      null,
      React.createElement(
        'button',
        { onClick: this.setColor },
        'Load Random Color'
      ),
      React.createElement(
        'div',
        null,
        'Active: ',
        this.state.color
      ),
      React.createElement(
        'div',
        { id: 'container' },
        React.createElement(ColorPicker, {
          color: this.state.color,
          onChange: this.handleChange
        })
      )
    );
    /* jshint ignore: end */
  }

});

document.addEventListener('DOMContentLoaded', function () {
  React.render(React.createFactory(App)(), document.body);
});