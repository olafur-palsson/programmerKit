var app = {

  /* Timer duration in minutes */
  timerDuration: 25,

  /* Points to level mapping */
  pointsToLevel: [100, 300, 500, 750, 1000, 1500, 2000, 2500, 3000, 4000, 5000, 8000, 10000, 15000, 20000, 30000, 40000, 50000, 100000],

  /* Get level */
  getLevel: function(score) {
    for(var i = 0; i < this.pointsToLevel.length; i++) {
      if(score < this.pointsToLevel[i]) {
        return i + 1;
      }
    }
    return this.pointsToLevel.length;
  },

  /* Gets the end time of a focus session */
  getFocusTimer: function(cb) {
    chrome.storage.local.get({focusTimer: null}, function(items) {
      cb(items.focusTimer);
    });
  },

  /* Start the focus timer */
  startFocusTimer: function() {
    var end = new Date();
    end.setTime(end.getTime() + 60000 * this.timerDuration);
    chrome.storage.local.set({focusTimer: end.toString()});
    chrome.alarms.create('end', {delayInMinutes: this.timerDuration});
    chrome.alarms.create('5m', {delayInMinutes: 5});
    chrome.alarms.create('10m', {delayInMinutes: 10});
    chrome.alarms.create('15m', {delayInMinutes: 15});
    chrome.alarms.create('20m', {delayInMinutes: 20});
  },

  /* Cancel the focus timer */
  cancelFocusTimer: function() {
    chrome.storage.local.set({focusTimer: null});
    chrome.alarms.clearAll();
  },

  /* Callback fires when focus timer changes with the value as param */
  addFocusTimerChangedListener: function(cb) {
    chrome.storage.onChanged.addListener(function(changes) {
      if(changes.focusTimer) {
        cb(changes.focusTimer.newValue);
      }
    });
  },

  /* Gets the last focus session */
  getLastFocusSession: function(cb) {
    chrome.storage.local.get({lastFocusSession: null}, function(items) {
      cb(items.lastFocusSession);
    });
  },

  /* Callback fires when the last focus session changes */
  addLastFocusSessionChangedListener: function(cb) {
    chrome.storage.onChanged.addListener(function(changes) {
      if(changes.lastFocusSession) {
        cb(changes.lastFocusSession.newValue);
      }
    });
  },

  /* Fires a progress notification */
  fireProgressNotification: function(progress, message) {
    chrome.notifications.create('', {
      title: 'Focus',
      iconUrl: '/icons/icon128.png',
      type: 'progress',
      progress: progress,
      message: message
    }, function() {});
  },

  /* Open or switch active tab */
  openOrSwitchTab: function(url) {
    chrome.windows.getLastFocused({}, function(window){
      if (chrome.runtime.lastError) {
        chrome.windows.create({focused: true, url: url}, function() {});
      } else {
        chrome.windows.update(window.id, {focused: true}, function() {
          chrome.tabs.query({
            currentWindow: true,
            url: url
          }, function(tabs) {
            if(tabs.length == 0) {
              chrome.tabs.create({url: url});
            } else {
              chrome.tabs.update(tabs[0].id, {active: true});
            }
          });
        });
      }
    });
  },

  /* Pads number with leading zero if single digit */
  padWithZero: function(num) {
    if(num < 10) {
      return '0' + num;
    }
    return num;
  },

  /* Returns a countdown string from a given date */
  getCountdownString: function(date) {
    if(!date) {
      return '00:00';
    }
    if(typeof date != 'object') {
      date = new Date(date);
    }
    var diff = Math.ceil((date - new Date()) / 1000);
    if(diff < 0) {
      return '00:00';
    }
    var min = this.padWithZero(Math.floor(diff / 60));
    var sec = this.padWithZero(diff % 60);
    return min + ':' + sec;
  },

  /* Returns a time string from a given date */
  getTimeString: function(date) {
    var h = date.getHours();
    var m = date.getMinutes();
    var ampm = 'am';
    if (h > 12) {
      ampm = 'pm';
      h -= 12;
    }
    return h + ':' + this.padWithZero(m) + ' ' + ampm;
  },

  /* Returns a date string from a given date */
  getDateString: function(date) {
    var d = date.getDate();
    var m = date.getMonth();
    var y = date.getFullYear();
    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    return d + ' ' + months[m] + ' ' + y;
  },

  getTimeSpentString: function(sec) {
    if(sec < 60) {
      return sec + ' sec';
    }
    return Math.floor(sec / 60) + ' min ' + sec % 60 + ' sec';
  }

};