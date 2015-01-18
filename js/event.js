jQuery(document).ready(function(){

	var songName = '';
	var songAlbum = '';
	var ico =  '';
	var songInfo = '';
	var imgInfo = '';
	var gaanaLoaded = false;
	var isPaused = true;


	//initialize local storage
	// if(!gaanaLoaded) {
	// 	initGaana();
	// 	gaanaLoaded	= true;
	// }
	
	/* Trigger when the mplayer is loaded */
	jQuery('.song-title1').bind('DOMNodeInserted', function(event) {
		initGaana();
		gaanaLoaded	= true;
	});

	/* Fetch the latest thumbnail */
	jQuery('.thumbHolder').bind('DOMNodeInserted', function(event) {

		imgInfo = jQuery(event.target.outerHTML).attr('src');
		
		if(!isEmpty(imgInfo)) {
			ico = imgInfo;
		}		
		callNotification(ico, songName, songAlbum);
	});

	/* Fetch Song Info */
	jQuery('.song-title1').bind('DOMSubtreeModified', function(event) {
		try {
			initGaana();
			songInfo = jQuery(event.target).find(".song-title1").html();
			if(!isEmpty(songInfo)) {
				imgInfo = jQuery(event.target.outerHTML).attr('src');
				songName = jQuery(event.target).find('.song-title1 #tx').text().split(" - ")[0];
				songAlbum = jQuery(event.target).find('#tx .albumNamePl').html();
				callNotification(imgInfo, songName, songAlbum);
			}

		}
		catch(exception) {

		}
    });


	function callNotification(ico, songName, songAlbum) {
		if(!isEmpty(songName) && !isEmpty(songAlbum) && !isEmpty(ico)) {
				 chrome.runtime.sendMessage({notify:'notification', ico: ico, title: songName, message: songAlbum}, function(response) {
				 	console.log(response);
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
		debugger;
		var songnm = jQuery('.song-title1 #tx').text().split(" - ")[0];
		var songalbm = jQuery('#tx .albumNamePl').html();
		var songicon = jQuery('.thumbHolder img').attr('src');

		callNotification(songicon, songnm, songalbm);
	}

});