'use strict';

var MySlider = React.createClass
(
	{displayName: "MySlider",
		getInitialState: function()
		{
			return { 
				mouseButtonPressed: -1,
				knobPosition:0 };
		},
	
		render: function() 
		{
		
		//console.log("render" + this.state.knobPosition);
			return (
				React.createElement("div", {style: {position:'absolute', left:140, width:500, height:80, backgroundColor:'#BBBBBB'}, ref: "mainDiv"}, 
				
					React.createElement("div", {
						style: {position:'relative', left:this.state.knobPosition, top:20, width:30, height:40, backgroundColor:'#FF0000'}, 
						onMouseDown: this._onMouseDown, 
						onTouchStart: this._onTouchStart, 
						onTouchMove: this._onTouchMove}
						
					)
				
				)
				);
		},
		
		_onTouchStart: function(e)
		{
		},
		
		_onTouchMove: function(e)
		{
			var x = e.changedTouches[0].clientX;
			var y = e.changedTouches[0].clientY;
			
			var mainDiv = React.findDOMNode(this.refs.mainDiv);
			if ( !mainDiv )
				return;
			var rect = mainDiv.getBoundingClientRect();

			var knobPos = x -  rect.left;
			if ( knobPos<0 )
				knobPos=0;
			else if ( knobPos>rect.width )
				knobPos=rect.width;
		
			//console.log('x:'+x+ "  y:"+y + "  knobPos:" + knobPos);
			this.setState( {knobPosition:knobPos} );
		
		},
		
		_onMouseDown: function(e)
		{	
			console.log("_onMouseDown ");
			
			this.setState( {mouseButtonPressed:e.button} );
			document.addEventListener('mousemove', this._onMouseMove, true);
			document.addEventListener('mouseup', this._onMouseUp, true);
		},
		
		_onMouseUp: function(e)
		{	
			console.log("_onMouseUp");
			
//if ( this.state.mouseButtonPressed!=e.button )
//				return;	
			
			document.removeEventListener('mousemove', this._onMouseMove, true);
			document.removeEventListener('mouseup', this._onMouseUp, true);
		},
		
		_onMouseMove: function(e)
		{
//if ( this.state.mouseButtonPressed!=e.button )
//	return;	
			
			var mainDiv = React.findDOMNode(this.refs.mainDiv);
			if ( !mainDiv )
				return;
			var rect = mainDiv.getBoundingClientRect();

			var mouseX = e.clientX;
			var mouseY = e.clientY;
			
			var knobPos = mouseX -  rect.left;
			if ( knobPos<0 )
				knobPos=0;
			else if ( knobPos>rect.width )
				knobPos=rect.width;
				
console.log('x:'+mouseX+ "  y:"+mouseY + "  rectX" + rect.left + "  knobPos:" + knobPos);
					
			this.setState( {knobPosition:knobPos} );
			
		
			//console.log(rect.top, rect.right, rect.bottom, rect.left);
			
			//console.log("_onMouseMove" + knobPos);
		},
	}
);

var MyApplication = React.createClass
(
	{displayName: "MyApplication",
		componentDidMount: function()
		{
			window.addEventListener('resize', 
					function(e)
					{	
						this.forceUpdate();
					}.bind(this)
				);
		},
	
		render: function() 
		{
			var layoutType = this._getLayoutType( window.innerWidth, window.innerHeight );
			
			var buttonSize = 64;
			if ( layoutType=='small' )
				buttonSize = 48;
			else if ( layoutType=='tiny' )
				buttonSize = 32;
					
			var buttonProps = {
					width:buttonSize,
					height:buttonSize,
					hoverImage:'ButtonMask.png',
					hoverImageOpacity:0.4,
					activeImage:'ButtonMask3.png',
					activeImageOpacity:0.5
				};
				
			//if ( BrowserCapabilities.isMobileDevice() )
			//	buttonProps['hoverable'] = false;
					
			return (	
					React.createElement("div", {style: {
							position:'absolute',
							left:0,
							top:0,
							right:0,
							bottom:0,
							overflow:'hidden'
						}}, 
			
						React.createElement("div", {style: {
							position:'absolute',
							left:0,
							top:0,
							right:0,
							bottom:0,
							background:'url(Background.png) no-repeat'}, 
							onClick: this.onClick}
							
							), 
			
						React.createElement("div", {style: {
							position:'absolute',
							left:0,
							top:0,
							width:'100%',
							height:'100%',
							
							display:'flex',
							flexDirection:'column',

							}}, 

							React.createElement(MyButton, React.__spread({image: "ToolAddVoxel.png"},  buttonProps, {tooltip: "Draw new voxels", onClick: this._onAddVoxel})), 
							React.createElement(MyButton, React.__spread({image: "ToolClearVoxel.png"},  buttonProps, {tooltip: "Clear/erase voxels", enabled: false})), 
							React.createElement(MyButton, React.__spread({image: "ToolPaintVoxel.png"},  buttonProps, {tooltip: "Paint on existing voxels"})), 
							React.createElement(MyButton, React.__spread({image: "ToolPaintVoxel.png"},  buttonProps, {toggleable: true, onToggled: this._onToggled, onUntoggled: this._onUntoggled})), 
							
							React.createElement(MyButton, React.__spread({image: "ToolPaintVoxel.png"},  buttonProps)), 
							React.createElement(MyButton, React.__spread({image: "ToolPaintVoxel.png"},  buttonProps)), 
							React.createElement(MyButton, React.__spread({image: "ToolPaintVoxel.png"},  buttonProps)), 
							React.createElement(MyButton, React.__spread({image: "ToolPaintVoxel.png"},  buttonProps)), 
							React.createElement(MyButton, React.__spread({image: "ToolPaintVoxel.png"},  buttonProps)), 
							React.createElement(MyButton, React.__spread({image: "ToolPaintVoxel.png"},  buttonProps)), 
							
							React.createElement(MySlider, null)
							
						)
					)
				);
		},
		
		_onAddVoxel: function(e)
		{
			console.log('clicked!');
		},
		
		_onToggled: function()
		{
			console.log('_onToggled!');
		},
		
		_onUntoggled: function()
		{
			console.log('_onUntoggled!');
		},
				
		_getLayoutType : function( width, height )
		{
			// Express the size in landscape mode, so it can be compared
			// more easily with our template sizes
			var w = width;
			var h = height;
			if ( h>w ) 
			{
				w = height;
				h = width;
			}
			
			if ( w<=512 || h<=360 )
				return 'tiny';
			else if ( w<=640 || h<=480 )
				return 'small';
			
			// We could introduce a 'huge' layout for desktop with full HD or UHD screen!
			return 'normal';
		},
		
		onClick: function()
		{
			console.log("CLICK canvas!");
		}
	}
);
