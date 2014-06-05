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
			'name' => __( 'Clear', 'aq-page-builder' ),
			'size' => 'span12',
		);
		
		//create the block
		parent::__construct( 'aq_clear_block', $block_options );
	}
	
	function form( $instance ) {
		
		$defaults = array(
			'horizontal_line' => 'none',
			'line_color' => '#353535',
			'pattern' => '1',
			'height' => ''
		);
		
		$line_options = array(
			'none' => __( 'None', 'aq-page-builder' ),
			'single' => __( 'Single', 'aq-page-builder' ),
			'double' => __( 'Double', 'aq-page-builder' ),
			'image' => __( 'Use Image', 'aq-page-builder' ),
		);
		
		$instance = wp_parse_args( $instance, $defaults );
		extract( $instance );
		
		$line_color = isset( $line_color ) ? $line_color : '#353535';
		
		?>
		<p class="description note">
			<?php _e( 'Use this block to clear the floats between two or more separate blocks vertically.', 'aq-page-builder' ); ?>
		</p>
		<p class="description fourth">
			<label for="<?php echo $this->get_field_id( 'line_color' ) ?>">
				<?php _e( 'Pick a horizontal line', 'aq-page-builder' ); ?><br/>
				<?php echo aq_field_select( 'horizontal_line', $block_id, $line_options, $horizontal_line, $block_id ); ?>
			</label>
		</p>
		<div class="description fourth">
			<label for="<?php echo $this->get_field_id( 'height' ) ?>">
				<?php _e(' Height (optional)', 'aq-page-builder' ); ?><br/>
				<?php echo aq_field_input( 'height', $block_id, $height, 'min', 'number' ) . __( 'px' ); ?>
			</label>
		</div>
		<div class="description half last">
			<label for="<?php echo $this->get_field_id( 'line_color' ) ?>">
				<?php _e( 'Pick a line color', 'aq-page-builder' ); ?><br/>
				<?php echo aq_field_color_picker( 'line_color', $block_id, $line_color, $defaults['line_color'] ); ?>
			</label>
			
		</div>
		<?php
		
	}
	
	function block( $instance ) {
		extract( $instance );
		
		switch( $horizontal_line ) {
			case 'none':
				break;
			case 'single':
				echo '<hr class="aq-block-clear aq-block-hr-single" style="background:' . $line_color . ';"/>';
				break;
			case 'double':
				echo '<hr class="aq-block-clear aq-block-hr-double" style="background:' . $line_color . ';"/>';
				echo '<hr class="aq-block-clear aq-block-hr-single" style="background:' . $line_color . ';"/>';
				break;
			case 'image':
				echo '<hr class="aq-block-clear aq-block-hr-image cf"/>';
				break;
		}
		
		if( $height ) {
			echo '<div class="cf" style="height:' . $height . 'px"></div>';
		}
		
	}
	
}