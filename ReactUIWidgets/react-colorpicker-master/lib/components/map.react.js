'use strict';

var React = require('../util/react');
var Colr = require('colr');
var PureRenderMixin = require('react/lib/ReactComponentWithPureRenderMixin');
var classnames = require('classnames');

var clamp = require('../util/clamp');
var DraggableMixin = require('../mixin/draggable.react');
var OnChangeMixin = require('../mixin/onchange.react');

var Map = React.createClass({
  displayName: 'Map',

  mixins: [DraggableMixin, OnChangeMixin, PureRenderMixin],

  propTypes: {
    x: React.PropTypes.number.isRequired,
    y: React.PropTypes.number.isRequired,
    backgroundColor: React.PropTypes.string.isRequired
  },

  updatePosition: function updatePosition(clientX, clientY) {
    var rect = this.getDOMNode().getBoundingClientRect();
    var x = (clientX - rect.left) / rect.width;
    var y = (rect.bottom - clientY) / rect.height;

    x = this.getScaledValue(x);
    y = this.getScaledValue(y);

    this.props.onChange(x, y);
  },

  render: function render() {
    var classes = classnames({
      map: true,
      active: this.state.active
    });

    classes += " " + this.props.className;

    return(
      /* jshint ignore: start */
      React.createElement(
        'div',
        {
          className: classes,
          onMouseDown: this.startUpdates,
          onTouchStart: this.startUpdates
        },
        React.createElement('div', { className: 'background', style: {
            backgroundColor: this.props.backgroundColor
          } }),
        React.createElement('div', { className: 'pointer', style: {
            left: this.getPercentageValue(this.props.x),
            bottom: this.getPercentageValue(this.props.y)
          } })
      )
      /* jshint ignore: end */

    );
  }

});

module.exports = Map;