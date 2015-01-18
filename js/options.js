
jQuery(document).ready(function(){
 
  var defaultValue = get("notification");

  if(isEmpty(defaultValue){
  	jQuery("#notificationToggle").prop('checked', true);
    save("notification", 1);
  }
  else if(defaultValue == 1 || defaultValue == "1")  {
   jQuery("#notificationToggle").prop('checked', true); 
  }
  else {
    jQuery("#notificationToggle").prop('checked', false);
  }


  jQuery("form").submit(function(event){
  	//save notification toggle here

  	if(jQuery('#notificationToggle').is(":checked")) {
  		save("notification", 1);
  	}
  	else {
  		save("notification", 0);
  	}
  	
    jQuery(".success").show();
  	event.preventDefault();
  });

  function showValues(input) {
    var fields = input;
    $( "#results" ).empty();
    jQuery.each( fields, function( i, field ) {
      $( "#results" ).append( field.value + " " + field.name );
    });
  }


  function isEmpty(input){
  	if(input != "undefined" && input != "null" && input != null && input != "") {
  		return false;
  	}
  	return true;
  }
 

});