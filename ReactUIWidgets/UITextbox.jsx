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
			var editInProgress = this.state.editInProgress;
			if ( editInProgress )
			{
				return <input type='text' 
					onChange={this._onInputChanged}
					onBlur={this._onInputBlur}
					onKeyDown={this._onInputKeyDown}
					value={this.state.newValue}
					ref='inputElement'/>
			}
			else
			{
				return <div onClick={this._onClick}>{this.props.value}</div>
			}
		},

		_onClick: function(e)
		{
			console.log("click");
			var inputElement = React.findDOMNode( this.refs.inputElement );
			if ( !inputElement )
				return;
			inputElement.focus();
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
			this.setState( {editInProgress:false, newValue:''} );
			// Notify!!!
			console.log("changed: " + e.target.value );
		},
	/*	handleInputTextKeyDown: function(e)
		{
			if ( e.keyCode!=13 )
				return;
			if ( this.state.value!=this.props.value )
				this.props.onChanged( this.state.value, e );
		},*/
		
	}
);