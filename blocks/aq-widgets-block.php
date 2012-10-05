<?php
/* Registered Sidebars Blocks */
class AQ_Widgets_Block extends AQ_Block {
	
	function __construct() {
		$block_options = array(
			'name' => 'Widgets',
			'size' => 'span4',
		);
		
		parent::__construct('AQ_Widgets_Block', $block_options);
	}
	
	function form($instance) {
		
		
		//get all registered sidebars
		global $wp_registered_sidebars;
		$sidebar_options = array(); $default_sidebar = '';
		foreach ($wp_registered_sidebars as $registered_sidebar) {
			$default_sidebar = empty($default_sidebar) ? $registered_sidebar['id'] : $default_sidebar;
			$sidebar_options[$registered_sidebar['id']] = $registered_sidebar['name'];
		}
		
		$defaults = array(
			'sidebar' => $default_sidebar,
		);
		$instance = wp_parse_args($instance, $defaults);
		extract($instance);
		
		?>
		<p class="description half">
			<label for="<?php echo $block_id ?>_title">
				Title (optional)<br/>
				<?php echo aq_field_input('title', $block_id, $title, $size = 'full') ?>
			</label>
		</p>
		<p class="description half last">
			<label for="">
				Choose widget area<br/>
				<?php echo aq_field_select('sidebar', $block_id, $sidebar_options, $sidebar); ?>
			</label>
		</p>
		<?php
	}
	
	function block($instance) {
		extract($instance);
		dynamic_sidebar($sidebar);
	}
	
}