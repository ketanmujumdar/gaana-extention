// Copyright (c) 2012 The Chromium Authors. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.


// function click(e) {
//   chrome.tabs.executeScript(null,
//       {code:"document.body.style.backgroundColor='" + e.target.id + "'"});
//   window.close();
// }

// document.addEventListener('DOMContentLoaded', function () {
//   var divs = document.querySelectorAll('div');
//   for (var i = 0; i < divs.length; i++) {
//     divs[i].addEventListener('click', click);
//   }
// });



jQuery(document).ready(function(){

var tab_id = 0;

	chrome.tabs.query({'url': '*://gaana.com/*'},function(tab){
		try
		{
			tab_id = tab[0].id;
		}
		catch(err) {
			chrome.tabs.create({'url': "http://gaana.com"}, function(tab) {
		  		tab_id = tab.id;
		  });
		}
    });


		jQuery('.extPlayPause').click(function(){
		chrome.tabs.executeScript(tab_id, { file: "js/jquery.js" }, function() {
			
			//chrome.tabs.getSelected(null, function(tabs){jQuery('.crap').html(tabs.id);});
    		//chrome.tabs.executeScript(null, { file: "js/play.js" });
			chrome.tabs.executeScript(tab_id, {code:"jQuery('a.playPause')[0].click();"});
    		
		});
			// jQuery('.extPlayPause i').removeClass('icon-play');
			// jQuery('.extPlayPause i').addClass('icon-pause');
		});

		jQuery('.extPrev').click(function(){
			chrome.tabs.executeScript(tab_id, { file: "js/jquery.js" }, function() {
	    		//chrome.tabs.executeScript(null, { file: "js/play.js" });
	    		chrome.tabs.executeScript(tab_id, {code:"jQuery('a.previous')[0].click();"});
			});
			// jQuery('.extPlayPause i').removeClass('icon-play');
			// jQuery('.extPlayPause i').addClass('icon-pause');
		});

		jQuery('.extNext').click(function(){
			chrome.tabs.executeScript(tab_id, { file: "js/jquery.js" }, function() {
	    		//chrome.tabs.executeScript(null, { file: "js/play.js" });
	    		chrome.tabs.executeScript(tab_id, {code:"jQuery('a.next')[0].click();"});
			});
			// jQuery('.extPlayPause i').removeClass('icon-play');
			// jQuery('.extPlayPause i').addClass('icon-pause');
		});

});