'use strict';

var MySlider = React.createClass
(
	{
		propTypes: 
		{
			onKnobDragStart: React.PropTypes.func,
			onKnobDragMove: React.PropTypes.func,
			onKnobDragEnd: React.PropTypes.func,
			
			barWidth: React.PropTypes.number,
			barHeight: React.PropTypes.number,
			knobWidth: React.PropTypes.number,
			knobHeight: React.PropTypes.number,
			knobImage: React.PropTypes.string,
		},

		getDefaultProps: function()
		{
			return { 
					onKnobDragStart: null,
					onKnobDragMove: null,
					onKnobDragEnd: null,
					
					barWidth: 300,
					barHeight: 20,
					knobWidth: 64,
					knobHeight: 64,
					knobImage: null,
				};
		},

		getInitialState: function()
		{
			return { 
					knobPosition:0,
					knobDragPointX:0,	// Relative to center of knob
					knobDragPointY:0 	// NOTE: this is not used at the moment
				};
		},
	
		render: function() 
		{
			console.log( JSON.stringify(this.state) );

			var barWidth = this.props.barWidth;
			var barHeight = this.props.barHeight;
			var knobWidth = this.props.knobWidth;
			var knobHeight = this.props.knobHeight;

			var knobPosX = this.state.knobPosition - (knobWidth/2);
			var knobPosY = (barHeight/2) - (knobHeight/2);

			var sliderWidth = barWidth + knobWidth;
			var sliderHeight = barHeight>knobHeight ? barHeight : knobHeight;

			var knobProps = {
						style:{ position:'absolute', 
								left:knobPosX+(knobWidth/2), 
								top:(sliderHeight/2) - (knobHeight/2), 
								width:knobWidth, 
								height:knobHeight, },	
						onMouseDown: this._onKnobMouseDown,	// onMouseUp and onMouseMove are handled at the document level to work outside the knob area
						onTouchStart: this._onKnobTouchStart,
						onTouchMove: this._onKnobTouchMove,
						ref: 'knobElement'
					};

			if ( !this.props.knobImage )
			{
				knobProps.style['backgroundColor'] = '#000000';
				knobProps.style['borderRadius'] = 8;
			}

			return (
					<div style={{ flex:'auto',
									position:'relative',
									minWidth:sliderWidth, minHeight:sliderHeight,
									maxWidth:sliderWidth, maxHeight:sliderHeight,
									width:sliderWidth, 
									height:sliderHeight}}
							ref='mainElement'>
					
						<div style={{position:'absolute', 
										left:knobWidth/2, 
										top:(sliderHeight/2) - (barHeight/2), 
										width:barWidth, 
										height:barHeight, 
										backgroundColor:'grey'}}
								onMouseDown={this._onBarMouseDown}
								onTouchStart={this._onBarTouchStart}
								onTouchMove={this._onBarTouchMove}
								onTouchEnd={this._onBarTouchEnd}
								ref='barElement'>
						</div>

						{
							this.props.knobImage ?
								<img {...knobProps} src={this.props.knobImage}/>
							:
								<div {...knobProps}/>
						}

					</div>
				);
		},

		_documentToSliderElementPosition : function( x, y, sliderElementRefName )
		{
			var sliderElement = React.findDOMNode(this.refs[sliderElementRefName]);
			if ( !sliderElement )
				return null;
			var rect = sliderElement.getBoundingClientRect();
			var sliderElementX = x - rect.left;
			var sliderElementY = y - rect.top;
			return [sliderElementX, sliderElementY];
		},

		_knobDragStart: function(x, y)
		{
			var knobPos = this._documentToSliderElementPosition( x, y, 'knobElement');
			if ( !knobPos )
				return;
			var knobPosX = knobPos[0] - ( this.props.knobWidth/2 );
			var knobPosY = knobPos[1] - ( this.props.knobHeight/2 );
			this.setState( {knobDragPointX:knobPosX, knobDragPointY:knobPosY });	// The position is relative to the knob center
		},

		_knobDragMove: function(x, y)
		{
			var barPos = this._documentToSliderElementPosition( x, y, 'barElement');
			if ( !barPos )
				return;
			var barPosX = barPos[0];
			//var barPosY = barPos[1];
			var knobPos = barPosX - this.state.knobDragPointX;
			if ( knobPos<0 )
				knobPos = 0;
			else if ( knobPos>this.props.barWidth )
				knobPos = this.props.barWidth;
			this.setState( {knobPosition:knobPos });
		},
		
		_knobDragEnd: function(x, y)
		{
			this.setState( {knobDragPointX:0, knobDragPointY:0 });
		},

		_onKnobMouseDown: function(e)
		{	
console.log('_onKnobMouseDown');
			e.preventDefault();
			e.stopPropagation();

			document.addEventListener('mousemove', this._onDocumentMouseMove, true);
			document.addEventListener('mouseup', this._onDocumentMouseUp, true);

			var x = e.clientX;
			var y = e.clientY;
			this._knobDragStart( x, y );
		},
		
		_onDocumentMouseMove: function(e)
		{
console.log('_onDocumentMouseMove');
			e.preventDefault();
			e.stopPropagation();

			var x = e.clientX;
			var y = e.clientY;
			this._knobDragMove( x, y );
		},

		_onDocumentMouseUp: function(e)
		{	
console.log('_onDocumentMouseUp');
			e.preventDefault();
			e.stopPropagation();
			
			document.removeEventListener('mousemove', this._onDocumentMouseMove, true);
			document.removeEventListener('mouseup', this._onDocumentMouseUp, true);
			this._knobDragEnd();
		},

		_onBarMouseDown: function(e)
		{
console.log('_onBarMouseDown');
			e.preventDefault();
			e.stopPropagation();
			
			this.setState( {knobDragPointX:0, knobDragPointY:0 });
			
			var x = e.clientX;
			var y = e.clientY;
			this._knobDragMove( x, y );

			document.addEventListener('mousemove', this._onDocumentMouseMove, true);
			document.addEventListener('mouseup', this._onDocumentMouseUp, true);
		},

		_onKnobTouchStart: function(e)
		{
console.log('_onKnobTouchStart');
			e.preventDefault();
			e.stopPropagation();

			var x = e.changedTouches[0].clientX;
			var y = e.changedTouches[0].clientY;
			this._knobDragStart( x, y );
		},
		
		_onKnobTouchMove: function(e)
		{
console.log('_onKnobTouchMove');
			e.preventDefault();
			e.stopPropagation();

			var x = e.changedTouches[0].clientX;
			var y = e.changedTouches[0].clientY;
			this._knobDragMove( x, y );
		},

		_onKnobTouchEnd: function(e)
		{
console.log('_onKnobTouchMove');
			e.preventDefault();
			e.stopPropagation();

			this._knobDragEnd();
		},

		_onBarTouchStart: function(e)
		{
console.log('_onBarTouchStart');
			e.preventDefault();
			e.stopPropagation();

			this.setState( {knobDragPointX:0, knobDragPointY:0 });
			
			var x = e.changedTouches[0].clientX;
			var y = e.changedTouches[0].clientY;
			this._knobDragMove( x, y );
		},

		_onBarTouchMove: function(e)
		{
console.log('_onBarTouchMove');
			e.preventDefault();
			e.stopPropagation();

			var x = e.changedTouches[0].clientX;
			var y = e.changedTouches[0].clientY;
			this._knobDragMove( x, y );
		},

		_onBarTouchEnd: function(e)
		{
console.log('_onBarTouchEnd');
			e.preventDefault();
			e.stopPropagation();
			this._knobDragEnd();
		},
	}
);

