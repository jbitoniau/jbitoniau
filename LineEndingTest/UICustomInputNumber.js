'use strict';

/*
	UICustomInputNumber

	Maybe rewrite it completely differently.
	On desktop , have a UICustomInputText for which we do the validation (min/max/step) manually,
	and have our own + and - buttons next to the text, that properly generate onChanging, onChanged
	when hold/release. Also support mouse wheel
	On mobile, use regular Input Text (because on Android, it brings up the virtual keypad).
	As it doesn't have spinner buttons (at least on Android), use the same ones as for desktop.

	Also tooltips to explain live to the user what are the expected value range 
*/
var UICustomInputNumber = React.createClass
(
	{displayName: "UICustomInputNumber",
		getInitialState: function() 
		{
			return { valueAsText:"0" }; // This is so the user can type in intermediate valid values (like "4," when he's entering "4,3")
		},
		
		componentWillMount: function()
		{
			var nextValue = this._clamp( this.props.value, this.props.min, this.props.max );
			this.setState( {valueAsText:nextValue.toString()} );
		},

		componentWillReceiveProps: function(nextProps)
		{
			var nextValue = this._clamp( nextProps.value, this.props.min, this.props.max );
			if ( Number(this.state.valueAsText)==nextValue.toString() )	// That's the key bit here!
			{
				// We keep the value as text
			}
			else
			{
				this.setState( {valueAsText:nextValue.toString()} );
			}
		},

		handleInputControlChange: function(e)
		{
			var oldValueAsText = this.state.valueAsText;
			var newValueAsText = e.target.value.toString();

			var value = this.props.value;		
			var newValue = Number(newValueAsText);

			if ( newValue!=value )
			{
				// If the newValue is not validated, we revert back to previous text value
				if ( this._clamp( newValue, this.props.min, this.props.max )!=newValue )
				{
					this.setState( {valueAsText:oldValueAsText} );
					return;
				}
				this.props.onChanged(newValue, e);	
			}
			else
			{
				this.setState( {valueAsText:newValueAsText} );
			}
		},

		render: function() 
		{	
			var min = this.props.min;
			var max = this.props.max;
			var step = this.props.step;
			return (
					React.createElement("input", {type: "number", 
						value: this.state.valueAsText, 
						onChange: this.handleInputControlChange, 
						min: min, max: max, step: step, 
						style: this.props.style})
				);
		},

		// Clamp a value to a given range. The min and max boundaries are optional
		// For example if a max value is provided but not a min, the check/clamp
		// will be only against the max
		_clamp : function(value, min, max) 
		{
			if ( min!==undefined && min!==null && value<min )
				return min;
			if ( max!==undefined && max!==null && value>max )
				return max;
			return value;
		},
	}
);