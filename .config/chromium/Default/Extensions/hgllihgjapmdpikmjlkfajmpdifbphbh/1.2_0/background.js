/**
 * Global variable containing the tab details to get moz rank 
 */

var selectedId = -1;
var selectedUrl=undefined;
var newTabId=undefined;
 moz_cache ='' ,
moz_cache_next =-1;
if(!moz_cache)
  moz_cache = new Array(20);

var toolBarBrowser = { 
  moz_rank: function () {
	  var service_url = 'https://moz.com/users/level?src=mozbar';
		var host = selectedUrl;
		host = encodeURIComponent(host);
		var popularity = -1;        
        
		if(selectedUrl.match('^about:') || selectedUrl.match('^chrome:') || selectedUrl == '')  {
			chrome.browserAction.setBadgeText({"text": ''});		
			return;
		}
		var last_use= -1;              
		
		for(var i=0; i<20 && popularity < 0; i++) {	
		  if(moz_cache[i] == null && last_use == -1) {
		    last_use =  i;
		  }
		  if(moz_cache[i] && moz_cache[i][0] && moz_cache[i][0] == host) {
		    popularity = moz_cache[i][1];
		  }
		}
		if(popularity < 0) {		   
            var req = new XMLHttpRequest();
			//request xml content
            req.onreadystatechange = function () {               
				if (req.readyState == 4 && req.status == 200) {                 
						var rt=JSON.parse(req.responseText);
						var popularity = 'NA';
						if(rt==null)
						{
							
						}else{
							var ajaxURL = 'http://lsapi.seomoz.com/linkscape/url-metrics/' + host + '?Cols=16384&Expires=' + rt.expires + '&AccessID=' + rt.access_id + '&Signature=' + rt.signature;
							
							var temp_mozrankxmlhttp= new XMLHttpRequest();
							temp_mozrankxmlhttp.open("GET", ajaxURL , true);
							temp_mozrankxmlhttp.send(null);
							temp_mozrankxmlhttp.onreadystatechange=function(){
							if ( temp_mozrankxmlhttp.readyState==4 && temp_mozrankxmlhttp.status == 200){
								var mozrank_json = JSON.parse(temp_mozrankxmlhttp.responseText);
								if(mozrank_json.hasOwnProperty('umrp')){
									mozrank = mozrank_json.umrp;
									var intValue = parseInt(mozrank);
									if (intValue == Number.NaN)
									{
										mozrank='NA';
									}
									if (intValue <= 0)
									{
										mozrank='NA';
									}
								}
								else{
									mozrank='NA';
								}
								
								toolBarBrowser.update_moz_rank(mozrank);
								if(!moz_cache[last_use])
								moz_cache[last_use]=new Array(2);
								moz_cache[last_use][0]=host;
							    moz_cache[last_use][1]=mozrank;
							    if(last_use >= 19)
									moz_cache[0] = null;
							    else
									moz_cache[last_use+1] = null;
								
							}  
						}
					}
				}
			};
			req.open("GET", service_url + host + '/', true);
			req.send(null);
			request = new XMLHttpRequest();
      		service_url2 = 'http://rank.trellian.com/add.txt?sid='+toolBarBrowser.toolbarbrowserGetCharPref('registrationid')+'&url=';
      		request.open("GET",service_url2+selectedUrl , true);
      		request.send(null);
			
			
	      }	else {
			toolBarBrowser.update_moz_rank(popularity);		
		}
	},
	update_moz_rank: function (popularity) {
		
		if (popularity != "NA") {
			popularity = parseFloat(popularity).toPrecision(3)
		  chrome.browserAction.setBadgeText({"text": popularity, tabId: selectedId});
		} else {
		  chrome.browserAction.setBadgeText({"text": popularity, tabId: selectedId});
		}
                  
		chrome.browserAction.setTitle({title:"Moz Rank: " + popularity, tabId: selectedId});

	},
    getHost: function (url) { 
		var host = url.replace(/^https{0,1}:\/\//,'');
		host = host.replace(/^www\./,'');
		host = host.replace(/\/.*/,'');
		return host;    
	},
	toolbarbrowserGetCharPref: function (name) {
		try{
			return null;
		}
		catch(e) {
			this.ErrorMessage(e);
		}
	},
	ErrorMessage: function (message) {
		try {
			// Do something here
		}catch(e) {
		}
	},
};


chrome.tabs.onSelectionChanged.addListener(function(tabId, props) {  
	
  chrome.tabs.getSelected(null, function(tab){	  
  
    selectedId = tabId;
	selectedUrl = tab.url;
    chrome.browserAction.setBadgeText({"text": '', tabId: selectedId});
    chrome.browserAction.setTitle({title:"Moz Rank", tabId: selectedId});
    
    toolBarBrowser.moz_rank();
	});  
});


chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
	selectedId = tabs[0].id;
	selectedUrl = tabs[0].url;
	toolBarBrowser.moz_rank();  
});

chrome.tabs.onUpdated.addListener(function(tabId, props) {  
    chrome.tabs.getSelected(null, function(tab){    
		selectedId = tabId;
		selectedUrl = tab.url;
		if (props.status == "complete" && tabId == selectedId)
			toolBarBrowser.moz_rank();
	});
});

chrome.browserAction.onClicked.addListener(function(tab) {  
	var moz_url = 'https://moz.com/researchtools/ose/links?site='+toolBarBrowser.getHost(tab.url);
	chrome.tabs.create({ url: moz_url });  
});
