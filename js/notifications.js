/*
* This file will contain common use of notification and their operations
*/

function createNotification(icon, title, notificationMessage) {


	var opt = {
  	type: "basic",
  	title: title,
 	message: notificationMessage,
  	iconUrl: icon
	}

	chrome.notifications.create("gaana", opt, function() {});
	chrome.notifications.clear("gaana", function() {});

	//setTimeout(function(){notification.cancel();},ext_timeOut);
}

