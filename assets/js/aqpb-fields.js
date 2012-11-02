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
	function aqpb_colorpicker() {
		$('.cw-color-picker').each(function(){
			var $this = jQuery(this),
				id = $this.attr('rel');
			$this.farbtastic('#' + id);
			$(document).on('click', "#" + id, function() {
				$this.fadeIn();
			});
			
			//hide picker if click away
			$(document).bind('click', function(e) {
				var $clicked = $(e.target);
				if (!$clicked.is(".cw-color-picker *") && (!$clicked.is(".input-color-picker")))
					$(".cw-color-picker").fadeOut();
			});
		});
	}
	aqpb_colorpicker();
	$('ul.blocks').bind('sortstop', function() {
		aqpb_colorpicker();
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
	
	/** Sortable Lists
	----------------------------------------------- */
	// AJAX Add New <list-item>
	function aq_sortable_list_add_item(action_id, items) {
		
		var blockID = items.attr('rel'),
			numArr = items.find('li').map(function(i, e){
				return $(e).attr("rel");
			});
		
		var maxNum = Math.max.apply(Math, numArr);
		if (maxNum < 1 ) { maxNum = 0};
		var newNum = maxNum + 1;
		
		var data = {
			action: 'aq_block_'+action_id+'_add_new',
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
				items.append(response);
			}
						
		});
	};
	
	// Initialise sortable list fields
	function aq_sortable_list_init() {
		$('.aq-sortable-list').sortable({
			containment: "parent",
			placeholder: "ui-state-highlight"
		});
	}
	aq_sortable_list_init();
	
	$('ul.blocks').bind('sortstop', function() {
		aq_sortable_list_init();
	});
	
	
	$(document).on('click', 'a.aq-sortable-add-new', function() {
		var action_id = $(this).attr('rel'),
			items = $(this).parent().children('ul.aq-sortable-list');
			
		aq_sortable_list_add_item(action_id, items);
		aq_sortable_list_init
		return false;
	});
	
	// Delete Sortable Item
	$(document).on('click', '.aq-sortable-list a.sortable-delete', function() {
		var $parent = $(this.parentNode.parentNode.parentNode);
		$parent.children('.block-tabs-tab-head').css('background', 'red');
		$parent.slideUp(function() {
			$(this).remove();
		}).fadeOut('fast');
		return false;
	});
	
	// Open/Close Sortable Item
	$(document).on('click', '.aq-sortable-list .sortable-handle a', function() {
		var $clicked = $(this);
		
		$clicked.addClass('sortable-clicked');
		
		$clicked.parents('.aq-sortable-list').find('.sortable-body').each(function(i, el) {
			if($(el).is(':visible') && $(el).prev().find('a').hasClass('sortable-clicked') == false) {
				$(el).slideUp();
			}
		});
		$(this.parentNode.parentNode.parentNode).children('.sortable-body').slideToggle();
		
		$clicked.removeClass('sortable-clicked');
		
		return false;
	});
	
	
		
});