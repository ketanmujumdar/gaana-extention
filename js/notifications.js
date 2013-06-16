/*
* This file will contain common use of notification and their operations
*/

/*document.addEventListener("DOMSubtreeModified", function(event) {
    alert(jQuery(event.target).parent()[0].tagName);
});*/





function createNotification(icon, title, notificationMessage) {
	var notification = webkitNotifications.createNotification(
	  icon,  // icon url - can be relative
	  title,  // notification title
	  notificationMessage  // notification body text
	);

	notification.show();


	setTimeout(function(){notification.cancel();},ext_timeOut);
}

function createHtmlNotification(icon, title, notificationMessage) {
	var notification = webkitNotifications.createHTMLNotification(
	  notificationMessage  // notification body text
	);

	notification.show();


	setTimeout(function(){notification.cancel();},ext_timeOut);
}

