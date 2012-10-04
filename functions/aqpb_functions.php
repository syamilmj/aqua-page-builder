<?php
/**
 * Aqua Page Builder functions
 *
 * This holds the external functions which can be used by the theme
 *
 * Requires the AQ_Page_Builder class
**/

if(class_exists('AQ_Page_Builder')) {
	
	/* Register a block */
	function aq_register_block($block_class) {
		global $aq_registered_blocks;
		$aq_registered_blocks[strtolower($block_class)] = new $block_class;
	}
	
	/** Un-register a block **/
	function aq_unregister_block($block_class) {
		global $aq_registered_blocks;
		foreach($aq_registered_blocks as $block) {
			if($block->id_base == $block_class) unset($aq_registered_blocks[$block_class]);
		}
	}
	
	/** Get list of all blocks **/
	function aq_get_blocks($template_id) {
		global $aq_page_builder;
		$blocks = $aq_page_builder->get_blocks($template_id);
		
		return $blocks;
	}
	
	/** Display the template (for front-end usage only) **/
	function aq_display_template( $atts, $content = null) {
		global $aq_page_builder;
		$defaults = array('id' => 0);
		extract( shortcode_atts( $defaults, $atts ) );
		$aq_page_builder->display_template($id);
	}
		//add the [template] shortcode
		global $shortcode_tags;
		if ( !array_key_exists( 'template', $shortcode_tags ) ) {
			add_shortcode( 'template', 'aq_display_template' );
		} else {
			add_action('admin_notices', create_function('', "echo '<div id=\"message\" class=\"error\"><p><strong>Aqua Page Builder notice: </strong>'. __('The \"[template]\" shortcode already exists, possibly added by the theme or other plugins. Please consult with the theme author to consult with this issue', 'aqpb') .'</p></div>';"));
		}
		
	/** 
	 * Fields helper functions
	 *
	 * Provides some default fields for use in the blocks
	 *
	 * @todo build this into a separate class instead!
	**/
	
	//select field
	function aq_field_select($options, $selected, $block_id, $name) {
		$options = is_array($options) ? $options : array();
		$output = '<select id="'. $block_id .'_'.$name.'" name="aq_blocks['.$block_id.']['.$name.']">';
		foreach($options as $key=>$value) {
			$output .= '<option value="'.$key.'" '.selected( $selected, $key, false ).'>'.$value.'</option>';
		}
		$output .= '</select>';
		
		return $output;
	}
	
	//color picker field
	function aq_field_color_picker($default, $block_id, $name) {
		$output = '<div class="aqpb-color-picker">';
			$output .= '<input id="'. $block_id .'_'.$name.'" type="text" class="input-small input-color-picker" value="'. $default .'" name="aq_blocks['.$block_id.']['.$name.']" />';
			$output .= '<div class="cw-color-picker" rel="'. $block_id .'_'.$name.'"></div>';
		$output .= '</div>';
		return $output;
	}
	
	/**--------------**/
	
}
?>