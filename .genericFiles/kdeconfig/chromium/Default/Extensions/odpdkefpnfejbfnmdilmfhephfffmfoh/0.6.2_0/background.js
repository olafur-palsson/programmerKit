"use strict";

var readlangHostname = 'readlang.com';

// TODO: do we need to be jumping through hoops to inject this into the document like a bookmarklet -
//       would be better to run in the extension's contentscript sandbox
//       (advantage of current method is that the injection method is well tested though)

var toInjectBeforeTranslatorBookmarklet = 'readlangHostname = "' + readlangHostname + '";' +
                                          'window.READLANG = {chromeExtension: true};';

// Display survey URL on uninstall
chrome.runtime.setUninstallURL('https://goo.gl/forms/JPHwCl73u96G2JoC2');

var runScript = function (name, tabId) {
  chrome.tabs.executeScript(tabId, {
    code:
      "if (document.getElementById('readlangExtension1')) {" +
      "  window.postMessage(JSON.stringify({" +
      "    message: 'toggleSettingsMenu'" +
      "  }), '*');" +
      "} else {" +
      "  readlangExtensionScriptNode = document.createElement('script');" +
      "  readlangExtensionScriptNode.innerHTML = '" + toInjectBeforeTranslatorBookmarklet.replace("'", "\\'") + "';" +
      "  readlangExtensionScriptNode.setAttribute('id', 'readlangExtension1');" +
      "  document.getElementsByTagName('body')[0].appendChild(readlangExtensionScriptNode);" +
      "  document.getElementsByTagName('body')[0].appendChild(" +
      "    document.createElement('script'))" +
      "    .setAttribute('src', window.location.protocol+'//" + readlangHostname + "/src/" + name + ".js" + "?bust='+new Date().getTime());" +
      "}"
  }, function (result) {
    chrome.tabs.executeScript(tabId, {
      code: 
        'if (window.location.hostname !== "' + readlangHostname + '") {' +
        '  var onDocumentReady = function (callback) {' +
        '    if (document.readyState === "complete") {' +
        '      callback();' +
        '    } else {' +
        '      document.onreadystatechange = function () {' +
        '        if (document.readyState === "complete") {' +
        '            callback();' +
        '        }' +
        '      };' +
        '    }' +
        '  };' +
        '  onDocumentReady(function () {' +
        '    setTimeout(function () {' +
        '      if (!document.getElementById("readlangWebReaderIFrame")) {' +
        '        var xmlhttp = new XMLHttpRequest();' +
        '        '   +
        '        xmlhttp.onreadystatechange = function () {' +
        '          if (xmlhttp.readyState == 4 && xmlhttp.status == 200) {' +
        '            console.log("sent feedback");' +
        '          }' +
        '        };' +
        '        data = JSON.stringify({url: window.location.href});' +
        '        xmlhttp.open("POST", "//' + readlangHostname + '/api/webReaderFailed", true);' +
        '        xmlhttp.setRequestHeader("Content-Type", "application/json;charset=UTF-8");' +
        '        xmlhttp.send(data);' +
        '        alert("Sorry but there\'s a problem loading the Readlang Web Reader on this website.")' +
        '      }' +
        '    }, 15000);' +
        '  });' +
        '}'
      });
  });
};

chrome.browserAction.onClicked.addListener(function () {
  runScript('translatorBookmarklet');
});

var activeTabIds = {};

var escapeRegExp = function (str) {
  return str.replace(/[\-\[\]\/\{\}\(\)\*\+\?\.\\\^\$\|]/g, "\\$&");
};

var dictionaryWindow;

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
  switch (request.message) {
    case 'newPageLoaded':
      if (activeTabIds[sender.tab.id]) {
        runScript('translatorBookmarklet', sender.tab.id);
        sendResponse(true);
      } else {
        sendResponse(false);
      }
      break;
    case 'webReaderLoaded':
      if (request.readlangHostname === readlangHostname) {
        activeTabIds[sender.tab.id] = true;
        sendResponse(true);
      }
      break;
    case 'closeWebReader':
      delete activeTabIds[sender.tab.id];
      sendResponse({reload: true});
      break;
    case 'openDictionary':
      updateDictionaryWindow(request.url, function (updated) {
        if (!updated) {
          openDictionaryWindow(request.url);
        }
      });
      break;
    case 'updateDictionary':
      updateDictionaryWindow(request.url);
      break;
    case 'closeDictionary':
      closeDictionaryWindow();
      break;
    default:
      console.error('background page message not recognised');
      break;
  }
});

var openDictionaryWindow = function (url) {
  chrome.windows.getCurrent(function (currentWindow) {
    var windowWidth = 425;
    var spaceOnLeft = currentWindow.left;
    var spaceOnRight = window.screen.width - (currentWindow.left + currentWindow.width);
    var left,
      spaceNeeded;

    if (spaceOnRight > spaceOnLeft) {
      left = Math.min(currentWindow.left + currentWindow.width, window.screen.width - windowWidth);
      spaceNeeded = windowWidth - spaceOnRight;
      if (spaceNeeded > 0) {
        chrome.windows.update(currentWindow.id, {
          width: currentWindow.width - spaceNeeded
        });
      }
    } else {
      left = Math.max(currentWindow.left - windowWidth, 0);
      spaceNeeded = windowWidth - spaceOnLeft;
      if (spaceNeeded > 0) {
        chrome.windows.update(currentWindow.id, {
          width: currentWindow.width - spaceNeeded,
          left: currentWindow.left + spaceNeeded
        });
      }
    }

    chrome.windows.create({
      url: url,
      top: currentWindow.top,
      left: left,
      width: windowWidth,
      height: currentWindow.height,
      type: 'popup'
    }, function (newWindow) {
      dictionaryWindow = newWindow;
      console.log('word reference window: ', dictionaryWindow);
    });
  });
};

var updateDictionaryWindow = function (url, callback) {
  callback = callback || function () {};

  if (dictionaryWindow && dictionaryWindow.tabs && dictionaryWindow.tabs[0]) {
    chrome.tabs.get(dictionaryWindow.tabs[0].id, function (tab) {
      if (tab) {
        chrome.tabs.update(dictionaryWindow.tabs[0].id, {url: url});
        callback(true);
      } else {
        callback(false);
      }
    });
  } else {
    callback(false);
  }
};

var closeDictionaryWindow = function () {
  if (dictionaryWindow) {
    chrome.windows.remove(dictionaryWindow.id);
  }
};

chrome.contextMenus.create({
  title: 'Import to Readlang',
  contexts: ['all'],
  onclick: function () {
    runScript('importerBookmarklet');
  }
});

