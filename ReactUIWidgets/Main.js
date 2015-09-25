'use strict';

function Main( elementId )
{
	var element =  document.getElementById( elementId );
	React.render( React.createElement(MyApplication, {name: "John"}), element );
};
