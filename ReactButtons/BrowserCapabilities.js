'use strict';

/*
	BrowserCapabilities	

	A static class that returns information about the Browser support
	for certain features.
*/
function BrowserCapabilities()
{
}

// Indicate whether the browser supports/knows what a 2D canvas is
BrowserCapabilities.hasCanvas2D = function()
{
	// @author alteredq / http://alteredqualia.com/
 	// @author mr.doob / http://mrdoob.com/
	// https://github.com/mrdoob/three.js/blob/master/examples/js/Detector.js
	return !! window.CanvasRenderingContext2D;
};

// Indicate whether the browser supports/knows what a 3D canvas is
// Here's a link that can be shown to the user in case of failure: http://get.webgl.org/
BrowserCapabilities.hasWebGL = function()
{
	return !! window.WebGLRenderingContext;
};

// Indicate whether the browser 3D canvas functions correctly
// Here's a link that can be shown to the user in case of failure: http://get.webgl.org/
BrowserCapabilities.hasWorkingWebGL = function()
{
	// @author alteredq / http://alteredqualia.com/
 	// @author mr.doob / http://mrdoob.com/
	// https://github.com/mrdoob/three.js/blob/master/examples/js/Detector.js

	// http://stackoverflow.com/questions/2745432/best-way-to-detect-that-html5-canvas-is-not-supported
	// http://stackoverflow.com/questions/9899807/three-js-detect-webgl-support-and-fallback-to-regular-canvas
	try 
	{ 
		return !! BrowserCapabilities.hasWebGL() && !! document.createElement( 'canvas' ).getContext( 'experimental-webgl' ); 
	} 
	catch( e ) 
	{ 
		return false; 
	} 
};

BrowserCapabilities.hasWorker = function()
{
	// @author alteredq / http://alteredqualia.com/
 	// @author mr.doob / http://mrdoob.com/
	// https://github.com/mrdoob/three.js/blob/master/examples/js/Detector.js
	return !! window.Worker;
}

BrowserCapabilities.hasFileAPI = function()
{
	// @author alteredq / http://alteredqualia.com/
 	// @author mr.doob / http://mrdoob.com/
	// https://github.com/mrdoob/three.js/blob/master/examples/js/Detector.js
	return !! window.File && window.FileReader && window.FileList && window.Blob;
}

// Indicate whether the browser runs on a "mobile" device, typically a smartphone
// or a tablet. 
// NOTE: this is kind of a blurry line as mobile devices are now very close to 
// desktop computers (for eg in terms of resolution). Maybe we'more interested 
// knowing whether the device has a keyboard/mouse combo or a touch screen?
BrowserCapabilities.isMobileDevice = function()
{
	// http://stackoverflow.com/questions/11381673/detecting-a-mobile-browser
	// http://stackoverflow.com/questions/3514784/what-is-the-best-way-to-detect-a-mobile-device-in-jquery
	// http://detectmobilebrowsers.com/
	if ( navigator.userAgent.match(/Android/i)||
		 navigator.userAgent.match(/webOS/i)|| 
	 	 navigator.userAgent.match(/iPhone/i)||
	 	 navigator.userAgent.match(/iPad/i)||
	 	 navigator.userAgent.match(/iPod/i)||
		 navigator.userAgent.match(/BlackBerry/i)||
	  	 navigator.userAgent.match(/Windows Phone/i))
	{
		return true;
	}
	else 
	{
		return false;
	}
}

