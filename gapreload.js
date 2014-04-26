/*jshint browser:true, devel:true */
/*global device */

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
  // It must return a true array so that we can use `forEach` later.
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

function getOrigin(host, port) { return 'http://' + host + ':' + port + '/'; }

function addScript(url) {
  var scriptToAdd = document.createElement('script');
  scriptToAdd.src = url;
  var script = document.getElementsByTagName('script')[0];
  script.parentNode.insertBefore(scriptToAdd, script);
}

getXML('gapreload', function (config) {
  config = mergeParams(config, { SERVER_PORT: 8000, LIVERELOAD_PORT: 35729 });
  // First loading only, and skip it directly if accessed from desktop.
  if (!/^http/.test(location)) {
    // Wait until the server runs and confirm to use GapReload.
    if (!confirm('Do you want to use GapReload?')) { return; }
    var serverOrigin = getOrigin(config.SERVER_HOST, config.SERVER_PORT);
    var contentPath = /\/www\/.+$/.exec(location)[0];
    return document.addEventListener('deviceready', function () {
      var platform = device.platform.toLowerCase();
      // Use `replace` so that it won't break the Android back button.
      location.replace(serverOrigin + platform + contentPath);
    }, false);
  }
  var liveReloadHost = config.LIVERELOAD_HOST || config.SERVER_HOST;
  var liveReloadOrigin = getOrigin(liveReloadHost, config.LIVERELOAD_PORT);
  addScript(liveReloadOrigin + 'livereload.js?snipver=1');
});
