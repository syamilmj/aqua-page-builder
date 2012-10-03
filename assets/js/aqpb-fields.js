/**
 * AQPB Fields JS
 *
 * JS functionalities for some of the default fields
 */

jQuery.noConflict();

/** Fire up jQuery - let's dance! 
 */
jQuery(document).ready(function($){

	// colorpicker field
	jQuery('.cw-color-picker').each(function(){
		var $this = jQuery(this),
			id = $this.attr('rel');
		$this.farbtastic('#' + id);
		$("#" + id).click(function() {
			$this.fadeIn();
		});
		
		//hide picker if click away
		$(document).bind('click', function(e) {
			var $clicked = $(e.target);
			if (!$clicked.is(".cw-color-picker *") && (!$clicked.is(".input-color-picker")))
				$(".cw-color-picker").slideUp();
		});
	});
		
});