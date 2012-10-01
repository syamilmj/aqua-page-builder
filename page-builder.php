<?php
/*
 * Plugin Name: Page Builder
 * Plugin URI: http://aquagraphite.com/page-builder
 * Description: Easily create custom layouts and page elements.
 * Version: 1.0.0
 * Author: Syamil MJ
 * Author URI: http://aquagraphite.com
 * License: GPLV3
 *
 * @package   Aqua Page Builder
 * @version   1.0.0
 * @author    Syamil MJ <http://aquagraphite.com>
 * @copyright Copyright (c) 2012, Syamil MJ
 * @link      http://aquagraphite.com
 * @license   http://www.gnu.org/licenses/old-licenses/gpl-2.0.html
 *
 * @todo      
 */

//definitions
define( 'AQPB_VERSION', '1.0.0' );
define( 'AQPB_PATH', plugin_dir_path(__FILE__) );
define( 'AQPB_DIR', plugin_dir_url(__FILE__) );

//required functions & classes
require_once(AQPB_PATH . 'functions/aqpb_config.php');
require_once(AQPB_PATH . 'functions/aqpb_blocks.php');
require_once(AQPB_PATH . 'classes/class-aq-page_builder.php');
require_once(AQPB_PATH . 'classes/class-aq-block.php');
require_once(AQPB_PATH . 'functions/aqpb_functions.php');

//some default blocks
require_once(AQPB_PATH . 'blocks/aq-text-block.php');
require_once(AQPB_PATH . 'blocks/aq-column-block.php');
require_once(AQPB_PATH . 'blocks/aq-slogan-block.php');

//register default blocks
function aq_register_default_blocks() {
	aq_register_block('AQ_Text_Block');
	aq_register_block('AQ_Column_Block');
	aq_register_block('AQ_Slogan_Block');
}
add_action('aq_page_builder_init', 'aq_register_default_blocks');

//actions hook
do_action('aq_page_builder_init');

//fire up page builder
$aqpb_config = aq_page_builder_config();
$aq_page_builder = new AQ_Page_Builder($aqpb_config);
$aq_page_builder->init();