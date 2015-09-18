'use strict';

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
							
							"Get this page running on a Chrome Mobile tablet" + ' ' +
							"Touch buttons, everything work fine" + ' ' +
							"Plug in a mouse and click on the first button" + ' ' +
							"BAM: another button get a enter/leave event!", 
					
							React.createElement(MyBasicButton, {a: 100, col: '#FF0000'}), 
							React.createElement(MyBasicButton, {a: 300, col: '#00FF00'}), 
							React.createElement(MyBasicButton, {a: 500, col: '#0000FF'})

						)
					)
				);
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
