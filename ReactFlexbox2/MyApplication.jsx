'use strict';
/*
var NestedHorizontalContainer = React.createClass
(
	{
		render: function() 
		{
			return (
						<div style={{flex:'auto', position:'relative'}}>
					
							<div style={{
								position:'absolute',
								left:30,
								top:30,
								right:30,
								bottom:30,
								
								overflow:'hidden',
								display:'flex',
								flexDirection:'row',
								backgroundColor:'rgba(0, 255, 0, 0.2)'}}> 
								
								<img style={{flex:'none', width:64, height:64}} src='1.png'/>
								<img style={{flex:'auto', width:64, height:64}} src='2.png'/>
								<img style={{flex:'none', width:64, height:64}} src='3.png'/>
																
							</div>
						</div>
					);
		}
	}
);

var MainVerticalContainer = React.createClass
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
						
						overflow:'hidden',
						display:'flex',
						flexDirection:'column',
						backgroundColor:'rgba(255, 0, 0, 0.2)'}}>
			
						<div style={{flex:'none'}}>
							Some text
						</div>
						
						<NestedHorizontalContainer/>
					
						<div style={{flex:'none'}}>Some text again</div>
						
					</div>
				);
		}
	}
);*/



var NestedHorizontalContainer = React.createClass
(
	{
		render: function() 
		{
			return (
						<div style={{
							overflow:'hidden',
							display:'flex',
							flexDirection:'row',
							backgroundColor:'rgba(255, 0, 0, 0.2)'}}>
								
							<img style={{flex:'none', width:150, height:150}} src='1.png'/>
							<img style={{flex:'auto', width:150, height:150}} src='2.png'/>
							<img style={{flex:'none', width:150, height:150}} src='3.png'/>
																
						</div>
					);
		}
	}
);

var NestedVerticalContainer = React.createClass
(
	{
		render: function() 
		{
			return (
						<div style={{
							overflow:'hidden',
							display:'flex',
							flexDirection:'column',
							backgroundColor:'rgba(255, 0, 0, 0.2)'}}>
								
							<img style={{flex:'none'}} src='1.png'/>
							<img style={{flex:'auto'}} src='2.png'/>
							<img style={{flex:'none'}} src='3.png'/>
																
						</div>
					);
		}
	}
);

var MainVerticalContainer = React.createClass
(
	{
		render: function() 
		{
			return (
					<div style={{
						height:'100%',
						overflow:'hidden',
						display:'flex',
						flexWrap: 'wrap',
						flexDirection:'column',
						justifyContent:'center ',
						backgroundColor:'rgba(255, 0, 0, 0.2)'}}>
			
						<div style={{flex:'none', height:50}}>
							Some text
						</div>
						
						<div style={{flex:'none', height:50}}>
							Some text
						</div>
						
						<NestedHorizontalContainer/>
												
						<div style={{flex:'auto', height:50}}>
							Some text
						</div>
						
						<NestedVerticalContainer/>
						
						
						<div style={{flex:'none', height:50}}>
							Some text
						</div>
						
					</div>
				);
		}
	}
);

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
						bottom:30,
						overflow:'hidden',
						}}>
			
						<MainVerticalContainer/>
					</div>
				);
		}
	}
);
