'use strict';

var React = require('../util/react');

var noop = function noop() {};

var OnChangeMixin = {

  propTypes: {
    onChange: React.PropTypes.func
  },

  getDefaultProps: function getDefaultProps() {
    return {
      onChange: noop
    };
  }
};

module.exports = OnChangeMixin;