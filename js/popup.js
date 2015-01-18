jQuery(document).ready(function(){

var tab_id = 0;



isUpdated = get("updated");
if( isUpdated != "1421579528" || isUpdated != 1421579528) {
	window.open(chrome.extension.getURL("options.html"));
	save("updated", 1421579528);
}
	

	


	chrome.tabs.query({'url': '*://'+ext_site_name+'/*'},function(tab){
		try
		{
			tab_id = tab[0].id;
		}
		catch(err) {
			chrome.tabs.create({'url': ext_protocal+ext_site_name}, function(tab) {
		  		tab_id = tab.id;
		  		window.close();
		  });
		}
    });

	setSongInfo();
	//auto refresh popup every 5 second, if its opened for long
	setTimeout(function(){window.location.href = ext_popup;}, 5000);

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
    		setTimeout(function(){window.location.href = ext_popup;}, 500);
    		
		});
		// jQuery('.extPlayPause i').removeClass('icon-play');
		// jQuery('.extPlayPause i').addClass('icon-pause');
	});

	jQuery('.extNext').click(function(){
		chrome.tabs.executeScript(tab_id, { file: "js/jquery.js" }, function() {
    		//chrome.tabs.executeScript(null, { file: "js/play.js" });
    		chrome.tabs.executeScript(tab_id, {code:"jQuery('a.next')[0].click();"});
    		setTimeout(function(){window.location.href = ext_popup;}, 500);
		});
		// jQuery('.extPlayPause i').removeClass('icon-play');
		// jQuery('.extPlayPause i').addClass('icon-pause');
	});

	jQuery('.extShuffle').click(function(){
		chrome.tabs.executeScript(tab_id, { file: "js/jquery.js" }, function() {
    		//chrome.tabs.executeScript(null, { file: "js/play.js" });
    		chrome.tabs.executeScript(tab_id, {code:"jQuery('a.shuffle')[0].click();"});
    		setTimeout(function(){window.location.href = ext_popup;}, 500);
		});
		// jQuery('.extPlayPause i').removeClass('icon-play');
		// jQuery('.extPlayPause i').addClass('icon-pause');
	});

	function setSongInfo() {
		try {
			console.log(get(ext_name+'SongInfo'));
			var SongInfo = JSON.parse(get(ext_name+'SongInfo'));
			if(SongInfo == undefined || SongInfo == 'undefined' || SongInfo == null)
			{
				jQuery('#wrapper').hide();
				jQuery('#warning').show();
			}
			else {
				jQuery('#wrapper').show();
				jQuery('#warning').hide();
				jQuery('#extImage').attr('src' , SongInfo.ico);
				jQuery('#extName').html(SongInfo.title);
				jQuery('#extAlbum').html(SongInfo.album);	
			}
		}
		catch(exp) {
			
		}
	}
});

	//GA Tracking

      var _gaq = _gaq || [];
     _gaq.push(['_setAccount', 'UA-41905417-1']);
          _gaq.push(['_trackPageview']);

    (function() {
      var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
      ga.src = 'https://ssl.google-analytics.com/ga.js';
      var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
    })();
