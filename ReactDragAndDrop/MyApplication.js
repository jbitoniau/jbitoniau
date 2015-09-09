'use strict';

var MyApplication = React.createClass
(
	{displayName: "MyApplication",
		render: function() 
		{
			return (
					React.createElement("div", null, 
						React.createElement("div", null, "Hello ", this.props.name), 
						React.createElement("br", null), 
						
						React.createElement("a", {href: "http://www.w3schools.com"}, "Visit W3Schools.com!"), 
						React.createElement("br", null), 
						
						React.createElement("img", {draggable: "true", src: "star.png", width: "32", height: "32"}), 
						React.createElement("br", null), 
						
						React.createElement("img", {onDragStart: this.onDragStart, draggable: "true", src: "star.png", width: "32", height: "32"}), 
						React.createElement("br", null), 
						
						React.createElement("div", {onDragOver: this.onDragOver, onDrop: this.onDrop}, 
							React.createElement("pre", {ref: "myElement"}, 
								"Drop stuff here:", React.createElement("br", null)
							)
						)
					)
				);
				
		},
		
		onDragStart: function(e)
		{
			e.dataTransfer.setData("text", "Some custom drag data here!");
		},
		
		onDragOver: function(e)
		{
			e.preventDefault();		
			var data = e.dataTransfer.getData('text'); // Can use 'URL' to restrict to URL data
			console.log("drag-over: " + data);	
		},
		
		onDrop: function(e)
		{
			e.preventDefault();		// Prevent browser from changing page
			var data = e.dataTransfer.getData('text');
			console.log("drop: " + data);	
			var element = React.findDOMNode(this.refs.myElement);
			element.innerHTML += data + '<br/>'
		}
	}
);

