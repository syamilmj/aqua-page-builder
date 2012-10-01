<?php
/**
 * Aqua Page Builder functions
 *
 * This holds the external functions which can be used by the theme
 * Requires the AQ_Page_Builder class
 */

if(class_exists('AQ_Page_Builder')) {

	function aq_get_blocks($template_id) {
		global $aq_page_builder;
		$blocks = $aq_page_builder->get_blocks($template_id);
		return $blocks;
	}
	
	function aqpb_select($options, $selected, $id, $name) {
		$options = is_array($options) ? $options : array();
		$output = '<select id="'.$id.'_'.$name.'" name="'.'aq_blocks['.$id.']['.$name.']">';
		foreach($options as $key=>$value) {
			$output .= '<option value="'.$key.'" '.selected( $selected, $key, false ).'>'.$value.'</option>';
		}
		$output .= '</select>';
		return $output;
	}
	
	add_action('template_redirect', 'lame_test');
	function lame_test() {
//		get_header();
//		global $post;
//		print_r($post);
//		echo 'basssss';
//		get_footer();
//		exit;
	}
}
?>