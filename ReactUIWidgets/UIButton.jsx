'use strict';


var UIButton = React.createClass
( 
	{

		render: function()
		{
			// Here you give your widget its default style, typically it's min 
			// and possibly max size, depending on the nature of the widget
			var mainDivDefaultStyle = {
				minHeight:40,
				minWidth:40,
			};

			// Then we override the default style with the user-defined one
			var mainDivStyle = Object.assign( mainDivDefaultStyle, this.props.style);
			
			// Then we override the position and possibly some other properties...
			mainDivStyle = Object.assign( mainDivStyle, 
								{
									position:'relative',
									// Could be also display:flex and other things here...
								} );

			return (
				// The main div of the widget
				<div style={mainDivStyle}>
					<div style={{position:'absolute', top:10, left:10, bottom:10, right:10, backgroundColor:'red'}}>
						Widget!
					</div>
				</div> );
		}

	}
);

/*
	width, height and image are required.
	style can be provided by parent. It applies to the main div of the button.
*/

// Some inspiration from http://stackoverflow.com/questions/28072196/a-hover-button-in-react-js
/*var UIButton = React.createClass
( 
	{
		propTypes: 
		{
			onClick: React.PropTypes.func,			// Only when toggleable is false
			onToggled: React.PropTypes.func,		// Only when toggleable is true
			onUntoggled: React.PropTypes.func,		// Only when toggleable is true
			enabled: React.PropTypes.bool,
			toggleable: React.PropTypes.bool,
			
			width: React.PropTypes.number.isRequired,
			height: React.PropTypes.number.isRequired,
			image: React.PropTypes.string.isRequired,
			
			hoverImage: React.PropTypes.string,
			hoverImageOpacity: React.PropTypes.number,
			
			activeImage: React.PropTypes.string,
			activeImageOpacity: React.PropTypes.number,
			
			tooltip: React.PropTypes.string,
		},
		
		getDefaultProps: function()
		{
			return { 
					onClick: null,
					onToggled: null,
					onUntoggled: null,
					enabled: true,
					toggleable: false,
					
					width: 32,
					height: 32,
					image: null,
					
					hoverImage: null,
					hoverImageOpacity: 0.5,
					
					activeImage: null,
					activeImageOpacity: 0.5,
					
					tooltip: null
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

			var w = this.props.width;
			var h = this.props.height;
			
			var mainDivStyle = Object.assign( {}, this.props.style );
			mainDivStyle = Object.assign( mainDivStyle, {position:'relative', width:w, height:h} );
			
			var mainImage = this.props.image;
			var mainImageStyle = {};
			
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
						//onClick: this.onButtonClick,
						onMouseEnter: this.onMouseEnter,
						onMouseLeave: this.onMouseLeave,
						onTouchStart: this.onMouseDown,
						onTouchEnd: this.onMouseUp
					};		
					
			return ( 
					<div title={this.props.tooltip} style={mainDivStyle}>
									
						<div style={{position:'absolute', top:0, left:0, zIndex:1}}>
							<img 	src={mainImage}
									style={mainImageStyle}
									width={w} 
									height={h}
									{...eventHandlers} />	
						</div>
						
						{
							hoverImage ?
								<div style={{position:'absolute', top:0, left:0, zIndex:2, pointerEvents:'none'}}>
									<img 	src={hoverImage}
											style={hoverImageStyle}
											width={w} 
											height={h}/>
								</div>
							:
								null
						}
						
						{
							activeImage ?
								<div style={{position:'absolute', top:0, left:0, zIndex:3, pointerEvents:'none'}}>
									<img 	src={activeImage}
											style={activeImageStyle}
											width={w} 
											height={h}/>
								</div>
							:
								null
						}
					</div>
				);
		},
		
		onMouseEnter: function(e)
		{
			//console.log("onMouseEnter");
			
			e.stopPropagation();
			e.preventDefault();		
			
			if ( this.state.state=='disabled' )
				return;	
					
			this.setState( {hovered:true} );
		},
		
		onMouseLeave: function(e)
		{
			//console.log("onMouseLeave");
			
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
			
			e.stopPropagation();		// All these are to prevent the browser's default behaviour to
			e.preventDefault();			// emulate a mouseEnter/Leave (and therefore a hover feedback)
			
			if ( this.state.state=='disabled' )
				return;	
			
			if ( this.props.toggleable )
			{
				this.setState( {active:!this.state.active} );
				if (!this.state.active)
				{
					if ( this.props.onToggled )
						this.props.onToggled(e);
				}
				else
				{
					if ( this.props.onUntoggled )
						this.props.onUntoggled(e);
				}
			}
			else
			{
				this.setState( {active:true} );
				if ( this.props.onClick )
					this.props.onClick(e);
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
				
		
	}
);*/
