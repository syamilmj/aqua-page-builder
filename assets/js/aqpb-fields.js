/**
 * AQPB Fields JS
 *
 * JS functionalities for some of the default fields
 */

jQuery.noConflict();

/** Fire up jQuery - let's dance! 
 */
jQuery(document).ready(function($){

	/** Colorpicker Field
	----------------------------------------------- */
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
	
	/** Media Uploader
	----------------------------------------------- */	
	$(document).on('click', '.aq_upload_button', function() {
		
		// Setup vars
		var $clicked = $(this),
			template_id = $('#template').val(),
			input_id = $clicked.prev().attr('id'),
			media_type = $clicked.attr('rel');
		
		//Change "insert into post" to "Insert" Button
		tbframe_interval = setInterval(function() {jQuery('#TB_iframeContent').contents().find('.savesend .button').val('Insert');}, 100);
		tbframe_interval;
		
		window.send_to_editor = function(html) {
			if(media_type == 'img') {
				imgurl = jQuery('img',html).attr('src');
				jQuery('#' + input_id).val(imgurl);
				tb_remove();
			}
		}
		
		tb_show('Upload Media', 'media-upload.php?post_id='+ template_id +'&amp;TB_iframe=true');
		return false;
	
	});
	
	/** Tabs Block
	----------------------------------------------- */
	// AJAX Add new tab
	function aq_tabs_block_add_tab(tabs) {
		
		var blockID = tabs.attr('rel');
		
		var numArr = tabs.find('li').map(function(i, e){
			return $(e).attr("rel");
		});
		
		var maxNum = Math.max.apply(Math, numArr);
		if (maxNum < 1 ) { maxNum = 0};
		var newNum = maxNum + 1;
		
		var data = {
			action: 'aq_block_tab_add_new',
			security: $('#aqpb-nonce').val(),
			count: newNum,
			block_id: blockID
		};
		
		$.post(ajaxurl, data, function(response) {
			var check = response.charAt(response.length - 1);
			
			//check nonce
			if(check == '-1') {
				alert('An unknown error has occurred');
			} else {
				tabs.append(response);
			}
						
		});
	};
	
	// Tab Sortable
	function aq_tabs_block_sortable() {
		$('.block-tabs-tabs-list').sortable({
			containment: "parent"
		});
	}
	aq_tabs_block_sortable()
	
	$(document).on('click', 'a.block-tabs-add-new', function() {
		var tabs = $(this).parent().children('ul.block-tabs-tabs-list');
		aq_tabs_block_add_tab(tabs);
		aq_tabs_block_sortable();
		return false;
		
	});
	
	// Open/Close Tab
	$(document).on('click', '.block-tabs-tab-head-handle a', function() {
		var clicked = $(this);
		$(clicked.get(0).parentNode.parentNode.parentNode).children('.block-tabs-tab-body').slideToggle();
		return false;
	});
	
	// Delete Tab
	$(document).on('click', 'a.block-tabs-tab-delete', function() {
		var clicked = $(this);
		$(clicked.get(0).parentNode.parentNode.parentNode).children('.block-tabs-tab-head').css('background', 'red');
		$(clicked.get(0).parentNode.parentNode.parentNode).slideUp(function() {
			$(this).remove();
		}).fadeOut('fast');
		return false;
	});
		
});