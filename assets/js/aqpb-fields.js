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
				$(".cw-color-picker").fadeOut();
		});
	});
	
	// Media Uploader
	jQuery('.aq_upload_button').each(function() {
	
		jQuery(this).click(function() {
			
			// Setup vars
			var $clicked = $(this),
				template_id = $('#template').val(),
				input_id = $clicked.prev().attr('id'),
				media_type = $clicked.attr('rel');
			
			//Change "insert into post" to "Insert" Button
			tbframe_interval = setInterval(function() {jQuery('#TB_iframeContent').contents().find('.savesend .button').val('Insert');}, 100);
			tbframe_interval;
			
			window.send_to_editor = function(html) {
				imgurl = jQuery('img',html).attr('src');
				jQuery('#' + aq_input).val(html);
				tb_remove();
			}
			
			tb_show('Upload Media', 'media-upload.php?post_id='+ template_id +'&amp;TB_iframe=true');
			return false;
		
		});
	
	});
	
	// AJAX add new tab/toggle
		
});