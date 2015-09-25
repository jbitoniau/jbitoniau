'use strict';

function Main( elementId )
{
	var element =  document.getElementById( elementId );
	if ( element )
		React.render( React.createElement(MyApplication, {name: "John"}), element );
};
