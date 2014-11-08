/*jshint browser:true, devel:true */
/*global cordova */

function getXML(path, callback) {
  var request = new XMLHttpRequest();
  request.open('GET', path + '.xml');
  request.overrideMimeType('text/xml');
  request.onreadystatechange = function () {
    if (request.readyState === 4) { callback(request.responseXML); }
  };
  request.send();
}

function getParams(xml) {
  // Must return a true array so that we can call `forEach` later.
  return xml ? [].slice.call(xml.querySelectorAll('param[name][value]')) : [];
}

function mergeParams(xml, defaults) {
  var merged = {};
  getParams(xml).forEach(function (param) {
    // `param.name` and `param.value` don't work.
    var name = param.getAttribute('name');
    var value = param.getAttribute('value');
    // `value` has to be a replaced variable and can only be merged once.
    if (merged[name] || !value || value === '$' + name) { return; }
    defaults[name] = merged[name] = value;
  });
  return defaults;
}

function getOrigin(host, port) {
  return 'http://' + (host || location.hostname) + ':' + port + '/';
}

function addScript(url) {
  var scriptToAdd = document.createElement('script');
  scriptToAdd.src = url;
  var script = document.getElementsByTagName('script')[0];
  script.parentNode.insertBefore(scriptToAdd, script);
}

getXML('gapreload', function (config) {
  config = mergeParams(config, { SERVER_PORT: 8000, LIVERELOAD_PORT: 35729 });
  // First loading only, skip it directly if accessed from desktop.
  if (!/^http/.test(location)) {
    var serverOrigin = getOrigin(config.SERVER_HOST, config.SERVER_PORT);
    serverOrigin = prompt('Do you want to use GapReload?', serverOrigin);
    // Wait until the server is running and confirm to use GapReload.
    if (!serverOrigin) { return; }
    var contentPath = /\/www\/.+$/.exec(location)[0];
    // Use `replace` so that it doesn't break the Android back button.
    location.replace(serverOrigin + cordova.platformId + contentPath);
  }
  var liveReloadHost = config.LIVERELOAD_HOST || config.SERVER_HOST;
  var liveReloadOrigin = getOrigin(liveReloadHost, config.LIVERELOAD_PORT);
  addScript(liveReloadOrigin + 'livereload.js?snipver=1');
});
