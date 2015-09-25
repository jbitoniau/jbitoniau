
/*
	UIDebuggable

	A mixin that facilitates the debugging/logging of React components.
	The component can activate logging by calling _setDebugActive(true).
	Then it can use the _log() method to output messages.

	The message are automatically slightly decorated (prefixed with 
	the component name) and output in the console and inside 
	a DOM element id'ed "UIDebuggableOutputElement" if it exists.
	This is especially useful on mobile when device inspection is not
	available (for eg when a mouse is plugged in the USB port).

	Here is a snipped of HTML code to output in the DOM element:

	<div style="position:fixed; top:0; left:0;">
		<input type='button' value='clear' onClick='document.getElementById("UIDebuggableOutputElement").innerHTML=""'/>
		<pre id='UIDebuggableOutputElement'></pre>
	</div>
*/
var UIDebuggable =
{
	componentWillMount: function() 
	{
		this.debugActive = false;
	},

	_setDebugActive : function( active )
	{
		this.debugActive = active;
	},

	_log: function( message )
	{
		if ( !this.debugActive )
			return;

		var fullMessage = this.constructor.displayName + ': ' + message;
		console.log( fullMessage )

		var element = document.getElementById('UIDebuggableOutputElement');
		if ( element )
			element.innerHTML += fullMessage + '\n';
	}
};

