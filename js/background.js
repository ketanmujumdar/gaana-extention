jQuery(document).ready(function(){



/*
	Add notification listner
*/
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
    createNotification(request.ico, request.title, request.message);
    var songInfo = {'ico': request.ico, 'title' : request.title, 'album': request.message};
    //save to local storage
    save(ext_name+'SongInfo', JSON.stringify(songInfo));
    sendResponse({returnMsg: value}); // optional response
  });

	chrome.commands.onCommand.addListener(function(command) {
	var tab_id = 0;

	chrome.tabs.query({'url': '*://'+ext_site_name+'/*'},function(tab){
			try {
				tab_id = tab[0].id;
				if (command == "extplayPause") {
					chrome.tabs.executeScript(tab_id, { code: "jQuery('a.playPause')[0].click();" });
				}
				if(command == "extNext") {
					chrome.tabs.executeScript(tab_id, { code: "jQuery('a.next')[0].click();" });
				}
				if(command == "extPrev") {
					chrome.tabs.executeScript(tab_id, { code: "jQuery('a.prev')[0].click();" });
				}
				if(command == "extShuffle") {
					chrome.tabs.executeScript(tab_id, {code:"jQuery('a.shuffle')[0].click();"});
				}
			}
			catch(err) {
				chrome.tabs.create({'url': ext_protocal+ext_site_name}, function(tab) {
		  			tab_id = tab.id;
		  		});
			}
		});
	});

});