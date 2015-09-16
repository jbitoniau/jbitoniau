'use strict';


// Some inspiration from http://stackoverflow.com/questions/28072196/a-hover-button-in-react-js
var MyButton = React.createClass
(
	{
		propTypes: 
		{
			enabled: React.PropTypes.bool,
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
				image:null,
				hoverImage:null,
				hoverImageOpacity:0.5,
				activeImage:null,
				activeImageOpacity:0.5}
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
//console.log("s= " + this.state.enabledState );
	
			var image = this.props.image;
			var w = 64;
			var h = 64;
			

			// Main image
			var mainImageStyle = null;
			if ( this.props.enabled )
				mainImageStyle = MyButtonStyles['mainImage_' + this.state.enabledState];
			else
				mainImageStyle = MyButtonStyles['mainImage_' + 'disabled'];
			Object.assign( mainImageStyle, MyButtonStyles['common']);

			// Hover image
			var hoverImage = this.props.hoverImage;
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
					<div style={{flex:'none', position:'relative', width:w, height:h}}
									onMouseDown={this.onMouseDown}
									onMouseUp={this.onMouseUp}
									onClick={this.onButtonClick}
									onMouseOver={this.onMouseOver}
									onMouseOut={this.onMouseOut}
									>
									
						<div style={{position:'absolute', top:0, left:0, zIndex:5}}>
							<img 	src={image}
									onDragStart={this.onDragStart}
									style={mainImageStyle}
									width={w} 
									height={h}
									ref='mainDiv'
									
								/>	
						</div>
						
						{
							hoverImage ?
								<div style={{position:'absolute', top:0, left:0, zIndex:17}}>
									<img 	src={hoverImage}
											onDragStart={this.onDragStart}
											style={hoverImageStyle}
											width={w} 
											height={h}/>
								</div>
							:
								null
						}
						
						{
							activeImage ?
								<div style={{position:'absolute', top:0, left:0, zIndex:17}}>
									<img 	src={activeImage}
											onDragStart={this.onDragStart}
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
		
		onDragStart: function(e)
		{
			// Unfortunately the "draggable={false}" attribute on the image doesn't work in Firefox
			// http://stackoverflow.com/questions/4211909/disable-dragging-an-image-from-an-html-page
			e.stopPropagation();
			e.preventDefault();			
		},
				
		onMouseOver: function(e)
		{
		console.log("onMouseOver " + e.currentTarget + " " + e.target.src);		
			if ( this.state.state=='disabled' )
				return;	
		
	/*		var mainDiv = React.findDOMNode(this.refs.mainDiv);
			if ( !mainDiv )
				return;	
				
				
			if ( e.currentTarget!=mainDiv )
				return;
		*/	
		
			this.setState( {enabledState:'hover'} );
		},
		
		onMouseOut: function(e)
		{
	console.log("onMouseOut " + e.currentTarget + " " + e.target.src);		
					if ( this.state.state=='disabled' )
				return;	
				
		/*	var mainDiv = React.findDOMNode(this.refs.mainDiv);
			if ( !mainDiv )
				return;	
			
			if ( e.currentTarget!=mainDiv )
				return;*/
	
			
			// Back to normal when we leave an enabled button, even if it's being pressed,
			// which isn't great... but will do for now
			this.setState( {enabledState:'normal'} );

		},
		
		onMouseDown: function(e)
		{
			if ( this.state.state=='disabled' )
				return;	
			this.setState( {enabledState:'active'} );
console.log("onMouseDown");

		},
		
		onMouseUp: function(e)
		{
			if ( this.state.state=='disabled' )
				return;	
				
			// We know that the mouse cursor must still be on the element 
			// otherwise we would have received a "mouse out" event, so 
			// that means we get back to the hover state. It's a bit border
			// line but it works
			this.setState( {enabledState:'hover'} );
console.log("onMouseUp");		},
				
		onButtonClick: function(e)
		{	
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

var MyApplication = React.createClass
(
	{
		render: function() 
		{
			return (	
					<div style={{
							position:'absolute',
							left:0,
							top:0,
							right:0,
							bottom:0,
							overflow:'hidden'
						}}>
			
						<div style={{
							position:'absolute',
							left:0,
							top:0,
							right:0,
							bottom:0,
							background:'url(Background.png) no-repeat'}}
							onClick={this.onClick}
							
							/>
			
						<div style={{
							position:'absolute',
							left:0,
							top:0,
							bottom:0,
							
							display:'flex',
							overflow: 'hidden',
							flexDirection:'column',
							flexWrap:'nowrap',

							}}>
							
							<MyButton image='ToolAddVoxel.png' enabled={false}/>
							<MyButton image='ToolAddVoxel.png' 
								hoverImage='ButtonMask.png' hoverImageOpacity={0.2}
								activeImage='ButtonMask2.png' activeImageOpacity={0.7}/>
						</div>
						
					</div>
				);
		},
		
		onClick: function()
		{
			console.log("CLICK canvas!");
		}
	}
);
