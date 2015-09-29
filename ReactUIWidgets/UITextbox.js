'use strict';

var UITextbox = React.createClass({
	displayName: 'UITextbox',

	mixins: [UIDebuggable],

	getInitialState: function getInitialState() {
		return {
			editInProgress: false,
			newValue: ""
		};
	},

	render: function render() {
		var editInProgress = this.state.editInProgress;
		if (editInProgress) {
			return React.createElement('input', { type: 'text',
				onChange: this._onInputChanged,
				onBlur: this._onInputBlur,
				onKeyDown: this._onInputKeyDown,
				value: this.state.newValue,
				ref: 'inputElement' });
		} else {
			return React.createElement(
				'div',
				{ onClick: this._onClick },
				this.props.value
			);
		}
	},

	_onClick: function _onClick(e) {
		console.log("click");
		var inputElement = React.findDOMNode(this.refs.inputElement);
		if (!inputElement) return;
		inputElement.focus();
		this.setState({ editInProgress: true, newValue: this.props.value });
	},

	_onInputChanged: function _onInputChanged(e) {
		console.log("changed: " + e.target.value);
		this.setState({ newValue: e.target.value });
	},

	_onInputBlur: function _onInputBlur(e) {
		this._stopEdit();
	},

	_onInputKeyDown: function _onInputKeyDown(e) {
		if (!this.state.editInProgress) return; // Shouldn't happen but we never know
		if (e.keyCode != 13) return;
		this._stopEdit();
	},

	_stopEdit: function _stopEdit() {
		this.setState({ editInProgress: false, newValue: '' });
		// Notify!!!
		console.log("changed: " + e.target.value);
	}
});
/*	handleInputTextKeyDown: function(e)
	{
		if ( e.keyCode!=13 )
			return;
		if ( this.state.value!=this.props.value )
			this.props.onChanged( this.state.value, e );
	},*/