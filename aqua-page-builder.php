<?php
/** بسم الله الرحمن الرحيم **
 * 
 * Plugin Name: Aqua Page Builder
 * Plugin URI: http://aquagraphite.com/page-builder
 * Description: Fast, lightweight and intuitive drag-and-drop page builder.
 * Version: 1.1.5
 * Author: Syamil MJ
 * Author URI: http://aquagraphite.com
 * Domain Path: /languages/
 * Text Domain: aqpb-l10n
 *
 */
 
/**
 * Copyright (c) 2014 Syamil MJ. All rights reserved.
 *
 * Released under the GPL license
 * http://www.opensource.org/licenses/gpl-license.php
 *
 * This is an add-on for WordPress
 * http://wordpress.org/
 *
 * **********************************************************************
 * This program is free software; you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation; either version 2 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 * **********************************************************************
 */

//definitions
if(!defined('AQPB_PATH')) define( 'AQPB_PATH', plugin_dir_path(__FILE__) );
if(!defined('AQPB_DIR')) define( 'AQPB_DIR', plugin_dir_url(__FILE__) );

function aqpb_get_version() {
	$plugin_data = get_plugin_data(__FILE__);
	$version     = $plugin_data['Version'];
	return $version;
}

function aqpb_localisation() {
	load_plugin_textdomain( 'aqpb-i10n', FALSE, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );
}
add_action('init', 'aqpb_localisation');

//required functions & classes
require_once(AQPB_PATH . 'functions/aqpb_config.php');
require_once(AQPB_PATH . 'functions/aqpb_blocks.php');
require_once(AQPB_PATH . 'classes/class-aq-page-builder.php');
require_once(AQPB_PATH . 'classes/class-aq-block.php');
require_once(AQPB_PATH . 'functions/aqpb_functions.php');

//some default blocks
require_once(AQPB_PATH . 'blocks/aq-text-block.php');
require_once(AQPB_PATH . 'blocks/aq-column-block.php');
require_once(AQPB_PATH . 'blocks/aq-clear-block.php');
require_once(AQPB_PATH . 'blocks/aq-widgets-block.php');
require_once(AQPB_PATH . 'blocks/aq-alert-block.php');
require_once(AQPB_PATH . 'blocks/aq-tabs-block.php');
require_once(AQPB_PATH . 'blocks/aq-editor-block.php'); //buggy

//register default blocks
aq_register_block('AQ_Text_Block');
aq_register_block('AQ_Editor_Block'); //buggy
aq_register_block('AQ_Column_Block');
aq_register_block('AQ_Clear_Block');
aq_register_block('AQ_Widgets_Block');
aq_register_block('AQ_Alert_Block');
aq_register_block('AQ_Tabs_Block');

//fire up page builder
$aqpb_config = aq_page_builder_config();
$aq_page_builder = new AQ_Page_Builder($aqpb_config);
if(!is_network_admin()) $aq_page_builder->init();
