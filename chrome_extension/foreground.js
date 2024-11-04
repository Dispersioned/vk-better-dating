function injectScriptWithAccessToDOM(scriptUrl, nodeWhereToInsert) {
  var script = document.createElement('script');
  script.setAttribute('type', 'text/javascript');
  script.setAttribute('src', scriptUrl);
  nodeWhereToInsert.appendChild(script);
}

injectScriptWithAccessToDOM(chrome.runtime.getURL('/js/injected.js'), document.querySelector('body'));
