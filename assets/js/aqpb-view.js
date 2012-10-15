/**
 * AQPB View JS
 * Front-end js for Aqua Page Builder blocks
 */

jQuery.noConflict();

/** Fire up jQuery - let's dance! 
 */
jQuery(document).ready(function($){
	
	/** Tabs & Toggles
	-------------------------------*/
	// Tabs
	if(jQuery().tabs) {
		$(".aq_block_tabs").tabs({ fx: { opacity: 'show' } });
	}
	
	// Toggles
	$('.aq_block_toggles .tab-head, .aq_block_toggles .arrow').each( function() {
		var toggle = $(this).parent();
		
		$(this).click(function() {
			toggle.find('.tab-body').slideToggle('400ms', function() {
				// Animation complete.
			});
			return false;
		});
		
	});
	
});