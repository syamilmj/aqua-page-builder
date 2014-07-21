<?php
/** A simple rich textarea block **/
class AQ_Editor_Block extends AQ_Block {
	
	//set and create block
	function __construct() {
		$block_options = array(
			'name' => __('Visual Editor', 'aqpb-l10n'),
			'size' => 'span6',
            'icon' => 'fa-file-text',
		);
		
		//create the block
		parent::__construct('aq_editor_block', $block_options);
	}
	
	function form($instance) {
		
		$defaults = array(
			'text' => ''
		);
		$instance = wp_parse_args($instance, $defaults);
		extract($instance);
		
		?>
		<p class="description">
			<label for="<?php echo $this->get_field_id('title') ?>">
				Title (optional)
				<?php echo aq_field_input('title', $block_id, $title, $size = 'full') ?>
			</label>
		</p>
		
		<p class="description">
			<label for="<?php echo $this->get_field_id('text') ?>">
				Content
				<?php 
				$args = array (
				    'tinymce'       => true,
				    'quicktags'     => true,
				    'textarea_name' => $this->get_field_name('text')
				);
				wp_editor( htmlspecialchars_decode($text), $this->get_field_id('text'), $args );
				?>
			</label>
		</p>
		
		<?php
	}
	
	function block($instance) {
		extract($instance);
		
		//if($title) echo '<h4 class="aq-block-title">'.strip_tags($title).'</h4>';
		echo wpautop(do_shortcode(htmlspecialchars_decode($text)));
	}
	
}