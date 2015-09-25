'use strict';

/*
	UISlider
*/
// max and min height are set by default to know height. This can be overriden by props.style provided by parent
// min width can also be overriden if needed (it's a couple of times the width of the knob by default)
// TODO:
// Event generated need to give more info: which instance of UISlider is calling, etc...
// Vertical or horizontal
// Could use a UIButton as a knob in theory (the button should provide info about where it was clicked...)
// Note explaining element.mouseDown and document.mouseMove/mouseUp!!!
// When a touch interaction happens. Only react to the identifier of the touch. If a mouse interaction happens, cancel touch
// and reciprocally
var UISlider = React.createClass
(
	{
		mixins: [UIDebuggable],

		statics:
		{
			// These settings concern the bar itself. For now they are hard-coded
			// but we could make them more flexible if needed.
			barThickness: 10,
			barBackgroundColor: 'black',
			barBorderRadius: 4
		},

		propTypes: 
		{
			min: React.PropTypes.number,	// Minimum for the slider value (i.e value at full left)
			max: React.PropTypes.number,	// Maximum for the slider value (i.e value at full right)
			step: React.PropTypes.number,	// The increment between each slider value, starting from minimum

			knobWidth: React.PropTypes.number,
			knobHeight: React.PropTypes.number,
			knobImage: React.PropTypes.string,

			onKnobDragMove: React.PropTypes.func,
			onKnobDragEnd: React.PropTypes.func,
		},

		getDefaultProps: function()
		{
			return { 
				min: 0,
				max: 10,
				step: 1,

				knobWidth: 32,
				knobHeight: 32,
				knobImage: null,
	
				onKnobDragMove: null,
				onKnobDragEnd: null,
			};
		},

		getInitialState: function()
		{
			return { 
				dragStartKnobPosition: 0, 		// Position in pixel relative to knob center where the user started the drag (mouse or touch)
				knobNormalizedPosition: 0.8, 	// Position expressed between 0 and 1 and converted into CSS percentage so it's correct on resize
			};
		},
	
		render: function() 
		{
			this._setDebugActive(true);
			this._log( "render " + JSON.stringify( this.state ) );

			var sliderValue =this._getSliderValueFromKnobNormalizedPosition(this.state.knobNormalizedPosition);
			var knobPos = this._getKnobNormalizedPositionFromSliderValue(sliderValue );		

			var knobHeight = this.props.knobHeight;
			var knobWidth = this.props.knobWidth;
			var knobPercentage = (knobPos * 100).toString() + "%";
			var barThickness = UISlider.barThickness;

			// Apply user specified style to the main element
			var mainDivDefaultStyle = {
				minHeight:knobHeight,
				maxHeight:knobHeight,
				minWidth:knobWidth * 4,
				// No maxWidth
			};
			var mainDivStyle = Object.assign( mainDivDefaultStyle, this.props.style);
			mainDivStyle = Object.assign( mainDivStyle, 
							{	position:'relative',
								display:'flex',
								flexDirection:'column',
								justifyContent:'center',
								alignItems:'stretch'} );

			return ( 
						
					// Main Div placing centering its unique child vertically with flex
					<div style={mainDivStyle}
						onMouseDown={this._onBarMouseDown}
										onTouchStart={this._onBarTouchStart}
										onTouchMove={this._onBarTouchMove}
										onTouchEnd={this._onBarTouchEnd}> 

						{/* The rectangle with fixed height for the bar and the knob */ }
						<div style={{flex:'none', height:barThickness}}>
							<div style={{position:'relative', width:'100%', height:'100%'}}>

								{/* The bar */}
								<div style={{
										position:'absolute', 
										left:knobWidth/2,
										right:knobWidth/2,
										top:0,
										bottom:0,
										backgroundColor:UISlider.barBackgroundColor,
										borderRadius:UISlider.barBorderRadius}} 
										
										ref='sliderBar'>
									<div style={{position:'relative', width:'100%', height:'100%'}}>
								
										{/* The knob anchor point placed at proper position on the bar */}
										<div style={{position:'absolute', 
											top: barThickness/2,
											left:knobPercentage,
											width:0,
											height:0}}
											ref='sliderKnobAnchor'>
										
											{/* The knob image (correctly centered on parent anchor) */}
											<div style={{
												position:'relative', 
												top:-knobHeight/2, 
												left:-knobWidth/2, 
												width:knobWidth, 
												height:knobHeight,
												background:'red'}}
												onMouseDown={this._onKnobMouseDown}
												onTouchStart={this._onKnobTouchStart}
												onTouchMove={this._onKnobTouchMove}
												onTouchEnd={this._onKnobTouchEnd}
												ref='sliderKnob'>
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				);
		},

		/*
			Mouse event handlers
		*/
		_onKnobMouseDown : function(e)
		{
			this._log("_onKnobMouseDown");
			e.preventDefault();
			e.stopPropagation();
			document.addEventListener('mousemove', this._onKnobMouseMove, true);
			document.addEventListener('mouseup', this._onKnobMouseUp, true);
			this._knobDragStart( e.clientX, e.clientY );
		},

		_onKnobMouseMove: function(e)
		{
			this._log("_onKnobMouseMove");
			e.preventDefault();
			e.stopPropagation();
			this._knobDragMove( e.clientX, e.clientY );
		},

		_onKnobMouseUp: function(e)
		{	
			this._log("_onKnobMouseUp");
			e.preventDefault();
			e.stopPropagation();
			document.removeEventListener('mousemove', this._onKnobMouseMove, true);
			document.removeEventListener('mouseup', this._onKnobMouseUp, true);
			this._knobDragEnd();
		},

		_onBarMouseDown: function(e)
		{
			this._log("_onBarMouseDown");
			e.preventDefault();
			e.stopPropagation();
			this.setState( {dragStartKnobPosition:0} );
			this._knobDragMove( e.clientX, e.clientY );
			document.addEventListener('mousemove', this._onKnobMouseMove, true);
			document.addEventListener('mouseup', this._onKnobMouseUp, true);
		},

		/*
			Touch event handlers
		*/
		_onKnobTouchStart: function(e)
		{
			this._log("_onKnobTouchStart");
			e.preventDefault();
			e.stopPropagation();
			this._knobDragStart( e.changedTouches[0].clientX, e.changedTouches[0].clientY );
		},

		_onKnobTouchMove: function(e)
		{
			this._log("_onKnobTouchMove");
			e.preventDefault();
			e.stopPropagation();
			this._knobDragMove( e.changedTouches[0].clientX, e.changedTouches[0].clientY );
		},

		_onKnobTouchEnd: function(e)
		{
			this._log("_onKnobTouchEnd");
			e.preventDefault();
			e.stopPropagation();
			this._knobDragEnd();
		},

		_onBarTouchStart: function(e)
		{
			this._log("_onBarTouchStart");
			e.preventDefault();
			e.stopPropagation();
			this.setState( {dragStartKnobPosition:0} );
			this._knobDragMove( e.changedTouches[0].clientX, e.changedTouches[0].clientY );
		},

		_onBarTouchMove: function(e)
		{
			this._log("_onBarTouchMove");
			this._onKnobTouchMove(e);
		},

		_onBarTouchEnd: function(e)
		{
			this._log("_onBarTouchEnd");
			this._onKnobTouchEnd(e);
		},

		/*	
			Common mouse/touch code
		*/
		_knobDragStart: function(x, y)
		{
			var sliderKnobAnchor =  this._getElement('sliderKnobAnchor');
			var mousePosInKnob = this._convertDocumentPositionToElementPosition( x, y, sliderKnobAnchor );
			if ( !mousePosInKnob )
				return;
			var mousePosInKnobX = mousePosInKnob[0];
			this.setState( {dragStartKnobPosition:mousePosInKnobX} );
		},

		_knobDragMove: function(x, y)
		{
			var sliderBar =  this._getElement('sliderBar');
			var mousePosOnBar = this._convertDocumentPositionToElementPosition( x, y, sliderBar);
			if ( !mousePosOnBar )
				return;
			var mousePosOnBarX = mousePosOnBar[0];
			
			var sliderBarWidth = sliderBar.getBoundingClientRect().width;

			var knobPosOnBarX = mousePosOnBarX - this.state.dragStartKnobPosition;
			if ( knobPosOnBarX<0 )
				knobPosOnBarX = 0;
			else if ( knobPosOnBarX>sliderBarWidth )
				knobPosOnBarX = sliderBarWidth;
			
			var knobNormalizedPosition = knobPosOnBarX/sliderBarWidth;
			this.setState( {knobNormalizedPosition:knobNormalizedPosition });

			// Notify client code
			var sliderValue = this._getSliderValueFromKnobNormalizedPosition( knobNormalizedPosition );
			if ( this.props.onKnobDragMove )
				this.props.onKnobDragMove(sliderValue);
		},
		
		_knobDragEnd: function(x, y)
		{
			this.setState( {dragStartKnobPosition:0});

			// Notify client code
			var sliderValue = this._getSliderValueFromKnobNormalizedPosition( this.state.knobNormalizedPosition );
			if ( this.props.onKnobDragEnd )
				this.props.onKnobDragEnd(sliderValue);
		},

		/*
			Lower level functions
		*/
		_getElement : function( elementRefName )
		{
			var element = React.findDOMNode(this.refs[elementRefName]);
			return element;
		},

		// Convert a position expressed in the document coordinate system into 
		// the a given element's coordinate system
		_convertDocumentPositionToElementPosition : function( x, y, element )
		{
			var rect = element.getBoundingClientRect();
			var elementX = x - rect.left;
			var elementY = y - rect.top;
			return [elementX, elementY];
		},

		_getKnobNormalizedPositionFromSliderValue: function( sliderValue )
		{
			var min = this.props.min;
			var max = this.props.max;
			var pos = (sliderValue - min) / (max-min);
			return pos;
		},

		_getSliderValueFromKnobNormalizedPosition: function( knobNormalizedPosition )
		{
			var min = this.props.min;
			var max = this.props.max;
			var step = this.props.step;

			var value = knobNormalizedPosition * ( max-min );
			if ( step!=0 )
				value = this._roundValueTo( value, step );
			value += min;
			return value;
		},

		_roundValueTo: function( value, step )
		{
			var n = Math.round( value / step );
			var v = n * step;
			return v;
		}
	}
);



