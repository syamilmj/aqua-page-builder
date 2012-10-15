<?php 
/* Media Uploader Block */
if(!class_exists('AQ_Upload_Block') {
	class AQ_Upload_Block {
		
		function __construct() {
			$block_options = array(
				'name' => 'Text',
				'size' => 'span6',
			);
			
			//create the block
			parent::__construct('aq_upload_block', $block_options);
		}
		
		function form($instance) {
			$defaults = array(
				'media' => '',
			);
			$instance = wp_parse_args($instance, $defaults);
			extract($instance);
			
			
		}
		
		function block($instance) {
		
		}
		
	}
}
