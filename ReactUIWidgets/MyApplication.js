'use strict';

var MyApplication = React.createClass
(
	{displayName: "MyApplication",
		render: function() 
		{
			return (
					React.createElement("div", {style: {
						overflow:'hidden',
						position:'absolute',
						top:5,
						right:5,
						bottom:5,
						left:5,
					
						display:'flex',
						justifyContent: 'flex-start',
						alignItems: 'stretch',		// 'flex-start'
						flexWrap: 'wrap',
						flexDirection:'column',
						backgroundColor:'rgba(255, 0, 0, 0.2)'}}, 
			 

						React.createElement(UIButton, {style: {flex:'none', backgroundColor:'magenta', width:64, height:64}, 
							title: "TEST2", 
							image: "ToolAddVoxel.png", 
							hoverImage: "ButtonHover.png", 
							activeImage: "ButtonActive.png", 
							enabled: true, 
							toggleable: true, 

							onPressed: this._onButtonPressed, 
							onReleased: this._onButtonReleased, 
							onClick: this._onButtonClick, 
							onToggled: this._onButtonToggled}), 

						React.createElement(UISlider, {style: {flex:'none', backgroundColor:'magenta'}, 
							knobHeight: 64, knobWidth: 64, min: 5, max: 15, step: 0, 
							onKnobDragMove: this.onKnobDragMove, 
							onKnobDragEnd: this.onKnobDragEnd})
					)
				);
		},

	/*
		<UIButton style={{flex:'auto', alignSelf:'flex-start', backgroundColor:'magenta', width:'100%'}}
								image='ToolAddVoxel.png' 
								hoverImage='ButtonHover.png' 
								activeImage='ButtonActive.png'/>

					<img src='1.png' style={{flex:'auto', alignSelf:'flex-end'}}/>
							<img src='2.png' style={{flex:'none', minHeight:50, maxHeight:200}} ref='deux'/>
							<MySlider style={{flex:'none', backgroundColor:'#FF00FF'}} barWidth={300}/>
							<img src='3.png' style={{flex:'none', height:50}}/>
							<MyButton style={{flex:'none', backgroundColor:'#FF00FF', boxShadow:' 8px 8px 0px #000'}} image='ToolAddVoxel.png' width={128} height={128}/>
							<img src='1.png' style={{flex:'none', height:50}}/>
						
							<UISlider style={{flex:'none', alignSelf:'flex-end', backgroundColor:'magenta', width:500}} step={1} />
							<UIBaseWidget style={{flex:'auto', backgroundColor:'magenta'}}/>

	*/

		_onButtonPressed:function(e)
		{
			console.log('_onButtonPressed');
		},

		_onButtonReleased:function(e)
		{
			console.log('_onButtonReleased');
		},

		_onButtonClick:function(e)
		{
			console.log('_onButtonClick');
		},

		_onButtonToggled:function(e)
		{
			console.log('_onButtonToggled ' +  e);
		},


		onKnobDragMove: function(e)
		{
			console.log("onKnobDragMove:" + e );
		},

		onKnobDragEnd: function(e)
		{
			console.log("onKnobDragEnd:" + e );
		},
	}
);
