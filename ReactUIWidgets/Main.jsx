'use strict';

function Main( elementId )
{
	var element =  document.getElementById( elementId );
	React.render( <MyApplication name="John" />, element );
};
