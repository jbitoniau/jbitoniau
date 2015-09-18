'use strict';

// Some inspiration from http://stackoverflow.com/questions/28072196/a-hover-button-in-react-js
var MyButton = React.createClass
(
	{displayName: "MyButton",
		propTypes: 
		{
			enabled: React.PropTypes.bool,
			toggleable: React.PropTypes.bool,
			
			width: React.PropTypes.number.isRequired,
			height: React.PropTypes.number.isRequired,
			image: React.PropTypes.string.isRequired,
			
			hoverImage: React.PropTypes.string,
			hoverImageOpacity: React.PropTypes.number,
			
			activeImage: React.PropTypes.string,
			activeImageOpacity: React.PropTypes.number
		},
		
		getDefaultProps: function()
		{
			return { 
					enabled: true,
					toggleable: false,
					
					width: 32,
					height: 32,
					image: null,
					
					hoverImage: null,
					hoverImageOpacity: 0.5,
					
					activeImage: null,
					activeImageOpacity: 0.5
				};
		},
	
		getInitialState: function()
		{
			// The visual state of the button when it's enabled.
			// Being disabled is not a state but a prop
			return {
						hovered: false,		// The mouse is hovering above the button
						active: false		// The button is active: being pressed if one-shot button, or toggled if toggle button
					};	
		},
		
		render: function()
		{
			console.log( JSON.stringify(this.state) );
		
			var mainImage = this.props.image;
			var mainImageStyle = {};
			var w = this.props.width;
			var h = this.props.height;
			
			var hoverImage = this.props.hoverImage;
			var hoverImageStyle = { 
					filter: 'opacity(0)',
					WebkitFilter: 'opacity(0)',
				};
				
			var activeImage = this.props.activeImage;
			var activeImageStyle = { 
					filter: 'opacity(0)',
					WebkitFilter: 'opacity(0)',
				};
			
			if ( this.props.enabled )
			{
				// Normal stuff here
			
				if ( this.state.hovered )
				{
					var opacity = this.props.hoverImageOpacity;
					hoverImageStyle['filter'] = 'opacity(' + opacity + ')';
					hoverImageStyle['WebkitFilter'] = 'opacity(' + opacity + ')';
				}
				
				if ( this.state.active )
				{
					var opacity = this.props.activeImageOpacity;
					activeImageStyle['filter'] = 'opacity(' + opacity + ')';
					activeImageStyle['WebkitFilter'] = 'opacity(' + opacity + ')';
					
					mainImageStyle['position'] = 'relative';
					mainImageStyle['top'] = 1;
					mainImageStyle['left'] = 1;
					hoverImageStyle['position'] = 'relative';
					hoverImageStyle['top'] = 1;
					hoverImageStyle['left'] = 1;
					activeImageStyle['position'] = 'relative';
					activeImageStyle['top'] = 1;
					activeImageStyle['left'] = 1;
				}
			}
			else
			{	
				mainImageStyle['WebkitFilter'] ='opacity(0.3)';
				mainImageStyle['filter'] ='opacity(0.3)';
			}
						
						
			var commonStyle = 
				{
					WebkitUserSelect:'none',
					MozUserSelect: '-moz-none',
					msUserSelect: 'none',
					userSelect: 'none',
				};
				
			Object.assign( mainImageStyle, commonStyle);
			Object.assign( hoverImageStyle, commonStyle);
			Object.assign( activeImageStyle, commonStyle);
					
			var eventHandlers = {
						onMouseDown: this.onMouseDown,
						onMouseUp: this.onMouseUp,
						onClick: this.onButtonClick,
						onMouseOver: this.onMouseOver,
						onMouseOut: this.onMouseOut,
						onTouchStart: this.onMouseDown,
						onTouchEnd: this.onMouseUp
					};		
					
			return ( 
					React.createElement("div", {style: {flex:'none', position:'relative', width:w, height:h}
									}, 
									
						React.createElement("div", {style: {position:'absolute', top:0, left:0, zIndex:1}}, 
							React.createElement("img", React.__spread({	src: mainImage, 
									style: mainImageStyle, 
									width: w, 
									height: h}, 
									eventHandlers, 
									{ref: "mainDiv"}))	
						), 
						
						
							hoverImage ?
								React.createElement("div", {style: {position:'absolute', top:0, left:0, zIndex:2, pointerEvents:'none'}}, 
									React.createElement("img", {	src: hoverImage, 
											style: hoverImageStyle, 
											width: w, 
											height: h})
								)
							:
								null, 
						
						
						
							activeImage ?
								React.createElement("div", {style: {position:'absolute', top:0, left:0, zIndex:3, pointerEvents:'none'}}, 
									React.createElement("img", {	src: activeImage, 
											style: activeImageStyle, 
											width: w, 
											height: h})
								)
							:
								null
						
					)
				);
		},
		
		onDragStart: function(e)
		{
			// Unfortunately the "draggable={false}" attribute on the image doesn't work in Firefox
			// http://stackoverflow.com/questions/4211909/disable-dragging-an-image-from-an-html-page
			e.stopPropagation();
			e.preventDefault();			
		},
				
		onMouseOver: function(e)
		{
			//console.log("onMouseOver");
			
			e.stopPropagation();
			e.preventDefault();		
			
			if ( this.state.state=='disabled' )
				return;	
					
			this.setState( {hovered:true} );
		},
		
		onMouseOut: function(e)
		{
			//console.log("onMouseOut");
			
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
			//console.log("onMouseDown");
			
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
			//console.log("onMouseUp");
			
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
			e.stopPropagation();
			e.preventDefault();
			
			// We should generate the click event ourselves! 
			// We would bypass the 300ms delay that can happen on mobile
			console.log("button click");
		},
	}
);
