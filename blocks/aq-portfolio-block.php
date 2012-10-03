<?php
/** A simple text block **/
class AQ_Portfolio_Block extends AQ_Block {
	
	//set and create block
	function __construct() {
		$block_options = array(
			'name' => 'Portfolio',
			'size' => 'span12',
		);
		
		//create the block
		parent::__construct('aq_portfolio_block', $block_options);
	}
	
	function form($instance) {
		
		$defaults = array(
			'columns' => 'four',
			'filter' => 'true', // show/disable filter
			'types'	=> '',
		);
		$instance = wp_parse_args($instance, $defaults);
		extract($instance);
		
		$columns_options = array(
			'one' => 'Single',
			'two' => 'Two Columns',
			'three' => 'Three Columns',
			'four' => 'Four Columns',
		);
		//todo image as checkbox
		
		//$types = ''; //get all portfolio 'type' taxonomy terms
		?>
		<p class="description">
			<label for="<?php echo $this->get_field_id('title') ?>">
				Title (optional)<br/>
				<input id="<?php echo $this->get_field_id('title') ?>" class="input-full" type="text" value="<?php echo $title ?>" name="<?php echo $this->get_field_name('title') ?>">
			</label>
		</p>
		<p class="description half">
			<label for="<?php echo $this->get_field_id('columns') ?>">
				Number of Columns<br/>
				<?php echo aq_field_select($columns_options, $columns, $block_id, 'columns'); ?>
			</label>
		</p>
		<p class="description half last">
			<label for="<?php echo $this->get_field_id('types') ?>">
				Portfolio Categories<br/>
				<input id="<?php echo $this->get_field_id('types') ?>" type="text" class="input-full" value="<?php echo $types ?>" name="<?php echo $this->get_field_name('types') ?>">
			</label>
		</p>
		<?php
	}
	
	function block($instance) {
	
	}
	
}