/*
 * Subtitles For Youtube
 *
 * Created by Yash Agarwal
 * Copyright (c) 2014 Yash Agarwal. All rights reserved.
 *
 */

var log = console.log;
console.log = function(msg) {
  log("%c " + msg, 'background: #222; color: #bada55');
};

var subBubblesVideo;
  /* Store display status for subs */
var areSubtitlesShowing = true;
/* Store sub delay in seconds. could be negative or positive */
var subtitlesSync = 0.0;
/* Timer for display sub-info span */
var subInfoDisplayTimer;
/* Font size of subtitles in px */
var subtitlesSize = "";
/* Help message for subtitles */
var shortcutsMessage =  "Subtitles Shortcuts\\n\\n" +
                        "V : Show/Hide \\n" +
                        "G : -50ms delay \\n" +
                        "H : +50ms delay \\n" +
                        "Q : decrease font size \\n" +
                        "W : increase font size";

var autoLoad = false;
var subLanguage = "";
var tag = "";
var originalTag = "";
var originalUrl = "";
var firstLoad = true;

initDataFromLocalStorage();
/* Function used to initliaze extension */
function initExtension() {

  if (firstLoad) {
    firstLoad = false;
    console.log("First load true, showing onboarding");
    $(document.body).append("<div id='onboarding-modal-con'><div>");
    $("#onboarding-modal-con").load(chrome.extension.getURL("onboarding.html"));
    // $('#onboarding-modal #header-img').attr('src', '"' + chrome.extension.getURL('onboarding-header.png') + '"');
  }

  if ($("video").length === 0) {
    console.log("Flash video found. Return");
    $("#sub-message").html("This youtube video runs on Adobe Flash." + "Adding subtitles is not supported for it yet.");
    $("#sub-message").fadeOut(3000);
    $("#sub-open-search-btn").css("display", "none");
  } else {
    $("#srt-upload-name").html("Click or drag & drop subtitle file here");

    if ($("#sub-video").length) {
      // console.log("Found existing #sub-video");
    } else {
      $('video').attr('id', 'sub-video');
      $("#sub-video").after("<span id='sub-info'></span>");
    }

    if ($("#subtitle-button").length) {
      // console.log("Found existing #subtitle-button");
    } else {
      $('#info').find('#top-level-buttons').append('<div id="subtitle-button" class="subtitleButton" type="button" onclick=";return false;" data-button-toggle="true"><span class="subtitleButtonImg"><img src="'+ chrome.extension.getURL("images/subtitles_icon.svg")+'" width="18px"></span><span class="subtitleButtonText">Subtitles</span></div>');

      // On click subtitle icon
      $("#subtitle-button").click(function() {
        console.log("#subtitle-button clicked");
        $('#subtitle-button').addClass('clicked');
        // $('#watch-action-panels').css("display", "none");
        $('#new-subtitles-con').css("display", "block");
        $("#search-sub-button").click();
      });
    }

    if ($("#new-subtitles-con").length) {
      // console.log("Found existing #new-subtitles-con");
    } else {
      $('#primary-inner').find('> #meta').prepend("<div id='new-subtitles-con' style='display:none; position: relative;' class='style-scope ytd-watch'><div>");
    }

    if ($("#action-panel-subtitle").length) {
      // console.log("Found existing #action-panel-subtitle");
    } else {
      $("#new-subtitles-con").load(chrome.extension.getURL("subtitles-tab.html"), function() {
        console.log("Loaded #action-panel-subtitle , registering events");
        registerEvents();

        $(".subtitles").css("font-size", subtitlesSize + "px");
        $("#subtitles-auto-load").prop('checked', autoLoad);
        $("#sub-language").val(subLanguage);
      });
    }
  }
}

var pageHref;
var initExtensionInProcess = false;

setInterval(function() {
  if (window.location.href.indexOf("watch") > -1) {
    pageHref = window.location.href;
    if (!initExtensionInProcess) {
      initExtensionInProcess = true;
      setTimeout(function() {
        // if (!autoLoad) {
        //   $('.subtitles').css("display", "none");
        // }
        initExtension();
        initExtensionInProcess = false;
      }, 1000);
    }
  } else {
    // console.log("Not a YouTube video page");
  }
}, 1000);

setInterval(function() {
  var newTag = $('.ytp-title-link.yt-uix-sessionlink').text().trim().split('.').join(' ');
  var newUrl = $('.ytp-title-link.yt-uix-sessionlink').attr("href");
  // console.log("Found tag: " + newTag)
  if (newTag && newUrl && $("#subtitle-button").length && $("#action-panel-subtitle").length) {
    if (newUrl != originalUrl) {
      console.log("Playing a new video with url: " + newUrl + " and tag: " + newTag);
      originalTag = newTag;
      originalUrl = newUrl;
      tag = newTag;
      if (autoLoad) {
        $('.subtitles').css("display", "block");
        $("#subtitle-button").click();
        $("#subtitle-button").addClass("clicked");
      }
    }
  }
}, 1000);
