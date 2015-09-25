'use strict';

function Main( elementId )
{
	var element =  document.getElementById( elementId );
	if ( element )
		React.render( <MyApplication name="John" />, element );
};
