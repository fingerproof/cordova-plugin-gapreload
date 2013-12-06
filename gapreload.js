/*jshint browser:true, devel:true */
/*global module, device */

function getXML (path, callback) {
	var request = new XMLHttpRequest();
	request.open("GET", path + ".xml", true);
	request.overrideMimeType("text/xml");
	request.onreadystatechange = function () {
		if (request.readyState === 4) { callback(request.responseXML); }
	};
	request.send(null);
}

function getParams (xml, name) {
	if (!xml) { return []; }
	var selector = "feature[name='" + name + "']>param[name][value]";
	// it must return a true array so that we can use `forEach` later
	return [].slice.call(xml.querySelectorAll(selector));
}

function mergeParams (xml, defaults) {
	// `module.id` stores `"pro.fing.cordova.gapreload.gapreload"`
	// so we want to get rid of the extra `".gapreload"`
	var params = getParams(xml, module.id.split(/\.[^.]+$/)[0]);
	var merged = {};
	params.forEach(function (param) {
		// `param.name` and `param.value` don't work
		var name = param.getAttribute("name");
		var value = param.getAttribute("value");
		// `value` has to be a replaced variable and can only be merged once
		if (merged[name] || !value || value === "$" + name) { return; }
		defaults[name] = merged[name] = value;
	});
	return defaults;
}

function getOrigin (name, port) { return "http://" + name + ":" + port + "/"; }

function addScript (url) {
	var scriptToAdd = document.createElement("script");
	scriptToAdd.src = url;
	var script = document.getElementsByTagName("script")[0];
	script.parentNode.insertBefore(scriptToAdd, script);
}

getXML("config", function (config) {
	config = mergeParams(config, { SERVER_PORT: 8000, LIVERELOAD_PORT: 35729 });
	// first loading only, and skip it directly if accessed from desktop
	if (!/^http/.test(location)) {
		// wait until the server runs and confirm to use GapReload
		if (!confirm("Do you want to use GapReload?")) { return; }
		var serverOrigin = getOrigin(config.SERVER_HOSTNAME, config.SERVER_PORT);
		// this typically equals `["/www/index.hml"]`
		var contentPath = /\/www\/.+$/.exec(location);
		return document.addEventListener("deviceready", function () {
			var platform = device.platform.toLowerCase();
			// use `replace` so that it won't break the Android back button
			location.replace(serverOrigin + platform + contentPath);
		}, false);
	}
	var livereloadHostName = config.LIVERELOAD_HOSTNAME || config.SERVER_HOSTNAME;
	var liveReloadOrigin = getOrigin(livereloadHostName, config.LIVERELOAD_PORT);
	addScript(liveReloadOrigin + "livereload.js?snipver=1");
});
