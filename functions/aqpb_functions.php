<?php
/**
 * Aqua Page Builder functions
 *
 * This holds the external functions which can be used by the theme
 * Requires the AQ_Page_Builder class
**/

if(class_exists('AQ_Page_Builder')) {
	
	/* Register a block */
	function aq_register_block($block_class) {
		global $aq_registered_blocks;
		$aq_registered_blocks[strtolower($block_class)] = new $block_class;
	}
	
	/* Un-register a block */
	function aq_unregister_block($block_class) {
		global $aq_registered_blocks;
		foreach($aq_registered_blocks as $block) {
			if($block->id_base == $block_class) unset($aq_registered_blocks[$block_class]);
		}
	}
	
	function aq_get_blocks($template_id) {
		global $aq_page_builder;
		$blocks = $aq_page_builder->get_blocks($template_id);
		
		return $blocks;
	}
	
	/** 
	 * fields helper functions
	 * provides some default fields for use in the blocks,
	**/
	function aq_field_select($options, $selected, $block_id, $name) {
		$options = is_array($options) ? $options : array();
		$output = '<select id="'. $block_id .'_'.$name.'" name="aq_blocks['.$block_id.']['.$name.']">';
		foreach($options as $key=>$value) {
			$output .= '<option value="'.$key.'" '.selected( $selected, $key, false ).'>'.$value.'</option>';
		}
		$output .= '</select>';
		
		return $output;
	}
	
	function aq_field_color_picker($default, $block_id, $name) {
		$output = '<input id="'. $block_id .'_'.$name.'" type="text" class="input-small input-color-picker" value="'. $default .'" name="aq_blocks['.$block_id.']['.$name.']" />';
		$output .= '<div class="cw-color-picker" rel="'. $block_id .'_'.$name.'"></div>';
		
		return $output;
	}
	
	add_action('template_redirect', 'lame_test');
	function lame_test() {
		global $wp_query;
		$post_type = $wp_query->query_vars['post_type'];
		
		if($post_type == 'template') {
			get_header();
			$blocks = aq_get_blocks(get_the_ID());
			echo '<pre><code>';
			print_r($blocks);
			echo '</code></pre>';
			echo 'basssss';
			get_footer();
			exit;
		}
	}
}
?>