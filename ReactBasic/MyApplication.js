'use strict';

var MyApplication = React.createClass
(
	{displayName: "MyApplication",
		render: function() 
		{
			return React.createElement("div", null, "Hello ", this.props.name);
		}
	}
);
