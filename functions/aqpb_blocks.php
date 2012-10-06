<?php
/**
 * Page Builder Blocks
 * @desc Contains block elements to be inserted into custom page templates
 * @since 1.0.0
 * @todo add tooltip to explain option (hover on ? icon)
 */
 
// Text Block
function aq_block_text($block) {
	extract( $block, EXTR_OVERWRITE );
	
	$block_id = 'aq_block_' . $number;
	$block_saving_id = 'aq_blocks[aq_block_'.$number.']';
	
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

//slogan
function aq_block_slogan($block) {
	extract( $block, EXTR_OVERWRITE );
	$block_id = 'aq_block_' . $number;
	$block_saving_id = 'aq_blocks[aq_block_'.$number.']';
	
	?>
	<p class="description">
		<label for="<?php echo $block_id ?>_title">
			Title (optional)<br/>
			<input type="text" class="input-full" id="<?php echo $block_id ?>_title" value="<?php echo $title ?>" name="<?php echo $block_saving_id ?>[title]">
		</label>
	</p>
	<p class="description">
		<label for="<?php echo $block_id ?>_text">
			Enter your text slogan below
			<textarea id="<?php echo $block_id ?>_text" class="textarea-full" name="<?php echo $block_saving_id ?>[text]" rows="5"><?php echo $text ?></textarea>
		</label>
	</p>
	<?php
}

// Slider
function aq_block_slider($block) {
	extract( $block, EXTR_OVERWRITE );
	$block_id = 'aq_block_' . $number;
	$block_saving_id = 'aq_blocks[aq_block_'.$number.']';
	
	?>
	<p class="description">
		<label for="<?php echo $block_id ?>_title">
			Title (optional)<br/>
			<input type="text" class="input-full" id="<?php echo $block_id ?>_title" value="<?php echo $title ?>" name="<?php echo $block_saving_id ?>[title]">
		</label>
	</p>
	<p class="description">
		<label for="<?php echo $block_id ?>_slide">
		<?php 
		$args = array (
			'nopaging' => true,
			'post_type' => 'slider',
			'status' => 'publish',
		);
		$slides = get_posts($args);
		
		echo '<select id="'.$block_id.'" class="select" name="'.$block_saving_id.'[slide]">';
			echo '<option>Choose a slider</option>';
			foreach($slides as $slide) {
				echo '<option value="'.$slide->ID.'">'.htmlspecialchars($slide->post_title).'</option>';
			}
		echo '</select>';
		?>
		</label>
	</p>
	<p class="description description-float">
		<label for="<?php echo $block_id ?>_speed">
			Slider Speed<br/>
			<input type="text" class="input-small" id="<?php echo $block_id ?>_speed" value="<?php echo $speed ?>" name="<?php echo $block_saving_id ?>[speed]">
		</label>
	</p>
	<p class="description description-float">
		<label for="<?php echo $block_id ?>_transition">
			Slider Speed<br/>
			<input type="text" class="input-small" id="<?php echo $block_id ?>_speed" value="<?php echo $speed ?>" name="<?php echo $block_saving_id ?>[speed]">
		</label>
	</p>
	<?php
}

// Google Map
function aq_block_googlemap($block) {
	extract( $block, EXTR_OVERWRITE );
	$block_id = 'aq_block_' . $number;
	$block_saving_id = 'aq_blocks[aq_block_'.$number.']';
	
	?>
	
	<p class="description half">
		<label for="<?php echo $block_id ?>_title">
			Title (optional)<br/>
			<input type="text" class="input-full" id="<?php echo $block_id ?>_title" value="<?php echo $title ?>" name="<?php echo $block_saving_id ?>[title]">
		</label>
	</p>
	<p class="description half last">
		<label for="<?php echo $block_id ?>_address">
			Address<br/>
			<input type="text" class="input-full" id="<?php echo $block_id ?>_address" value="<?php echo $address ?>" name="<?php echo $block_saving_id ?>[address]">
		</label>
	</p>
	<p class="description two-third">
		<label for="<?php echo $block_id ?>_coordinates">
			Coordinates (optional) e.g. "3.82497,103.32390"<br/>
			<input type="text" class="input-full" id="<?php echo $block_id ?>_coordinates" value="<?php echo $coordinates ?>" name="<?php echo $block_saving_id ?>[coordinates]">
		</label>
	</p>
	<p class="description third last">
		<label for="<?php echo $block_id ?>_height">
			Map height, in pixels.<br/>
			<input type="number" class="input-min" id="<?php echo $block_id ?>_height" value="<?php echo $height ?>" name="<?php echo $block_saving_id ?>[height]"> &nbsp; px
		</label>
	</p>
	
	<?php
}

// Portfolio
function aq_block_portfolio($block) {
	extract( $block, EXTR_OVERWRITE );
	$block_id = 'aq_block_' . $number;
	$block_saving_id = 'aq_blocks['.$block_id.']';
	
	$columns_options = array(
		'one' => 'Single',
		'two' => 'Two Columns',
		'three' => 'Three Columns',
		'four' => 'Four Columns',
	);
	//todo image as checkbox
	
	$types = ''; //get all portfolio 'type' taxonomy terms
	?>
	<p class="description">
		<label for="<?php echo $block_id ?>_title">
			Title (optional)<br/>
			<input type="text" class="input-full" id="<?php echo $block_id ?>_title" value="<?php echo $title ?>" name="<?php echo $block_saving_id ?>[title]">
		</label>
	</p>
	<p class="description">
		<label for="">
			Number of Columns<br/>
			<?php echo aqpb_select($columns_options, $columns, $block_id, 'columns'); ?>
		</label>
	</p>
	<?php
}

function aq_block_featured_portfolio($block) {
	extract( $block, EXTR_OVERWRITE );
	$block_id = 'aq_block_' . $number;
	$block_saving_id = 'aq_blocks[aq_block_'.$number.']';
	
	?>
	<p class="description">
		<label for="<?php echo $block_id ?>_title">
			Title (optional)<br/>
			<input type="text" class="input-full" id="<?php echo $block_id ?>_title" value="<?php echo $title ?>" name="<?php echo $block_saving_id ?>[title]">
		</label>
	</p>
	<p class="description">
		<label for="<?php echo $block_id ?>_items">
			Maximum number of items<br/>
			<input type="number" class="input-min" id="<?php echo $block_id ?>_items" value="<?php echo $items ?>" name="<?php echo $block_saving_id ?>[items]">
		</label>
	</p>
	<?php
	
}

function aq_block_widgets($block) {
	extract( $block, EXTR_OVERWRITE );
	$block_id = 'aq_block_' . $number;
	$block_saving_id = 'aq_blocks[aq_block_'.$number.']';

	//get all registered sidebars
	global $wp_registered_sidebars;
	$sidebar_options = array();
	foreach ($wp_registered_sidebars as $registered_sidebar) {
		$sidebar_options[$registered_sidebar['id']] = $registered_sidebar['name'];
	}
	
	?>
	<p class="description half">
		<label for="<?php echo $block_id ?>_title">
			Title (optional)<br/>
			<input type="text" class="input-full" id="<?php echo $block_id ?>_title" value="<?php echo $title ?>" name="<?php echo $block_saving_id ?>[title]">
		</label>
	</p>
	<p class="description half last">
		<label for="">
			Choose sidebar/widget area<br/>
			<?php echo aqpb_select($sidebar_options, $sidebar, $block_id, 'sidebar'); ?>
		</label>
	</p>
	<?php
	
}

function aq_block_column($block) {
	echo '<p class="empty-column">',
	__('Drag block items into this box', 'framework'),
	'</p>';
	echo '<ul class="blocks column-blocks cf"></ul>';
}

function aq_block_clear($block) {
	echo '<p class="description">';
	echo 'This block has no editable attributes. You can use it to clear the floats between two or more separate blocks vertically.';
	echo '</p>';
}


/**
 * Ajax drag n drop slider handler
 *
 * This can be served as an example how you can provide custom
 * ajax handler and use in the blocks
 *
 * Also see the aqpb_config on adding extra js
 */
function aq_ajax_slider_handler() {

}

function aq_ajax_slider_display() {

} 














?>