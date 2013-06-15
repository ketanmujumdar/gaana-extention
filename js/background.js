jQuery(document).ready(function(){
	chrome.commands.onCommand.addListener(function(command) {
	var tab_id = 0;

	chrome.tabs.query({'url': '*://gaana.com/*'},function(tab){
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

		});
	});

});