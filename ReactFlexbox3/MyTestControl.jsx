'use strict';

var MyTestControl = React.createClass
(
	{
		propTypes: 
		{
		},

		getDefaultProps: function()
		{
			return { 
				};
		},

		getInitialState: function()
		{
			return { 
				};
		},
		/*, width:'inherit', height:'inherit'*/
	
		render: function() 
		{
			console.log( JSON.stringify(this.state) );

			var mainDivStyle = Object.assign( {minHeight:40, minWidth:100}, this.props.style);
			mainDivStyle = Object.assign( mainDivStyle, 
							{	position:'relative',
								display:'flex',
								flexDirection:'column',
								justifyContent:'center',
								alignItems:'stretch'} );

								
			var barHeight = 15;
			var knobHeight = 50;
			var knobWidth = 50;
			var knobPos = 0.80;
			var knobPercentage = (knobPos * 100).toString() + "%";
			return ( 
						
					<div style={mainDivStyle}> 
					
						<div style={{flex:'none', height:barHeight}}>
									
								<div style={{position:'relative', width:'100%', height:'100%', border:'1px solid yellow'}}>
								
									<div style={{position:'absolute', 
											left:knobWidth/2,
											right:knobWidth/2,
											top:0,
											bottom:0,
											border:'1px solid orange'}}>
									
										<div style={{position:'relative', width:'100%', height:'100%'}}>
								
											<div style={{position:'absolute', 
												top: barHeight/2,
												left:knobPercentage,
												width:0,
												height:0,
												border:'1px solid pink'}}>
											
												<div style={{position:'relative', top:-knobHeight/2, left:-knobWidth/2, width:knobWidth, height:knobHeight,
													border:'1px solid red'}}>
													
												</div>
											
											</div>
											
										</div>
									
									</div>
									
			
									
								</div>
									
						</div>
									

					</div>
				);
		},
	}
);

/*
		return (
						
					<div style={mainDivStyle}>
					
						<div style={{position:'absolute', 
									top:'50%',
									left:0,
									height:40,
									width:'100%',
									backgroundColor:'blue'}}>
									
								<div style={{position:'relative', width:'100%', height:'100%'}}>
								
									<div style={{position:'absolute', 
										top:10,
										left:'33%',
										bottom:10,
										right:10,
										width:40,
										height:40,
										backgroundColor:'pink'}}>
									
									</div>
								</div>
									
						</div>
									

					</div>
				);
*/


/*
	<div style={mainDivStyle}> 
					
						<div style={{flex:'none', height:barHeight,
									backgroundColor:'black'}}>
									
								<div style={{position:'relative', width:'100%', height:'100%', border:'1px solid yellow'}}>
								

									<div style={{position:'absolute', 
										top: barHeight/2,
										left:knobPercentage,
										width:0,
										height:0,
										border:'1px solid pink'}}>
									
										<div style={{position:'relative', top:-knobHeight/2, left:-knobWidth/2, width:knobWidth, height:knobHeight,
											border:'1px solid red'}}>
											
										</div>
									
									</div>
								</div>
									
						</div>
									

					</div>
*/


