<?php
/** "Clear" block 
 * 
 * Clear the floats vertically
 * Optional to use horizontal lines/images
**/
class AQ_Clear_Block extends AQ_Block {
	
	//set and create block
	function __construct() {
		$block_options = array(
			'name' => 'Clear',
			'size' => 'span3',
		);
		
		//create the block
		parent::__construct('aq_clear_block', $block_options);
	}
	
	function form($instance) {
		
		$defaults = array(
			'horizontal_line' => 'none',
			'line_color' => '#353535',
			'pattern' => '1',
			'bottom_margin' => '40',
			'top_margin' => '40'
		);
		
		$line_options = array(
			'none' => 'None',
			'single' => 'Single',
			'double' => 'Double',
			'image' => 'Use Image',
		);
		
		$instance = wp_parse_args($instance, $defaults);
		extract($instance);
		
		$line_color = isset($line_color) ? $line_color : '#353535';
		
		?>
		<p class="description note">
			<?php _e('Use this block to clear the floats between two or more separate blocks vertically.', 'framework') ?>
		</p>
		<p class="description fourth">
			<label for="<?php echo $this->get_field_id('line_color') ?>">
				Pick a horizontal line<br/>
				<?php echo aq_field_select('horizontal_line', $block_id, $line_options, $horizontal_line, $block_id); ?>
			</label>
		</p>
		<div class="description fourth">
			<label for="<?php echo $this->get_field_id('bottom_margin') ?>">
				Bottom Margin (optional)<br/>
				<?php echo aq_field_input('bottom_margin', $block_id, $bottom_margin, 'min', 'number') ?> px
			</label>
		</div>
        <div class="description fourth">
			<label for="<?php echo $this->get_field_id('top_margin') ?>">
				Top Margin (optional)<br/>
				<?php echo aq_field_input('top_margin', $block_id, $top_margin, 'min', 'number') ?> px
			</label>
		</div>
		<div class="description fourth last" style="">
			<label for="<?php echo $this->get_field_id('line_color') ?>">
				Pick a line color<br/>
				<?php echo aq_field_color_picker('line_color', $block_id, $line_color, $defaults['line_color']) ?>
			</label>
			
		</div>
		<?php
		
	}
	
	function block($instance) {
		extract($instance);
		
		switch($horizontal_line) {
			case 'none':
				break;
			case 'single':
				echo '<hr class="aq-block-clear aq-block-hr-single" style="background:'.$line_color.'; margin-bottom:'.$bottom_margin.'px; margin-top:'.$top_margin.'px;"/>';
				break;
			case 'double':
				echo '<hr class="aq-block-clear aq-block-hr-double" style="background:'.$line_color.'; margin-bottom:'.$bottom_margin.'px; margin-top:'.$top_margin.'px;"/>';
				echo '<hr class="aq-block-clear aq-block-hr-single" style="background:'.$line_color.'; margin-bottom:'.$bottom_margin.'px; margin-top:'.$top_margin.'px;"/>';
				break;
			case 'image':
				echo '<hr class="aq-block-clear aq-block-hr-image cf" style="margin-bottom:'.$bottom_margin.'px; margin-top:'.$top_margin.'px;"/>';
				break;
		}
		
	}
	
}
