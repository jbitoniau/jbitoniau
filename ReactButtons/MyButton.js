'use strict';

// Some inspiration from http://stackoverflow.com/questions/28072196/a-hover-button-in-react-js
var MyButton = React.createClass
(
	{displayName: "MyButton",
		propTypes: 
		{
			enabled: React.PropTypes.bool,
			hoverable: React.PropTypes.bool,
			
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
					enabled:true,
					hoverable: true,
					
					width:32,
					height:32,
					image:null,
					
					hoverImage:null,
					hoverImageOpacity:0.5,
					
					activeImage:null,
					activeImageOpacity:0.5
				};
		},
	
		getInitialState: function()
		{
			// The visual state of the button when it's enabled.
			// Being disabled is not a state but a prop
			return {enabledState:'normal'};	// normal: the button is sitting here, waiting to get pressed
											// hover: the mouse is hovering above it
											// active: the button is being clicked
										
		},
		
		render: function()
		{
			console.log("s= " + this.state.enabledState );
	
			var image = this.props.image;
			var w = this.props.width;
			var h = this.props.height;

			// Main image
			var mainImageStyle = null;
			if ( this.props.enabled )
				mainImageStyle = MyButtonStyles['mainImage_' + this.state.enabledState];
			else
				mainImageStyle = MyButtonStyles['mainImage_' + 'disabled'];
			Object.assign( mainImageStyle, MyButtonStyles['common']);

			// Hover image
			var hoverImage = null;
			if ( this.props.hoverable )
			{
				hoverImage = this.props.hoverImage;
				var hoverImageOpacity = 0;
				var hoverImageStyle = {};
				Object.assign( hoverImageStyle, MyButtonStyles['common']);
				if ( this.props.enabled && this.state.enabledState=='hover' )
				{
					hoverImageOpacity = this.props.hoverImageOpacity;
					Object.assign( hoverImageStyle, MyButtonStyles['hoverImage'] );
				}
				hoverImageStyle['filter'] = 'opacity(' + hoverImageOpacity + ')';
				hoverImageStyle['WebkitFilter'] = 'opacity(' + hoverImageOpacity + ')';
			}
			
			// Active image
			var activeImage = this.props.activeImage;
			var activeImageOpacity = 0;
			var activeImageStyle = {};
			Object.assign( activeImageStyle, MyButtonStyles['common']);
			if ( this.props.enabled && this.state.enabledState=='active' )
			{
				activeImageOpacity = this.props.activeImageOpacity;
				Object.assign( activeImageStyle, MyButtonStyles['activeImage'] );
			}
			activeImageStyle['filter'] = 'opacity(' + activeImageOpacity + ')';
			activeImageStyle['WebkitFilter'] = 'opacity(' + activeImageOpacity + ')';
						
			return ( 
					React.createElement("div", {style: {flex:'none', position:'relative', width:w, height:h}, 
									onMouseDown: this.onMouseDown, 
									onMouseUp: this.onMouseUp, 
									onClick: this.onButtonClick, 
									onMouseOver: this.onMouseOver, 
									onMouseOut: this.onMouseOut, 
									onTouchStart: this.onMouseDown, 
									onTouchEnd: this.onMouseUp
									}, 
									
						React.createElement("div", {style: {position:'absolute', top:0, left:0, zIndex:5}}, 
							React.createElement("img", {	src: image, 
									onDragStart: this.onDragStart, 
									style: mainImageStyle, 
									width: w, 
									height: h, 
									ref: "mainDiv"}
									
								)	
						), 
						
						
							hoverImage ?
								React.createElement("div", {style: {position:'absolute', top:0, left:0, zIndex:17}}, 
									React.createElement("img", {	src: hoverImage, 
											onDragStart: this.onDragStart, 
											style: hoverImageStyle, 
											width: w, 
											height: h})
								)
							:
								null, 
						
						
						
							activeImage ?
								React.createElement("div", {style: {position:'absolute', top:0, left:0, zIndex:17}}, 
									React.createElement("img", {	src: activeImage, 
											onDragStart: this.onDragStart, 
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
			if ( this.state.state=='disabled' )
				return;	
				
			if ( !this.props.hoverable )
				return;	
		
			this.setState( {enabledState:'hover'} );
		},
		
		onMouseOut: function(e)
		{
			if ( this.state.state=='disabled' )
				return;	
	
			if ( !this.props.hoverable )
				return;					
		
			// Back to normal when we leave an enabled button, even if it's being pressed,
			// which isn't great but will do for now
			this.setState( {enabledState:'normal'} );
		},
		
		onMouseDown: function(e)
		{
			if ( this.state.state=='disabled' )
				return;	
			this.setState( {enabledState:'active'} );
		},
		
		onMouseUp: function(e)
		{
			if ( this.state.state=='disabled' )
				return;	
				
			// We know that the mouse cursor must still be on the element otherwise 
			// we would have received a "mouse out" event, so that means we get 
			// back to the hover state. It's a bit border line but it works.
			// If the button is not hoverable, we get back to normal instead.
			if ( this.props.hoverable )
				this.setState( {enabledState:'hover'} );
			else
				this.setState( {enabledState:'normal'} );
		},
				
		onButtonClick: function(e)
		{	
			// We should generate the click event ourselves! 
			// We would bypass the 300ms delay that can happen on mobile
			console.log("button click");
		},
	}
);

var MyButtonStyles = 
{
	common:
	{
		WebkitUserSelect:'none',
		MozUserSelect: '-moz-none',
		msUserSelect: 'none',
		userSelect: 'none',
	},

	mainImage_normal: 
	{
		//backgroundColor:'rgba(255,0,255,0.1)',
	},
	
	mainImage_hover: 
	{
		//backgroundColor:'rgba(255,0,0,0.3)',
	},
	
	mainImage_active:
	{
		//backgroundColor:'rgba(255,0,0,0.8)',
		position:'relative',
		top:1,
		left:1
	},
	
	mainImage_disabled:
	{
		//backgroundColor:'rgba(128,128,128,0.5)',
		WebkitFilter: 'opacity(0.3)',
		filter: 'opacity(0.3)'
	},
	
	hoverImage:
	{
	},
	
	activeImage:
	{
		position:'relative',
		top:1,
		left:1
	},
	
	
};
