<?php
/** Notifications block **/

if(!class_exists('AQ_Alert_Block')) {
	class AQ_Alert_Block extends AQ_Block {
		
		//set and create block
		function __construct() {
			$block_options = array(
				'name' => __( 'Alerts', 'aqpb' ),
				'size' => 'span6',
			);
			
			//create the block
			parent::__construct('aq_alert_block', $block_options);
		}
		
		function form($instance) {
			
			$defaults = array(
				'content' 	=> '',
				'type' 		=> 'note',
				'style' 	=> ''
			);
			$instance = wp_parse_args($instance, $defaults);
			extract($instance);
			
			$type_options = array(
				'default' 	=> __( 'Standard', 'aqpb' ),
				'info' 		=> __( 'Info', 'aqpb' ),
				'note' 		=> __( 'Notification', 'aqpb' ),
				'warn' 		=> __( 'Warning', 'aqpb' ),
				'tips' 		=> __( 'Tips', 'aqpb' )
			);
			
			?>
			
			<p class="description">
				<label for="<?php echo $this->get_field_id('title') ?>">
					<?php _e( 'Title (optional)', 'aqpb' );?><br/>
					<?php echo aq_field_input('title', $block_id, $title) ?>
				</label>
			</p>
			<p class="description">
				<label for="<?php echo $this->get_field_id('content') ?>">
					<?php _e( 'Alert Text (required)', 'aqpb' );?><br/>
					<?php echo aq_field_textarea('content', $block_id, $content) ?>
				</label>
			</p>
			<p class="description half">
				<label for="<?php echo $this->get_field_id('type') ?>">
					<?php _e( 'Alert Type', 'aqpb' );?><br/>
					<?php echo aq_field_select('type', $block_id, $type_options, $type) ?>
				</label>
			</p>
			<p class="description half last">
				<label for="<?php echo $this->get_field_id('style') ?>">
					<?php _e( 'Additional inline css styling (optional)', 'aqpb' );?><br/>
					<?php echo aq_field_input('style', $block_id, $style) ?>
				</label>
			</p>
			<?php
			
		}
		
		function block($instance) {
			extract($instance);
			
			echo '<div class="aq_alert '.$type.' cf" style="'. $style .'">' . do_shortcode(htmlspecialchars_decode($content)) . '</div>';
			
		}
		
	}
}