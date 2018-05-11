"use strict";

window.addEventListener('message', function (event) {
  var data;
  try {
    data = JSON.parse(event.data);
  } catch (err) {
    return;
  }

  if (!data) {
    return;
  }

  if (data.message === 'backgroundPageMessage') {
    chrome.runtime.sendMessage(data.data, function (response) {
      console.log('got response: ', response);
      if (response.openURL) {
        window.location.href = response.openURL;
      } else if (response.reload) {
        window.location.reload();
      }
    });
  }
}, false);

if (window.location.hostname !== 'readlang.com' &&
    window.location.hostname !== 'test.readlang.com' &&
    window.location.hostname !== 'www.paypal.com') {
  // check whether to load the webreader
  chrome.runtime.sendMessage({message: 'newPageLoaded'}, function (bookmarkletOpened) {});
}

