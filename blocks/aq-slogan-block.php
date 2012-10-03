<?php
/** A simple text block **/
class AQ_Slogan_Block extends AQ_Block {
	
	/* PHP5 constructor */
	function __construct() {
		
		$block_options = array(
			'type' => 'slogan',
			'name' => 'Slogan',
			'size' => 'span12',
		);
		
		//create the widget
		parent::__construct('AQ_Slogan_Block', $block_options);
		
	}
	
	function form($instance) {
		
		$defaults = array(
			'text' => '',
		);
		$instance = wp_parse_args($instance, $defaults);
		extract($instance);
		
		?>
		<p class="description">
			<label for="<?php echo $this->get_field_id('title') ?>">
				Title (optional)
				<input id="<?php echo $this->get_field_id('title') ?>" class="input-full" type="text" value="<?php echo $title ?>" name="<?php echo $this->get_field_name('title') ?>">
			</label>
		</p>
		
		<p class="description">
			<label for="<?php echo $this->get_field_id('text') ?>">
				Content
				<textarea id="<?php echo $this->get_field_id('text') ?>" class="textarea-full" name="<?php echo $this->get_field_name('text') ?>" rows="5"><?php echo $text ?></textarea>
			</label>
		</p>
		<?php
	}
	
}