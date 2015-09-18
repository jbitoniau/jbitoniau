'use strict';

// Some inspiration from http://stackoverflow.com/questions/28072196/a-hover-button-in-react-js
var MyBasicButton = React.createClass
(
	{displayName: "MyBasicButton",
		getInitialState: function()
		{
			// The visual state of the button when it's enabled.
			// Being disabled is not a state but a prop
			return {
						hovered: false,		// The mouse is hovering above the button
						active: false,		// The button is active: being pressed if one-shot button, or toggled if toggle button
						text: ''
					};	
		},
		
		render: function()
		{
			console.log( JSON.stringify(this.state) );
		
			var mainImage = 'ToolAddVoxel.png';
			var w = 64;
			var h = 64;
			
			var eventHandlers = {
						onMouseDown: this.onMouseDown,
						onMouseUp: this.onMouseUp,
						onClick: this.onButtonClick,
						onMouseEnter: this.onMouseEnter,
						onMouseLeave: this.onMouseLeave,
						onTouchStart: this.onMouseDown,
						onTouchEnd: this.onMouseUp
					};		
					
			return ( 
					React.createElement("div", {style: {flex:'none'}
														}, 
						React.createElement("div", React.__spread({style: {width:w, height:h, backgroundColor:this.props.col}}, 
							eventHandlers)), 
					
						React.createElement("div", {style: {position:'absolute', top:0, left:this.props.a}}, 
							React.createElement("pre", {ref: "logDiv"}
							)
						)
					)
				);
		},
		
		onMouseEnter: function(e)
		{
			this._log("onMouseEnter");
			
			e.stopPropagation();
			e.preventDefault();		
			
			if ( this.state.state=='disabled' )
				return;	
					
			this.setState( {hovered:true} );
		},
		
		onMouseLeave: function(e)
		{
			this._log("onMouseLeave");
			
			e.stopPropagation();
			e.preventDefault();		
			
			if ( this.state.state=='disabled' )
				return;	
	
			this.setState( {hovered:false} );
			
			// If the button is active when the mouse leaves it, we simulate 
			// a mouse up event. This is because we only get mouse up when 
			// inside the element. When the mouse up happens outside, it is 
			// lost to us.
			if ( this.state.active )
				this.onMouseUp(e);
		},
		
		onMouseDown: function(e)
		{
			this._log("onMouseDown");
			
			e.stopPropagation();
			e.preventDefault();
			
			if ( this.state.state=='disabled' )
				return;	
			
			if ( this.props.toggleable )
			{
				this.setState( {active:!this.state.active} );
			}
			else
			{
				this.setState( {active:true} );
			}
		},
		
		onMouseUp: function(e)
		{
			this._log("onMouseUp");
			
			e.stopPropagation();
			e.preventDefault();
						
			if ( this.state.state=='disabled' )
				return;	
				
			if ( this.props.toggleable )
			{
				// Do nothing here!
			}
			else
			{
				this.setState( {active:false} );
			}
		},
				
		onButtonClick: function(e)
		{	
			this._log("onButtonClick");
			e.stopPropagation();
			e.preventDefault();
			
			// We should generate the click event ourselves! 
			// We would bypass the 300ms delay that can happen on mobile
			console.log("button click");
		},
		
		_log: function(text)
		{
			var element = React.findDOMNode(this.refs.logDiv);
			if ( element )
			{
				element.innerHTML += text + '\n';
			}
		},
	}
);
