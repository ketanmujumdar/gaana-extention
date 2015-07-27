jQuery(document).ready(function(){



/*
	Add notification listner
*/
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
  	console.log(request.notify);
  	if(request.notify == 'notification') {

  		var songInfo = {'ico': request.ico, 'title' : request.title, 'album': request.message};
  		isEnabled = get("notification");
  		save(ext_name+'SongInfo', JSON.stringify(songInfo));
  		if(isEnabled == 1 || isEnabled == "1") {
  			createNotification(request.ico, request.title, request.message);	
  		}
  	}


  	if(request.init = 'init') {
  		//checks if its in radio or not
  		var isRadio = {'radio': 'true'};
  		chrome.tabs.query({'url': '*://'+ext_radio+'/*'},function(tab){
  			save(ext_name+'isRadio', JSON.stringify(isRadio));
  			sendResponse({radioAct: 'true'});
  			return;
  		});
  		isRadio = {'radio': 'false'};
  		save(save(ext_name+'isRadio', JSON.stringify(isRadio)));
  	}

  });


	/*
		Event listner for keypress or any command specified in manifest.json
	
	*/
	chrome.commands.onCommand.addListener(function(command) {
	var tab_id = 0;

	chrome.tabs.query({'url': '*://'+ext_site_name+'*'},function(tab){
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
				console.log("No "+ ext_site_name + " site found in the open tabs");
			}
		});
	});


	function isSimillar(songObj) {

		var dbSongObj = JSON.parse(get(ext_name+'SongInfo'));

		if(dbSongObj =='undefined' || dbSongObj == undefined || dbSongObj == '') {
			return false;
		}
		else if(songObj.ico == dbSongObj.ico && songObj.title == dbSongObj.title && songObj.album == dbSongObj.album) {
			return true;
		}
		else {
			return false;
		}
	}

});