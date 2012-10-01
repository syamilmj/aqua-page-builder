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
			<label for="<?php echo $block_id ?>_title">
				Title (optional)
				<input type="text" class="input-full" id="<?php echo $block_id ?>_title" value="<?php echo $title ?>" name="<?php echo $block_saving_id ?>[title]">
			</label>
		</p>
		
		<p class="description">
			<label for="<?php echo $block_id ?>_text">
				Content
				<textarea id="<?php echo $block_id ?>_text" class="textarea-full" name="<?php echo $block_saving_id ?>[text]" rows="5"><?php echo $text ?></textarea>
			</label>
		</p>
		<?php
	}
	
}