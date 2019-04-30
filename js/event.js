jQuery(document).ready(function(){

	var songName = '';
	var songAlbum = '';
	var ico =  '';
	var songInfo = '';
	var imgInfo = '';
	var gaanaLoaded = false;
	var isPaused = true;

	
	/* Trigger when the mplayer is loaded */
	jQuery('.player-song-title').bind('DOMNodeInserted', function(event) {
		initGaana();
		gaanaLoaded	= true;
	});

	/* Fetch the latest thumbnail */
	jQuery('.thumbHolder').bind('DOMNodeInserted', function(event) {
		var player = jQuery(event.target).closest('.player-lt').first();
		initGaana();
		setTimeout(function(){},200); 
		imgInfo = player.find('.song-details-inner .thumbHolder img').attr('src');
		songName = player.find('.player-song-title #stitle').text().split(" - ")[0];
		songAlbum = player.find('.player-song-title #atitle').first().text();
	
		callNotification(imgInfo, songName, songAlbum);
	});

	function callNotification(ico, songName, songAlbum) {
		if(!isEmpty(songName) && !isEmpty(songAlbum) && !isEmpty(ico)) {
				 chrome.runtime.sendMessage({notify:'notification', ico: ico, title: songName, message: songAlbum}, function(response) {
				 	songName = '';
				 	songAlbum = '';
				 	ico = '';
				 });
			}
	}

	function isEmpty(strValue) {
		if(strValue == '' || strValue == undefined || strValue == 'undefined') {
			return true;
		} 
		else
			return false;
	}


	function initGaana() {
		var songnm = jQuery('.song-title1 #tx').text().split(" - ")[0];
		var songalbm = jQuery('#tx .albumNamePl').html();
		var songicon = jQuery('.thumbHolder img').attr('src');

		callNotification(songicon, songnm, songalbm);
	}
	
	//GA Tracking
	var _gaq = _gaq || [];
	_gaq.push(['_setAccount', 'UA-41905417-1']);
	_gaq.push(['_trackPageview']);
	
	(function() {
	  var ga = document.createElement('script'); ga.type = 'text/javascript'; ga.async = true;
	  ga.src = 'https://ssl.google-analytics.com/ga.js';
	  var s = document.getElementsByTagName('script')[0]; s.parentNode.insertBefore(ga, s);
	})();

});
