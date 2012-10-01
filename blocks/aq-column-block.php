<?php
/** A simple text block **/
class AQ_Column_Block extends AQ_Block {
	
	/* PHP5 constructor */
	function __construct() {
		
		$block_options = array(
			'name' => 'Column',
			'size' => 'span6',
		);
		
		//create the widget
		parent::__construct('aq_column_block', $block_options);
		
	}
	
	function form() {
		echo '<p class="empty-column">',
		__('Drag block items into this box', 'framework'),
		'</p>';
		echo '<ul class="blocks column-blocks cf"></ul>';
	}
	
	function form_callback($instance = array()) {
		$instance = is_array($instance) ? wp_parse_args($instance, $this->block_options) : $this->block_options;
		
		//insert the dynamic block_id & block_saving_id into the array
		$instance['block_id'] = 'aq_block_' . $instance['number'];
		$instance['block_saving_id'] = 'aq_blocks[aq_block_'. $instance['number'] .']';
		
		extract($instance);
		
		$col_order = $order;
		
		//column block header
		if(isset($template_id)) {
			echo '<li id="template-block-'.$number.'" class="block block-column '.$size.'">',
				'<div class="block-settings-column cf" id="block-settings-'.$number.'">',
					'<p class="empty-column">',
					__('Drag block items into this column box', 'framework'),
					'</p>',
					'<ul class="blocks column-blocks cf">';
					
			//check if column has blocks inside it
			$blocks = aq_get_blocks($template_id);
			
			//outputs the blocks
			if($blocks) {
				foreach($blocks as $key => $instance) {
					global $aq_registered_blocks;
					extract($instance);
					
					//get the block object
					$block = $aq_registered_blocks[$id_base];
					
					if($parent == $col_order) {
						$block->form_callback($instance);
					}
				}
			} 
			echo '</ul>';
			
		} else {
			$this->before_block($instance);
			$this->form($instance);
		}
				
		//after block
		$this->after_block($instance);
	}
	
}