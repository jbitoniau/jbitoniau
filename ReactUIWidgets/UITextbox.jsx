var UITextbox = React.createClass
(
	{
		mixins: [UIDebuggable],

		getInitialState: function()
		{
			return {
					editInProgress:false,
					newValue:""
				};
		},

		render: function()
		{
			// Here you give your widget its default style, typically it's min 
			// and possibly max size, depending on the nature of the widget
			var mainDivDefaultStyle = {
			};

			// Then we override the default style with the user-defined one
			var mainDivStyle = Object.assign( mainDivDefaultStyle, this.props.style);
			
			// Then we override the position and possibly some other properties...
			mainDivStyle = Object.assign( mainDivStyle, 
								{
									position:'relative',
									// Don't specify size here as it should be done via user-defined style
									// as for any regular HTML/CSS element
								} );

			var editInProgress = this.state.editInProgress;
			if ( editInProgress )
			{
				return (
					<input type='text' 
						style={mainDivStyle}
						onChange={this._onInputChanged}
						onBlur={this._onInputBlur}
						onKeyDown={this._onInputKeyDown}
						value={this.state.newValue}
						ref='inputElement'/> 
					);
			}
			else
			{
				return (
					<div style={mainDivStyle}
						onClick={this._onClick}>{this.props.value}</div> );
			}
		},

		componentDidUpdate: function(prevProps, prevState)
		{
			if ( !prevState.editInProgress && this.state.editInProgress )
			{
				var inputElement = React.findDOMNode( this.refs.inputElement );
				if ( !inputElement )
					return;
				inputElement.focus();

			}
		},

		_onClick: function(e)
		{
			console.log("click");
			this.setState( {editInProgress:true, newValue:this.props.value} );
		},

		_onInputChanged: function(e)
		{
			console.log("changed: " + e.target.value );
			this.setState( {newValue:e.target.value} );
		},

		_onInputBlur: function(e)
		{
			this._stopEdit();
		},

		_onInputKeyDown: function(e)
		{
			if ( !this.state.editInProgress )
				return;	 // Shouldn't happen but we never know
			if ( e.keyCode!=13 )
				return;
			this._stopEdit();
		},

		_stopEdit: function()
		{
			// Notify!!!
			console.log("changed:!" + this.state.newValue );

			this.setState( {editInProgress:false, newValue:''} );
			
		},
	}
);