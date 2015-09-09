'use strict';

var MyApplication = React.createClass
(
	{
		render: function() 
		{
			return (
					<div>
						<div>Hello {this.props.name}</div>
						<br/>
						
						<a href="http://www.w3schools.com">Visit W3Schools.com!</a>
						<br/>
						
						<img draggable='true' src='star.png' width='32' height='32'/>
						<br/>
						
						<img onDragStart={this.onDragStart} draggable='true' src='star.png' width='32' height='32'/>
						<br/>
						
						<div onDragOver={this.onDragOver} onDrop={this.onDrop}>
							<pre ref='myElement'>
								Drop stuff here:<br/>
							</pre>
						</div>
					</div>
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

