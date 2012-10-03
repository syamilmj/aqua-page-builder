<?php
/**
 * The class to register, update and display blocks
 *
 * It provides an easy API for people to add their own blocks
 * to the Aqua Page Builder
 *
 * @package Aqua Page Builder
 */
$aq_registered_blocks = array();
 
class AQ_Block {
 	
 	//some vars
 	var $id_base;
 	var $block_options;
 	var $instance;
 	
 	/* PHP4 constructor */
 	function AQ_Block($id_base = false, $block_options = array()) {
 		AQ_Block::__construct($id_base, $block_options);
 	}
 	
 	/* PHP5 constructor */
 	function __construct($id_base = false, $block_options = array()) {
 		$this->id_base = isset($id_base) ? strtolower($id_base) : strtolower(get_class($this));
 		$this->block_options = $this->parse_block($block_options);
 	}
 	
 	function block($instance) {
 		die('function AQ_Block::block should not be accessed directly.');
 	}
 	
 	/**
 	 * The callback function to be called on blocks saving
 	 * 
 	 * You should use this to do any filtering, sanitation etc
 	 */
 	function update($new_instance, $old_instance) {
 		return $new_instance;
 	}
 	
 	/** 
 	 * The block settings form 
 	 *
 	 * Use subclasses to override this function and generate
 	 * its own block forms
 	 */
 	function form($instance) {
 		echo '<p class="no-options-block">' . __('There are no options for this block.', 'aqpb') . '</p>';
 		return 'noform';
 	}
 	
 	/** 
 	 * Form callback function 
 	 *
 	 * Sets up some default values and construct the basic
 	 * structure of the block. Unless you know exactly what you're
 	 * doing, DO NOT override this function
 	 */
 	function form_callback($instance = array()) {
 		
 		$instance = is_array($instance) ? wp_parse_args($instance, $this->block_options) : $this->block_options;
 		
 		//insert the dynamic block_id
 		$this->block_id = 'aq_block_' . $instance['number'];
 		$instance['block_id'] = $this->block_id;
 		
 		//display the block
 		$this->before_block($instance);
 		$this->form($instance);
 		$this->after_block($instance);
 	}
 	
 	/* assign default block options if not yet set */
 	function parse_block($block_options) {
 		$defaults = array(
 			'id_base' => $this->id_base,
 			'order' => 0,
 			'name' => 'Custom',
 			'size' => 'span12',
 			'title' => '',
 			'parent' => 0,
 			'number' => '__i__',
 		);
 		
 		$block_options = is_array($block_options) ? wp_parse_args($block_options, $defaults) : $defaults;
 		
 		return $block_options;
 	}
 	
 	/* block form header */
 	function before_block($instance) {
 		extract($instance);
 		
 		$title = $title ? '<span class="in-block-title"> : '.$title.'</span>' : '';
 		
 		echo '<li id="template-block-'.$number.'" class="block block-'.$id_base.' '. $size .'">',
 				'<dl class="block-bar">',
 					'<dt class="block-handle">',
 						'<div class="block-title">',
 							$name , $title, 
 						'</div>',
 						'<span class="block-controls">',
 							'<a class="block-edit" id="edit-'.$number.'" title="Edit Block" href="#block-settings-'.$number.'">Edit Block</a>',
 						'</span>',
 					'</dt>',
 				'</dl>',
 				'<div class="block-settings cf" id="block-settings-'.$number.'">';
 			
 	}
 	
 	/* block form footer */
 	function after_block($instance) {
 		extract($instance);
 		
 		$block_saving_id = 'aq_blocks[aq_block_'.$number.']';
 		
	 		echo '<input type="hidden" class="id_base" name="'.$this->get_field_name('id_base').'" value="'.$id_base.'" />';
	 		echo '<input type="hidden" class="name" name="'.$this->get_field_name('name').'" value="'.$name.'" />';
	 		echo '<input type="hidden" class="order" name="'.$this->get_field_name('order').'" value="'.$order.'" />';
	 		echo '<input type="hidden" class="size" name="'.$this->get_field_name('size').'" value="'.$size.'" />';
	 		echo '<input type="hidden" class="parent" name="'.$this->get_field_name('parent').'" value="'.$parent.'" />';
	 		echo '<input type="hidden" class="number" name="'.$this->get_field_name('number').'" value="'.$number.'" />';
 		echo '</div>',
 			'</li>';
 			
 	}
 	
 	function get_field_id($field) {
 		$field_id = isset($this->block_id) ? $this->block_id . '_' . $field : '';
 		return $field_id;
 	}
 	
 	function get_field_name($field) {
 		$field_name = isset($this->block_id) ? 'aq_blocks[' . $this->block_id. '][' . $field . ']': '';
 		return $field_name;
 	}
 	
 	
}