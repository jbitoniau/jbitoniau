'use strict';

var MyApplication = React.createClass
(
	{displayName: "MyApplication",
		render: function() 
		{
			return (
					
					React.createElement("div", {style: {
						overflow:'hidden',
						position:'relative',
						width:'100%',
						height:'100%',
						}, 
						
						onClick: this.onClick}, 
						
						React.createElement("div", {style: {
							overflow:'hidden',
							position:'absolute',
							top:5,
							right:5,
							bottom:5,
							left:5,
						
							display:'flex',
							justifyContent: 'space-between',
							alignItems: 'stretch',		// 'flex-start'
							flexWrap: 'wrap',
							flexDirection:'column',
							backgroundColor:'rgba(255, 0, 0, 0.2)'}}, 
				 
							React.createElement("img", {src: "1.png", style: {flex:'none', height:50}}), 
							React.createElement("img", {src: "2.png", style: {flex:'none', minHeight:50, maxHeight:200}, ref: "deux"}), 
							React.createElement(MySlider, {style: {flex:'none', backgroundColor:'#FF00FF'}, barWidth: 300}), 
							React.createElement("img", {src: "3.png", style: {flex:'none', height:50}}), 
							React.createElement(MyButton, {style: {flex:'none', backgroundColor:'#FF00FF', boxShadow:' 8px 8px 0px #000'}, image: "ToolAddVoxel.png", width: 128, height: 128}), 
							React.createElement("img", {src: "1.png", style: {flex:'none', height:50}}), 
							React.createElement(UISlider, {style: {flex:'auto', backgroundColor:'magenta'}, 
									knobHeight: 80, knobWidth: 120, min: 5, max: 15, step: 0, 
									onKnobDragMove: this.onKnobDragMove, 
									onKnobDragEnd: this.onKnobDragEnd}), 
							React.createElement(UISlider, {style: {flex:'none', alignSelf:'flex-end', backgroundColor:'magenta', width:500}, step: 1}), 
							React.createElement(UIBaseWidget, {style: {flex:'auto', backgroundColor:'magenta'}}), 

							React.createElement(UIButton, {style: {flex:'auto', backgroundColor:'magenta'}, 
								image: "ToolAddVoxel.png", hoverImage: "ButtonHover.png", activeImage: "ButtonActive.png"})
						)
					)
				);
		},
		
		onClick: function(e)
		{	
			var element = React.findDOMNode(this.refs.deux);
			console.log(element.width + ', ' + element.height);
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
