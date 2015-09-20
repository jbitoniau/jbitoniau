'use strict';

function Main( elementId )
{
	if ( BrowserCapabilities.isMobileDevice() )
	{
		React.initializeTouchEvents(true);
	}
	
	var element =  document.getElementById( elementId );
	React.render( <MyApplication name="John" />, element );
};
