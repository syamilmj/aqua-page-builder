<?php
/** بسم الله الرحمن الرحيم **
 * @title AQ Page Builder
 * @author Syamil MJ
 * @authoruri http://aquagraphite.com
 * @description A custom WordPress page templates builder
 * @package WordPress
 * @subpackage Aqua Page Builder
 * @license GNU GENERAL PUBLIC LICENSE V3.0 (http://www.gnu.org/copyleft/gpl.html)
 *			You may not use this without my written permission
 *
 **/

class AQ_Page_Builder {
	
	public $url = AQPB_DIR;
	public $config = array();
	
	/**
	 * Stores public queryable vars
	 *
	 */
	function __construct( $config = array()){
		
		$defaults['menu_title'] = __('Page Builder', 'framework');
		$defaults['page_title'] = __('Page Builder', 'framework');
		$defaults['page_slug'] = __('aq-page-builder', 'framework');
		
		$this->args = wp_parse_args($config, $defaults);
		$this->args['page_url'] = esc_url(add_query_arg(
			array(
				'page' => $this->args['page_slug']
			),
			admin_url( 'themes.php' )
		));
	}
	
	/**
	 * Initialise Page Builder page and its settings
	 *
	 * @since 1.0.0
	 */
	function init() {
		add_action('admin_menu', array(&$this, 'builder_page'));
		add_action('init', array(&$this, 'register_template_post_type'));
		add_filter( 'contextual_help', array( &$this, 'contextual_help' ) );
	}

	function builder_page() {
		$this->page = add_theme_page( $this->args['page_title'], $this->args['menu_title'], 'manage_options', $this->args['page_slug'], array(&$this, 'builder_settings_show'));
		
		//enqueueu styles/scripts on the builder page
		add_action('admin_print_styles-'.$this->page, array(&$this, 'enqueue'));
	}
	
	/**
	 * Register and enqueueu styles/scripts
	 * @since 1.0
	 */
	function enqueue() {
		//register 'em
		wp_register_style( 'aqpb-css', $this->url.'assets/css/aqpb.css', array(), time(), 'all');
		wp_register_style( 'aqpb-blocks', $this->url.'assets/css/aqpb_blocks.css', array(), time(), 'all');
		wp_register_script('aqpb-js', $this->url . 'assets/js/aqpb.js', array('jquery'), time(), true);
		wp_register_script('aqpb-fields', $this->url . 'assets/js/aqpb-fields.js', array('jquery'), time(), true);
		
		//enqueue 'em
		wp_enqueue_style('aqpb-css');
		wp_enqueue_style('aqpb-blocks');
		wp_enqueue_style('farbtastic');
		wp_enqueue_script('jquery');
		wp_enqueue_script('jquery-ui-sortable');
		wp_enqueue_script('jquery-ui-resizable');
		wp_enqueue_script('jquery-ui-draggable');
		wp_enqueue_script('jquery-ui-droppable');
		wp_enqueue_script('farbtastic');
		wp_enqueue_script('aqpb-js');
		wp_enqueue_script('aqpb-fields');
		
		//hook to register custom style/scripts
		do_action('aq-page-builder-enqueue');
	}
	
	/**
	 * Register template post type
	 *
	 * @uses register_post_type
	 */
	function register_template_post_type() {
		if(!post_type_exists('template')) {
			register_post_type( 'template', array(
				'labels' => array(
					'name' => 'Templates',
				),
				'public' => true,
				'show_ui' => true,
				'capability_type' => 'page',
				'hierarchical' => false,
				'rewrite' => false,
				'supports' => array( 'title', 'editor' ), 
				'query_var' => false,
				'can_export' => true,
				'show_in_nav_menus' => false
			) );
		}
	}
	
	/**
	 * AJAX functions for use in the page builder settings page
	 */
	function ajax_functions(){
		
	}
	
	/**
	 * Checks if template with given id exists
	 */
	function is_template($template_id) {
	
		$template = get_post($template_id);
		
		if($template) {
			if($template->post_type != 'template' || $template->post_status != 'publish') return false;
		} else {
			return false;
		}
		
		return true;
	}
	
	/**
	 * Retrieve all blocks from template id
	 *
	 * @return array - $blocks
	 * @since 1.0.0
	 */
	function get_blocks($template_id) {
		
		//verify template
		if(!$template_id) return;
		if(!$this->is_template($template_id)) return;
		
		//filter post meta to get only blocks data
		$blocks = array();
		$all = get_post_custom($template_id);
		foreach($all as $key => $block) {
			if(substr($key, 0, 9) == 'aq_block_') {
				$blocks[$key] = get_post_meta($template_id, $key, true);
			}
		}
		
		//sort by order
		$sort = array();
		foreach($blocks as $block) {
			$sort[] = $block['order'];
		}
		array_multisort($sort, SORT_NUMERIC, $blocks);
		
		return $blocks;
	}
	
	/**
	 * Display blocks archive
	 *
	 * @since 1.0.0
	 */
	function blocks_archive() {
		global $aq_registered_blocks;
		foreach($aq_registered_blocks as $block) {
			$block->form_callback();
		}
	}
	
	/**
	 * Display template blocks
	 *
	 * @since 1.0.0
	 */
	function display_blocks( $template_id ) {
		
		//verify template
		if(!$template_id) return;
		if(!$this->is_template($template_id)) return;
		
		$blocks = $this->get_blocks($template_id);
		$blocks = is_array($blocks) ? $blocks : array();
		
		//return early if no blocks
		if(empty($blocks)) {
			echo '<p class="empty-template">';
			echo __('Drag block items from the left into this area to begin building your template.', 'framework');
			echo '</p>';
			return;
			
		} else {
			//outputs the blocks
			foreach($blocks as $key => $instance) {
				global $aq_registered_blocks;
				extract($instance);
				
				//get the block object
				$block = $aq_registered_blocks[$id_base];
				
				//insert template_id into $instance
				$instance['template_id'] = $template_id;
				
				//display the block
				if($parent == 0) {
					$block->form_callback($instance);
				}
			}
		}
	}
	
	/**
	 * Get all saved templates
	 * @since 1.0.0
	 */
	function get_templates() {
		$args = array (
			'nopaging' => true,
			'post_type' => 'template',
			'status' => 'publish',
			'orderby' => 'title',
			'order' => 'ASC',
		);
		
		$templates = get_posts($args);
		
		return $templates;
	}
	
	/**
	 * Creates a new template
	 *
	 * @since 1.0.0
	 */
	function create_template($title) {
		//wp security layer
		check_admin_referer( 'create-template', 'create-template-nonce' );
		
		//create new template only if title don't yet exist
		if(!get_page_by_title( $title, 'OBJECT', 'template' )) {
			//set up template name
			$template = array(
				'post_title' => wp_strip_all_tags($title),
				'post_type' => 'template',
				'post_status' => 'publish',
			);
			
			//create the template
			$template_id = wp_insert_post($template);
			
		} else {
			return new WP_Error('duplicate_template', 'Template names must be unique, try a different name');
		}
		
		//return the new id of the template
		return $template_id;
	}
	
	/**
	 * Function to update templates
	 * 
	 * @since 1.0.0
	 */
	function update_template($template_id, $blocks, $title) {
		
		//first let's check if template id is valid
		if(!$this->is_template($template_id)) wp_die('Error : Template id is not valid');
		
		//wp security layer
		check_admin_referer( 'update-template', 'update-template-nonce' );
		
		//update the title
		$template = array('ID' => $template_id, 'post_title'=> $title);
		wp_update_post( $template );
		
		//now let's save our blocks & prepare haystack
		$blocks = is_array($blocks) ? $blocks : array();
		$haystack = array();
		$i = 1;
		foreach ($blocks as $block) {
			$meta_key = isset($block['number']) ? 'aq_block_' . $i : 'aq_block_0';
			
			//sanitize
			//@todo use the update() in AQ_Block for greater control on sanitization
			$block = array_map('htmlspecialchars', array_map('stripslashes', $block));
			
			//update block
			update_post_meta($template_id, $meta_key, $block);
			
			//prepare haystack
			$haystack[] = $meta_key;
			
			$i++;
		}
		
		//use haystack to check for deleted blocks
		$curr_blocks = $this->get_blocks($template_id);
		$curr_blocks = is_array($curr_blocks) ? $curr_blocks : array();
		foreach($curr_blocks as $key => $block){
			if(!in_array($key, $haystack))
				delete_post_meta($template_id, $key);
		}
		
	}
	
	function delete_template($template_id) {
		
		//first let's check if template id is valid
		if(!$this->is_template($template_id)) return false;
		
		//wp security layer
		check_admin_referer( 'delete-template', '_wpnonce' );
		
		//delete template, hard!
		wp_delete_post( $template_id, true );
		
	}
	
	/**
	 * Contextual help tab
	 */
	function contextual_help() {
		
		$screen = get_current_screen();
		if($screen->id == $this->page) {
			$screen->add_help_tab( array(
			'id'		=> 'overview',
			'title'		=> __('Overview'),
			'content'	=> $this->args['contextual_help'],
			) );
			$screen->add_help_tab( array(
			'id'		=> 'page-builder',
			'title'		=> __('Page Builder'),
			'content'	=> 'another text',
			) );
			$screen->set_help_sidebar(
				'<p><strong>' . __('For more information:') . '</strong></p>' .
				'<p>' . __('<a href="http://codex.wordpress.org/Appearance_Menus_Screen" target="_blank">Documentation on Menus</a>') . '</p>' .
				'<p>' . __('<a href="http://wordpress.org/support/" target="_blank">Support Forums</a>') . '</p>'
			);
		}
	}
	
	/**
	 * Main page builder settings page display
	 * @since 1.0
	 */
	function builder_settings_show(){
		require_once(AQPB_PATH . 'view/view-settings-page.php');
	}
}
// not much to say when you're high above the mucky-muck