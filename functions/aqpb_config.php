<?php
/**
 * Aqua Page Builder Config
 *
 * This file handles various configurations
 * of the page builder page
 *
 */
function aq_page_builder_config() {
	$config = array(); //initialise array
	
	$config['menu_title'] = __('Page Builder', 'framework');
	$config['page_title'] = __('Page Builder', 'framework');
	$config['page_slug'] = __('aq-page-builder', 'framework');
	
	/* This holds the contextual help text - the more info, the better.
	 * HTML is of course allowed in all of its glory! */
	$config['contextual_help'] = 
		'<p>' . __('The page builder allows you to create custom page templates which you can later use for your pages.', 'framework') . '<p>' .
		'<p>' . __('To use the page builder, start by adding a new template. You can drag and drop the blocks on the left into the building area on the right of the screen. Each block has its own unique configuration which you can manually configure to suit your needs', 'framework') . '<p>' .
		'<p>' . __('Please refer to the', 'framework') . '<a href="http://aquagraphite.com/api/documentation/aqua-page-builder" target="_blank" alt="Aqua Page Builder Documentation">'. __('documentation page', 'framework') . '</a>'. __('for more information on how to use this feature.', 'framework') . '<p>';
	
	//Debugging
	$config['debug'] = false;
	
	// Available blocks
	$config['available-blocks'] = array(
		'text' => array(
			'type' => 'text',
			'name' => 'Text',
			'text' => '',
			'size' => 'span6',
		),
		'slogan' => array(
			'type' => 'slogan',
			'name' => 'Slogan',
			'text' => '',
			'size' => 'span12',
		),
		'slider' => array(
			'type' => 'slider',
			'name' => 'Slider',
			'speed' => '',
			'pause' => '',
			'size' => 'span12',
		),
		'service' => array(
			'type' => 'service',
			'name' => 'Service',
			'icon' => 'default',
			'text' => '',
		),
		'googlemap' => array (
			'type' => 'googlemap',
			'name' => 'Google Map',
			'size' => 'span6',
			'address' => '',
			'coordinates' => '',
			'height' => 270,
		), //@todo multi marker map
		'widgets' => array (
			'type' => 'widgets',
			'name' => 'Widgets',
			'size' => 'span6',
			'sidebar' => '',
			'columns' => '',
		),
		'blog' => array(
			'type' => 'blog',
			'name' => 'Blog Posts',
			'exclude_format' => '',
			'category' => '',
			'tags' => '',
			'excerpt_length' => '',
		),
		'portfolio' => array(
			'type' => 'portfolio',
			'name' => 'Portfolio',
			'columns' => 'four',
			'filter' => 'true', // show/disable filter
			'types'	=> '',
		),
		'featured_portfolio' => array(
			'type' => 'featured_portfolio',
			'name' => 'Featured Portfolio',
			'size' => 'span6',
			'items' => 6,
		),
		'tab' => array(
			'type' => 'tab',
			'name' => 'Tabs',
			'size' => 'span6',
			'tabs' => array(),
		),
		'toggle' => array(
			'type' => 'toggle',
			'name' => 'Toggles',
			'size' => 'span6',
			'toggles' => array(),
		),
		'accordian' => array(
			'type' => 'accordian',
			'name' => 'Accordians',
			'size' => 'span6',
			'accordians' => array(),
		),
		'price_table' => array(
			'type' => 'price_table',
			'name' => 'Price Tables',
			'size' => 'span6',
			'toggles' => array(),
		),
		'clear' => array(
			'type' => 'clear',
			'name' => 'Clear',
			'size' => 'span12',
		),
		'column' => array(
			'type' => 'column',
			'name' => 'Column',
			'size' => 'span12',
		),
	);
	
	return apply_filters('aq-page-builder-config', $config);
}