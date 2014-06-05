<?php
/** A simple text block **/
class AQ_Text_Block extends AQ_Block {
	
	//set and create block
	function __construct() {
		$block_options = array(
			'name' => __( 'Text', 'aq-page-builder' ),
			'size' => 'span6',
		);
		
		//create the block
		parent::__construct( 'aq_text_block', $block_options );
	}
	
	function form( $instance ) {
		
		$defaults = array(
			'text' => '',
			'wp_autop' => 0
		);
		$instance = wp_parse_args( $instance, $defaults );
		extract( $instance );
		
		?>
		<p class="description">
			<label for="<?php echo $this->get_field_id( 'title' ); ?>">
				<?php _e( 'Title (optional)', 'aq-page-builder' ); ?>
				<?php echo aq_field_input( 'title', $block_id, $title, $size = 'full' ); ?>
			</label>
		</p>
		
		<p class="description">
			<label for="<?php echo $this->get_field_id( 'text' ); ?>">
				<?php _e( 'Content', 'aq-page-builder' ); ?>
				<?php echo aq_field_textarea( 'text', $block_id, $text, $size = 'full' ); ?>
			</label>
			<label for="<?php echo $this->get_field_id( 'wp_autop' ); ?>">
				<?php echo aq_field_checkbox( 'wp_autop', $block_id, $wp_autop ); ?>
				<?php _e( 'Do not create the paragraphs automatically. <code>"wpautop"</code> disable.', 'aq-page-builder' ); ?>
			</label>
	</p>
		
		<?php
	}
	
	function block( $instance ) {
		extract( $instance );

		$wp_autop = ( isset( $wp_autop ) ) ? $wp_autop : 0;
		
		if( $title ) echo '<h4 class="aq-block-title">' . strip_tags( $title ) . '</h4>';
		if( $wp_autop == 1 ) {
			echo do_shortcode( htmlspecialchars_decode( $text ) );
		}
		else
		{
			echo wpautop( do_shortcode( htmlspecialchars_decode( $text ) ) );
		}
		
	}
	
}
