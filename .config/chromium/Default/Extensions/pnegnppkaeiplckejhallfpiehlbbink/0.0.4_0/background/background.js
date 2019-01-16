var background = {

  /* Initialize background script */
  init: function() {
    app.cancelFocusTimer();
    this.initBrowserAction();
    this.initProgressNotifications();
    this.initCapture();
    this.initEndAlarm();
  },
  
  /* Initialize browser action listener */
  initBrowserAction: function() {
    chrome.browserAction.onClicked.addListener(function(activeTab) {
      app.openOrSwitchTab(chrome.extension.getURL('/main/index.html'));
    });
  },

  /* Initialize progress notifications listener */
  initProgressNotifications: function() {
    chrome.alarms.onAlarm.addListener(function(alarm) {
      if(alarm.name == '5m') {
        app.fireProgressNotification(20, '5 minutes has passed!');
      }
      if(alarm.name == '10m') {
        app.fireProgressNotification(40, '10 minutes has passed!');
      }
      if(alarm.name == '15m') {
        app.fireProgressNotification(60, '10 minutes remaining!');
      }
      if(alarm.name == '20m') {
        app.fireProgressNotification(80, '5 minutes remaining!');
      }
    });
  },

  /* Initialize end alarm listener */
  initEndAlarm: function() {
    var that = this;
    chrome.alarms.onAlarm.addListener(function(alarm) {
      if(alarm.name == 'end') {
        // Capture data one last time
        that.captureUpdate.call(that, function() {
          // Stop capturing data
          that.endCapture();

          // Stop focus timer
          app.cancelFocusTimer();

          // Save focus session details
          chrome.storage.local.get({focusData:{}}, function(items){
            var focusSession = {
              end: new Date().toString(),
              data: items.focusData
            };
            chrome.storage.local.set({lastFocusSession: focusSession});
            app.openOrSwitchTab(chrome.extension.getURL('/main/index.html'));
          });
        });
      }
    });
  },

  /* Initialize capture */
  initCapture: function() {
    var that = this;
    app.addFocusTimerChangedListener(function(focusTimer) {
      if(focusTimer) {
        that.beginCapture.call(that);
      } else {
        that.endCapture.call(that);
      }
    });
  },

  /* Capture callback function */
  captureCallback: null,

  /* Property to store previous captured data */
  lastCaptureData: null,

  /* Starts capturing site visit data */
  beginCapture: function() {
    var that = this;
    this.captureCallback = function() {
      that.captureUpdate.call(that, function(){});
    };

    this.lastCaptureData = null;
    chrome.storage.local.set({focusData: {}});
    chrome.tabs.onUpdated.addListener(this.captureCallback);
    chrome.tabs.onActivated.addListener(this.captureCallback);
    chrome.windows.onFocusChanged.addListener(this.captureCallback);
    chrome.tabs.onRemoved.addListener(this.captureCallback);
  },

  /* Stops capturing site visit data */
  endCapture: function() {
    chrome.tabs.onUpdated.removeListener(this.captureCallback);
    chrome.tabs.onActivated.removeListener(this.captureCallback);
    chrome.windows.onFocusChanged.removeListener(this.captureCallback);
    chrome.tabs.onRemoved.removeListener(this.captureCallback);
  },

  /* Method to update site visit data */
  captureUpdate: function(cb) {
    var that = this;
    var lastCaptureData = this.lastCaptureData;
    if(lastCaptureData) {
      var timeDiff = Math.floor((new Date() - lastCaptureData.time) / 1000);
      if(timeDiff > 0) {
        chrome.storage.local.get({focusData: {}}, function(items) {
          var focusData = items.focusData;
          if(!focusData[lastCaptureData.host]) {
            focusData[lastCaptureData.host] = 0;
          }
          focusData[lastCaptureData.host] += timeDiff;
          chrome.storage.local.set({focusData: focusData}, function() {
            if(cb) {
              cb.call(that);
            }
          });
        });
      } else {
        cb();
      }
    } else {
      cb();
    }

    chrome.tabs.query({active: true}, function(tabs) {
      tabs.forEach(function(tab) {
        chrome.windows.get(tab.windowId, function(window) {
          if(window.focused) {
            // Tab is active and window is focused
            var parser = document.createElement('a');
            parser.href = tab.url;
            var host = parser.hostname.replace(/^www./,''); // strip www from front of hostname
            // Ignore sites without a FQDN
            if(/.+\..+/.test(host)) {
              that.lastCaptureData = {
                time: new Date(),
                host: host
              };
            } else {
              that.lastCaptureData = null;
            }
          }
        });
      });
    });
  }

};

background.init();