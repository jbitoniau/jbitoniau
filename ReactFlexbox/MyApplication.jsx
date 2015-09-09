'use strict';

// This simple app illustrate the following problem:
// http://stackoverflow.com/questions/15381172/css-flexbox-child-height-100
// Basically an expanding flex child that wants to lay itself out (and its children) precisely 
// withing the space given to it by the flex container needs to do extra stuff that's not trivial.
// Otherwise, it might work in some browsers, but not others

var MyApplication = React.createClass
(
	{
		render: function() 
		{
			return (
					<div style={{
						position:'absolute',
						left:30,
 						top:30,
						right:30,
						bottom:30,
						overflow:'hidden',
						display:'flex',
						flexDirection:'column',
						backgroundColor:'rgba(255, 0, 0, 0.2)'}}>
			
						<div style={{flex:'none'}}>
							Some text
						</div>
						
						<div style={{flex:'auto', position:'relative'}}>
					
							<div style={{
								position:'absolute',
								left:30,
								top:30,
								right:30,
								bottom:30,
								backgroundColor:'rgba(255, 0, 0, 0.2)'}}> 
								
								Some contents here!
							
							</div>
						</div>
					
						<div style={{flex:'none'}}>Some text again</div>
						
					</div>
				);
		}
	}
);
