<?php
/** 
 * Builder Page
 *
 * @description Main admin UI settings page
 * @package Aqua Page Builder
 *
 */
 
// Debugging
if(isset($_POST) && $this->args['debug'] == true) {
	echo '<pre>';
	print_r($_POST);
	echo '</pre>';
}

// Permissions Check
if ( ! current_user_can('edit_theme_options') )
	wp_die( __( 'Cheatin&#8217; uh?' ) );
	
$messages = array();

// Get selected template id
$selected_template_id = isset($_REQUEST['template']) ? (int) $_REQUEST['template'] : 0;

// Actions
$action = isset($_REQUEST['action']) ? $_REQUEST['action'] : 'edit';
$template = isset($_REQUEST['template']) ? $_REQUEST['template'] : 0;

// DEBUG
//echo '<pre>';
//print_r($_POST);
//echo '</pre>';

// Template title & layout
$template_name = isset($_REQUEST['template-name']) && !empty($_REQUEST['template-name']) ? htmlspecialchars($_REQUEST['template-name']) : 'No Title';

// Get all templates
$templates = $this->get_templates();

// Get recently edited template
$recently_edited_template = (int) get_user_option( 'recently_edited_template' );

if( ! isset( $_REQUEST['template'] ) && $recently_edited_template && $this->is_template( $recently_edited_template )) {
	$selected_template_id = $recently_edited_template;
} elseif ( ! isset( $_REQUEST['template'] ) && $selected_template_id == 0 && !empty($templates)) {
	$selected_template_id = $templates[0]->ID;
}

//define selected template object
$selected_template_object = get_post($selected_template_id);

// saving action
switch($action) {

	case 'create' :
		
		$new_id = $this->create_template($template_name);
		
		if(!is_wp_error($new_id)) {
			$selected_template_id = $new_id;
		
			//refresh templates var
			$templates = $this->get_templates();
			$selected_template_object = get_post($selected_template_id);
			
			$messages[] = '<div id="message" class="updated"><p>' . __('The ', 'aqpb-l10n') . '<strong>' . $template_name . '</strong>' . __(' page template has been successfully created', 'aqpb-l10n') . '</p></div>';
		} else {
			$errors = '<ul>';
			foreach( $new_id->get_error_messages() as $error ) {
				$errors .= '<li><strong>'. $error . '</strong></li>';
			}
			$errors .= '</ul>';
			
			$messages[] = '<div id="message" class="error"><p>' . __('Sorry, the operation was unsuccessful for the following reason(s): ', 'aqpb-l10n') . '</p>' . $errors . '</div>';
		}
		
		break;
        
	case 'clone' :
		
		$new_id = $this->clone_template( $selected_template_id );
		
		if(!is_wp_error($new_id)) {
			$selected_template_id = $new_id;
		
			//refresh templates var
			$templates = $this->get_templates();
			$selected_template_object = get_post($selected_template_id);
			
			$messages[] = '<div id="message" class="updated"><p>' . __('The ', 'aqpb-l10n') . '<strong>' . $template_name . '</strong>' . __(' template has been successfully cloned', 'aqpb-l10n') . '</p></div>';
		} else {
			$errors = '<ul>';
			foreach( $new_id->get_error_messages() as $error ) {
				$errors .= '<li><strong>'. $error . '</strong></li>';
			}
			$errors .= '</ul>';
			
			$messages[] = '<div id="message" class="error"><p>' . __('Sorry, the operation was unsuccessful for the following reason(s): ', 'aqpb-l10n') . '</p>' . $errors . '</div>';
		}
		
		break;
        
	case 'update' :
	
		$blocks = isset($_REQUEST['aq_blocks']) ? $_REQUEST['aq_blocks'] : '';
		
		$this->update_template($selected_template_id, $blocks, $template_name);
		
		//refresh templates var
		$templates = $this->get_templates();
		$selected_template_object = get_post($selected_template_id);
		
		$messages[] = '<div id="message" class="updated"><p>' . __('The ', 'aqpb-l10n') . '<strong>' . $template_name . '</strong>' . __(' page template has been updated', 'aqpb-l10n') . '</p></div>';
		break;
		
	case 'delete' :
		
		$this->delete_template($selected_template_id);
		
		//refresh templates var
		$templates = $this->get_templates();
		$selected_template_id =	!empty($templates) ? $templates[0]->ID : 0;
		$selected_template_object = get_post($selected_template_id);
		
		$messages[] = '<div id="message" class="updated"><p>' . __('The template has been successfully deleted', 'aqpb-l10n') . '</p></div>';
		break;
}

global $current_user;
update_user_option($current_user->ID, 'recently_edited_template', $selected_template_id);

//display admin notices & messages
if(!empty($messages)) foreach($messages as $message) { echo $message; }

//disable blocks archive if no template
$disabled = $selected_template_id === 0 ? 'metabox-holder-disabled' : '';

?>

<div class="wrap">
	<div id="icon-themes" class="icon32"><br/></div>
	<h2><?php echo $this->args['page_title'] ?></h2>

	<div id="manage-templates" class="manage-templates">

		<?php if($templates) { ?>
			
			<form method="get" action="<?php echo admin_url('themes.php') ?>" >

				<input type="hidden" name="page" value="<?php echo $this->args['page_slug'] ?>">
				<input type="hidden" name="action" value="edit">

				<label for="template">
					<?php _e('Select a template to edit:', 'aqpb-l10n') ?> 

					<select name="template" id="">
						
						<?php if($selected_template_id === 0) { ?>
							<option value="0" selected="selected"><?php _e('-- Select --', 'aqpb-l10n') ?></option>
						<?php } ?>

						<?php
						foreach ( (array) $templates as $template ) {
							$selected = selected( $selected_template_id, $template->ID, false );

							echo '<option value="'. $template->ID .'" '. $selected .'>'. htmlspecialchars($template->post_title) .'</option>';
						}
						?>
					</select>

				</label>

				<span class="submit-btn">
					<input type="submit" class="button-secondary" value="select">
				</span>
				
				<span class="add-new-template-action">
					<?php _e('or', 'aqpb-l10n') ?>
					
					<a href="
					<?php 
					echo esc_url(add_query_arg(
						array(
							'page' => $this->args['page_slug'], 
							'action' => 'edit',
							'template' => 0,
						),
						admin_url( 'themes.php' )
					));
					?>
					"><?php _e('create a new template', 'aqpb-l10n') ?></a>
				</span>
				
			</form>

		<?php } else { ?>
			<?php _e('Create your new template below', 'aqpb-l10n') ?>
		<?php } ?>

	</div>
	
	<div id="page-builder-frame">
	
		<div id="page-builder-column" class="metabox-holder <?php echo $disabled ?>">
			<div id="page-builder-archive" class="postbox">
				<h3 class="hndle"><span><?php _e('Available Blocks', 'aqpb-l10n') ?></span><span id="removing-block"><?php _e('Deleting', 'aqpb-l10n') ?></span></h3>
				<div class="inside">
					<ul id="blocks-archive" class="cf">
						<?php $this->blocks_archive() ?>
					</ul>
				</div>
			</div>
		</div><!-- END #page-builder-column -->
	
		<div id="page-builder-fixed">

			<div id="page-builder">
				
				<div class="aqpb-wrap aqpbdiv">

					<form id="update-page-template" action="<?php echo $this->args['page_url'] ?>" method="post" enctype="multipart/form-data">

						<div id="aqpb-header">
							
								<div id="submitpost" class="submitbox">
									<div class="major-publishing-actions cf">
									
										<label class="open-label howto" for="template-name">
											<span><?php _e('Template Name', 'aqpb-l10n') ?></span>
											<input name="template-name" id="template-name" type="text" class="template-name regular-text" title="Enter template name here" placeholder="<?php _e('Enter template name here', 'aqpb-l10n') ?>" value="<?php echo is_object($selected_template_object) ? $selected_template_object->post_title : ''; ?>">
										</label>
										
										<?php if($selected_template_id !== 0) { ?>
											<div id="template-shortcode">
												<input type="text" readonly="readonly" value='[template id="<?php echo $selected_template_id ?>"]' onclick="select()"/>
											</div>
										<?php } ?>
										
										<div class="publishing-action">
											<?php submit_button( empty( $selected_template_id ) ? __( 'Create Template', 'aqpb-l10n' ) : __( 'Save Template', 'aqpb-l10n' ), 'button-primary ', 'save_template', false, array( 'id' => 'save_template_header' ) ); ?>
										</div><!-- END .publishing-action -->
										
									</div><!-- END .major-publishing-actions -->
								</div><!-- END #submitpost .submitbox -->
								
								<?php 
								if($selected_template_id === 0) {
									wp_nonce_field( 'create-template', 'create-template-nonce' ); 
								} else {
									wp_nonce_field( 'update-template', 'update-template-nonce' );
								}
								?>	
								<input type="hidden" name="action" value="<?php echo empty( $selected_template_id ) ? 'create' : 'update' ?>"/>
								<input type="hidden" name="template" id="template" value="<?php echo $selected_template_id ?>"/>
								<input type="hidden" id="aqpb-nonce" name="aqpb-nonce" value="<?php echo wp_create_nonce('aqpb-settings-page-nonce') ?>"/>
							
						</div>
						
						<div id="aqpb-body">
							
							<ul class="blocks cf" id="blocks-to-edit">
								<?php 
								if($selected_template_id === 0) {
									echo '<p class="empty-template">';
									echo __('To create a custom page template, give it a name above and click Create Template. Then choose blocks like text, widgets or tabs &amp; toggles from the left column to add to this template.
									<br/><br/>
									You can drag and drop the blocks to put them in the order you want. Click on the small arrow at the corner of each block to reveal additional configuration options. You can also resize each block by clicking on either side of the block (Note that some blocks are not resizable)
									<br/><br/>
									When you have finished building your custom page template, make sure you click the Save Template button.', 'aqpb-l10n');
									echo '</p>';
									
									
								} else {
									$this->display_blocks($selected_template_id); 
								}
								?>
							</ul>
							
						</div><!-- END #aqpb-body -->
						
						<div id="aqpb-footer">

							<div class="major-publishing-actions cf">

								<?php if(!empty($selected_template_id)) { ?>
								<div class="delete-action">
									<?php 
									echo '<a class="submitdelete deletion template-delete" href="' . esc_url(add_query_arg(
										array(
											'page' => $this->args['page_slug'], 
											'action' => 'delete',
											'template' => $selected_template_id,
											'_wpnonce' => wp_create_nonce('delete-template'),
										),
										admin_url( 'themes.php' )
									)) . '">'. __('Delete Template', 'aqpb-l10n') .'</a>';
									?>
								</div><!-- END .delete-action -->
                                
                                <div class="clone-action">
                                    <?php 
                                    echo '<a class="submitclone cloning template-clone" href="' . esc_url(add_query_arg(
                                        array(
                                            'page' => $this->args['page_slug'], 
                                            'action' => 'clone',
                                            'template' => $selected_template_id,
                                            'template-name' => is_object($selected_template_object) ? urlencode($selected_template_object->post_title) : '',
                                            '_wpnonce' => wp_create_nonce('clone-template'),
                                        ),
                                        admin_url( 'themes.php' )
                                    )) . '">'. __('Clone Template', 'aqpb-l10n') .'</a>';
                                    ?>
                                </div><!-- END .clone-action -->
                                
								<?php } ?>

								<div class="publishing-action">
									<?php if(!empty($selected_template_id)) {
										submit_button( __( 'Save Template' ), 'button-primary ', 'save_template', false, array( 'id' => 'save_template_footer' ) ); 
									} ?>
								</div><!-- END .publishing-action -->
							</div><!-- END .major-publishing-actions -->

						</div><!-- END #aqpb-footer -->
					
					</form>	

				</div>

			</div>

			<p style="float:left"><small>Aqua Page Builder &copy; <?php echo date("Y") ?> by <a href="http://aquagraphite.com">Syamil MJ</a></small></p>
			<p style="float:right"><small>Version <?php echo AQPB_VERSION ?></small></p>
			
		</div>
		
		
	</div>
</div>
