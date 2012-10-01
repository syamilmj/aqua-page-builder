<?php
/** A simple text block **/
class AQ_Text_Block extends AQ_Block {
	
	//set and create block
	function __construct() {
		$block_options = array(
			'name' => 'Text',
			'size' => 'span6',
		);
		
		//create the block
		parent::__construct('aq_text_block', $block_options);
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
	
	function block($instance) {
	
	}
	
}