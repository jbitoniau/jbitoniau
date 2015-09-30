'use strict';

var React = require('../util/react');
var Colr = require('colr');
var classnames = require('classnames');

var Details = require('./details.react');
var Map = require('./map.react');
var Sample = require('./sample.react');
var Slider = require('./slider.react');
var OnChangeMixin = require('../mixin/onchange.react');

var ColorPicker = React.createClass({
  displayName: 'ColorPicker',

  mixins: [OnChangeMixin],

  propTypes: {
    color: React.PropTypes.string
  },

  // default color
  getDefaultProps: function getDefaultProps() {
    return {
      color: '#000000'
    };
  },

  // compare props against state using hex strings
  // only use the new props if the color is different
  // this prevents data loss when converting between RGB and HSV
  componentWillReceiveProps: function componentWillReceiveProps(nextProps) {
    var nextColor = nextProps.color.toLowerCase();
    var currentColor = Colr.fromHsvObject(this.state.hsv).toHex();

    if (nextColor !== currentColor) {
      this.setState(this.getStateFrom(nextProps.color));
    }
  },

  // create the initial state using props.color
  getInitialState: function getInitialState() {
    return this.getStateFrom(this.props.color);
  },

  // generate state object from a hex string
  getStateFrom: function getStateFrom(color) {
    color = Colr.fromHex(color);
    return {
      color: color,
      origin: color.clone(),
      hsv: color.toRawHsvObject()
    };
  },

  render: function render() {
    var hue = this.getBackgroundHue();
    var luminosity = this.state.color.toGrayscale();

    var classes = classnames({
      dark: luminosity <= 128,
      light: luminosity > 128
    });

    return(
      /* jshint ignore: start */
      React.createElement(
        'div',
        { className: 'colorpicker' },
        React.createElement(
          'div',
          { className: 'light-slider' },
          React.createElement(Slider, {
            vertical: true,
            value: this.state.hsv.v,
            max: 100,
            onChange: this.setValue
          })
        ),
        React.createElement(
          'div',
          { className: 'sat-slider' },
          React.createElement(Slider, {
            vertical: false,
            value: this.state.hsv.s,
            max: 100,
            onChange: this.setSaturation
          })
        ),
        React.createElement(
          'div',
          { className: 'hue-slider' },
          React.createElement(Slider, {
            vertical: true,
            value: this.state.hsv.h,
            max: 360,
            onChange: this.setHue
          })
        ),
        React.createElement(Map, {
          x: this.state.hsv.s,
          y: this.state.hsv.v,
          max: 100,
          backgroundColor: hue,
          className: classes,
          onChange: this.setSaturationAndValue
        }),
        React.createElement(Details, {
          color: this.state.color,
          hsv: this.state.hsv,
          onChange: this.loadColor
        }),
        React.createElement(Sample, {
          color: this.state.color.toHex(),
          origin: this.state.origin.toHex(),
          onChange: this.loadColor
        }),
        this.props.children
      )
      /* jshint ignore: end */

    );
  },

  // replace current color with another one
  loadColor: function loadColor(color) {
    this.setState(this.getStateFrom(color));
    this.props.onChange(Colr.fromHex(color));
  },

  // update the current color using the raw hsv values
  update: function update() {
    var color = Colr.fromHsvObject(this.state.hsv);
    this.setState({ color: color });
    this.props.onChange(color);
  },

  // set the hue
  setHue: function setHue(hue) {
    this.state.hsv.h = hue;
    this.update();
  },

  // set the saturation
  setSaturation: function setSaturation(saturation) {
    this.state.hsv.s = saturation;
    this.update();
  },

  // set the value
  setValue: function setValue(value) {
    this.state.hsv.v = value;
    this.update();
  },

  // set the saturation and the value
  setSaturationAndValue: function setSaturationAndValue(saturation, value) {
    this.state.hsv.s = saturation;
    this.state.hsv.v = value;
    this.update();
  },

  getBackgroundHue: function getBackgroundHue() {
    return Colr.fromHsv(this.state.hsv.h, 100, 100).toHex();
  }

});

module.exports = ColorPicker;