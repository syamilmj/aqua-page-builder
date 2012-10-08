<?php
/** بسم الله الرحمن الرحيم **
 *
 * Plugin Name: Aqua Page Builder
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
 * @license   http://www.gnu.org/copyleft/gpl.html
 * @notes	  You may not use this without my written permission
 *
 * @todo      
 */

//definitions
define( 'AQPB_VERSION', '1.0.0' );
define( 'AQPB_PATH', plugin_dir_path(__FILE__) );
define( 'AQPB_DIR', plugin_dir_url(__FILE__) );

//required functions & classes
require_once(AQPB_PATH . 'functions/aqpb_config.php');
require_once(AQPB_PATH . 'functions/aqpb_functions.php');
require_once(AQPB_PATH . 'classes/class-aq-page-builder.php');
require_once(AQPB_PATH . 'classes/class-aq-block.php');


//some default blocks
require_once(AQPB_PATH . 'blocks/aq-text-block.php');
require_once(AQPB_PATH . 'blocks/aq-column-block.php');
require_once(AQPB_PATH . 'blocks/aq-clear-block.php');
require_once(AQPB_PATH . 'blocks/aq-widgets-block.php');

//register default blocks
aq_register_block('AQ_Text_Block');
aq_register_block('AQ_Column_Block');
aq_register_block('AQ_Clear_Block');
aq_register_block('AQ_Widgets_Block');

//custom action hook
add_action('init', 'aq_page_builder_init');
function aq_page_builder_init() {
	do_action('aq_page_builder_init');
}

//fire up page builder
$aqpb_config = aq_page_builder_config();
$aq_page_builder = new AQ_Page_Builder($aqpb_config);
$aq_page_builder->init();