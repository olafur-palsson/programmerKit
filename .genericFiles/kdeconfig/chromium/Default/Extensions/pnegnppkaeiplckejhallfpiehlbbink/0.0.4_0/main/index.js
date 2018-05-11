var main = {

  init: function() {
    var that = this;

    document.getElementById('startFocusBtn').addEventListener('click', function() {
      app.startFocusTimer();
    });

    document.getElementById('cancelFocusBtn').addEventListener('click', function() {
      app.cancelFocusTimer();
    });

    app.addFocusTimerChangedListener(function(focusTimer) {
      that.focusTimerChanged.call(that, focusTimer);
    });

    app.getFocusTimer(function(focusTimer) {
      that.focusTimerChanged(focusTimer);
    });

    app.addLastFocusSessionChangedListener(function(lastFocusSession) {
      that.lastFocusSession = lastFocusSession;
      that.updateDOM.call(that);
    });

    app.getLastFocusSession(function(lastFocusSession) {
      that.lastFocusSession = lastFocusSession;
      that.updateDOM.call(that);
    });
  },

  focusTimer: null,

  lastFocusSession: null,

  lastFocusSessionDigest: null,

  ticker: null,

  startTicker: function() {
    var that = this;
    that.tick.call(that);
    this.ticker = setInterval(function() {
      that.tick.call(that);
    }, 200);
  },

  stopTicker: function() {
    window.clearInterval(this.ticker);
  },

  tick: function() {
    this.updateDOM();
  },

  focusTimerChanged: function(focusTimer) {
    this.focusTimer = focusTimer;
    if(focusTimer) {
      this.startTicker();
    } else {
      this.tick();
      this.stopTicker();
    }
  },

  saveSession: function() {
    var that = this;

    // Clear lastFocusSession
    chrome.storage.local.set({lastFocusSession: null});

    // Save lastFocusSessionDigest
    chrome.storage.sync.get({focusSessions: []}, function(items) {
      items.focusSessions.push(that.lastFocusSessionDigest);
      chrome.storage.sync.set({focusSessions: items.focusSessions});
    });
  },

  updateScore: function() {
    var ratings = document.getElementsByName('rating');
    var rating;
    for(var i = 0; i < ratings.length && !rating; i++) {
      if(ratings[i].checked) {
        rating = parseInt(ratings[i].value);
      }
    }
    var checkboxes = document.getElementsByName('session-info-distracting-site');
    var distractingSites = {};
    var totalTimeDistracted = 0;
    for(var i = 0; i < checkboxes.length; i++) {
      if(checkboxes[i].checked) {
        distractingSites[checkboxes[i].value] = this.lastFocusSession.data[checkboxes[i].value];
        totalTimeDistracted += this.lastFocusSession.data[checkboxes[i].value]
      }
    }
    document.getElementById('session-info-time-spent').innerHTML = app.getTimeSpentString(totalTimeDistracted);
    var distractionPoints = Math.round(200 * (totalTimeDistracted / app.timerDuration / 60));
    document.getElementById('session-info-time-spent-points').innerHTML = distractionPoints;
    var ratingPointsMap = [-50, -40, -25, -10, 0, 10, 25, 50, 100, 200];
    var ratingPoints = ratingPointsMap[rating - 1];
    if(ratingPoints < 0) {
      document.getElementById('session-info-productivity-desc').innerHTML = 'Session Productivity Penalty';
      document.getElementById('session-info-productivity-points').innerHTML = '&minus;' + Math.abs(ratingPoints);
    } else {
      document.getElementById('session-info-productivity-desc').innerHTML = 'Session Productivity Bonus';
      document.getElementById('session-info-productivity-points').innerHTML = '+' + ratingPoints;
    }
    var finalScore = 100 - distractionPoints + ratingPoints;
    document.getElementById('finalScore').innerHTML = finalScore;
    this.lastFocusSessionDigest = {
      end: this.lastFocusSession.end,
      sites: distractingSites,
      rating: rating,
      score: finalScore
    };
  },

  updateDOM: function() {
    var that = this;
    var countdownString = app.getCountdownString(this.focusTimer);
    document.getElementById('timer').innerHTML = countdownString;
    document.getElementById('sessionContent').style.display = this.lastFocusSession ? 'block' : 'none';
    document.getElementById('timerContent').style.display = this.lastFocusSession ? 'none' : 'block';

    if(this.lastFocusSession) {
      var lastFocusSessionEnd = new Date(this.lastFocusSession.end);
      var lastFocusSessionStart = new Date();
      lastFocusSessionStart.setTime(lastFocusSessionEnd.getTime() - 60000 * app.timerDuration);
      document.getElementById('session-info-start-date').innerHTML = app.getDateString(lastFocusSessionStart);
      document.getElementById('session-info-start-time').innerHTML = app.getTimeString(lastFocusSessionStart);
      document.getElementById('session-info-end-time').innerHTML = app.getTimeString(lastFocusSessionEnd);
      var sites = [];
      for(var site in this.lastFocusSession.data) {
        // Filter out sites that have too little time spent
        if(this.lastFocusSession.data[site] > 2) {
          sites.push([site, this.lastFocusSession.data[site]]);
        }
      }
      sites.sort(function(a,b) {return b[1] - a[1]});
      document.getElementById('session-info-sites-tbody').innerHTML = '';
      sites.forEach(function(site, i) {
        var trEl = document.createElement('tr');
        trEl.innerHTML = '<td>' + (parseInt(i) + 1) + '</td>';
        trEl.innerHTML += '<td>' + site[0] + '</td>';
        trEl.innerHTML += '<td>' + app.getTimeSpentString(site[1]) + '</td>';
        trEl.innerHTML += '<td class="center"><input type="checkbox" name="session-info-distracting-site" value="' + site[0] + '"></td>';
        document.getElementById('session-info-sites-tbody').appendChild(trEl);
      });
      if(sites.length == 0) {
        document.getElementById('session-info-sites-tbody').innerHTML = '<tr><td colspan="4">No sites visited!</td></tr>';
      }
      document.getElementById('session-info-distracting-site-toggle').addEventListener('click', function(e) {
        var checkboxes = document.getElementsByName('session-info-distracting-site');
        for(var i = 0; i < checkboxes.length; i++) {
          checkboxes[i].checked = e.srcElement.checked;
        }
        that.updateScore(that);
      });
      var ratings = document.getElementsByName('rating');
      for(var i = 0; i < ratings.length; i++) {
        ratings[i].addEventListener('click', function() {
          that.updateScore(that);
        });
      }
      var checkboxes = document.getElementsByName('session-info-distracting-site');
      for(var i = 0; i < checkboxes.length; i++) {
        checkboxes[i].addEventListener('click', function() {
          that.updateScore(that);
        });
      }
      document.getElementById('sessionDoneBtn').addEventListener('click', function() {
        that.saveSession.call(that);
      });
      this.updateScore();
    }

    if(this.focusTimer) {
      document.title = countdownString + ' - Focus';
      document.getElementById('startFocusBtn').style.display = 'none';
      document.getElementById('cancelFocusBtn').style.display = 'block';
    } else {
      document.title = 'Focus';
      document.getElementById('startFocusBtn').style.display = 'block';
      document.getElementById('cancelFocusBtn').style.display = 'none';
    }
  }

};

main.init();