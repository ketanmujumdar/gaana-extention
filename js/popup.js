jQuery(document).ready(function(){

var tab_id = 0;
var site_found = false;

isUpdated = get("updated");
if( isUpdated != "1438005670" || isUpdated != 1438005670) {
	window.open(chrome.extension.getURL("options.html"));
	save("updated", 1438005670);
}
	

	chrome.tabs.query({'url': '*://'+ext_site_name+'*'},function(tab){
		try
		{
			tab_id = tab[0].id;
			site_found = true;
		}
		catch(err) {
			site_found = false;
			console.log("No "+ ext_site_name + " site found in the open tabs");
		}
    });

	setSongInfo();
	//auto refresh popup every 5 second, if its opened for long
	setTimeout(function(){window.location.href = ext_popup;}, 5000);

	jQuery('.extPlayPause').click(function(){
		if(site_found == true) {
			chrome.tabs.executeScript(tab_id, { file: "js/jquery.js" }, function() {
			chrome.tabs.executeScript(tab_id, {code:"jQuery('a.playPause')[0].click();"});
			});	
		}
	});

	jQuery('.extPrev').click(function(){
		if(site_found == true) {
			chrome.tabs.executeScript(tab_id, { file: "js/jquery.js" }, function() {
	    		chrome.tabs.executeScript(tab_id, {code:"jQuery('a.previous')[0].click();"});
	    		setTimeout(function(){window.location.href = ext_popup;}, 500);
			});
		}
	});

	jQuery('.extNext').click(function(){
		if(site_found == true) {
			chrome.tabs.executeScript(tab_id, { file: "js/jquery.js" }, function() {
	    		chrome.tabs.executeScript(tab_id, {code:"jQuery('a.next')[0].click();"});
	    		setTimeout(function(){window.location.href = ext_popup;}, 500);
			});
		}
	});

	jQuery('.extShuffle').click(function(){
		if(site_found == true) {
			chrome.tabs.executeScript(tab_id, { file: "js/jquery.js" }, function() {
	    		chrome.tabs.executeScript(tab_id, {code:"jQuery('a.shuffle')[0].click();"});
	    		setTimeout(function(){window.location.href = ext_popup;}, 500);
			});
		}
	});

	function setSongInfo() {
		try {
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
