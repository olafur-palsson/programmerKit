var stats = {

  init: function() {
    this.updateDOM();
  },

  updateDOM: function() {
    var that = this;
    chrome.storage.sync.get({focusSessions: []}, function(items){
      var focusSessions = items.focusSessions;
      var totalSessions = 0;
      var totalScore = 0;
      var totalProductivity = 0;
      focusSessions.reverse();
      for(var i = 0; i < focusSessions.length; i++) {
        totalSessions++;
        totalScore += focusSessions[i].score;
        totalProductivity += focusSessions[i].rating;
        var end = new Date(focusSessions[i].end);
        var start = new Date();
        start.setTime(new Date(end).getTime() - 60000 * app.timerDuration);
        var trEl = document.createElement('tr');
        trEl.innerHTML = '<td>' + app.getDateString(start)  + '</td>';
        trEl.innerHTML += '<td>' + app.getTimeString(start) + '</td>';
        trEl.innerHTML += '<td class="stars">' + that.makeStarRating(focusSessions[i].rating)  + '</td>';
        trEl.innerHTML += '<td>' + focusSessions[i].score  + '</td>';
        document.getElementById('past-sessions-tbody').appendChild(trEl);
      }
      if(focusSessions.length == 0) {
         document.getElementById('past-sessions-tbody').innerHTML = '<tr><td colspan="4">Nothing to display at the moment...</td></tr>';
      }
      document.getElementById('current-level').innerHTML = 'Level ' + app.getLevel(totalScore);
      document.getElementById('total-score').innerHTML = totalScore;
      document.getElementById('total-sessions').innerHTML = totalSessions;
      document.getElementById('average-productivity').innerHTML = that.makeStarRating(totalSessions > 0 ? Math.round(totalProductivity / totalSessions) : 0);
    });
  },

  makeStarRating: function(stars) {
    var html = '';
    for(var i = 1; i <= 10; i++) {
      if(i > stars) {
        html += '<i class="fa fa-star-o"></i> ';
      } else {
        html += '<i class="fa fa-star"></i> ';
      }
    }
    return html;
  }

};

stats.init();