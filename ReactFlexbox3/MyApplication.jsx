'use strict';

var MyApplication = React.createClass
(
	{
		render: function() 
		{
			return (
					
					<div style={{
						overflow:'hidden',
						position:'relative',
						width:'100%',
						height:'100%',
						}}
						
						onClick={this.onClick}>
						
						<div style={{
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
							backgroundColor:'rgba(255, 0, 0, 0.2)'}}>
				 
							<img src='1.png' style={{flex:'none', height:50}}/>
							<img src='2.png' style={{flex:'none', minHeight:50, maxHeight:200}} ref='deux'/>
							<MySlider style={{flex:'none', backgroundColor:'#FF00FF'}} barWidth={300}/>
							<img src='3.png' style={{flex:'none', height:50}}/>
							<MyButton style={{flex:'none', backgroundColor:'#FF00FF', boxShadow:' 8px 8px 0px #000'}} image='ToolAddVoxel.png' width={128} height={128}/>
							<img src='1.png' style={{flex:'none', height:50}}/>
							<MyTestControl style={{flex:'auto', backgroundColor:'magenta'}}/>
							<MyTestControl style={{flex:'none', width:300, alignSelf:'flex-end', backgroundColor:'magenta'}}/>
						</div>
					</div>
				);
		},
		
		/* <MyTestControl style={{flex:'auto', backgroundColor:'#FF00FF', boxShadow:'8px 8px 0px #000'}} /> */
		
		onClick: function(e)
		{	
			var element = React.findDOMNode(this.refs.deux);
			console.log(element.width + ', ' + element.height);
		},
	}
);
