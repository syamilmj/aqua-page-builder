<?php
/**
 * @legacy
 * AQ_Plugin_Updater Class
 *
 * Request for any later version of the plugin available
 * on Github. Downloads it if user chose to update
 *
 * @author Syamil MJ <http://aquagraphite.com>
 */

// Take over the update check
if(!class_exists('AQ_Plugin_Updater')) {
	class AQ_Plugin_Updater {	
		function __construct($config = array()) {
			
			$defaults = array(
				'api_url'	=> 'http://aquagraphite.com/api/',
				'slug'		=> '',
				'filename'	=> ''
			);
			
			$this->args = wp_parse_args($config, $defaults);
			
			if(empty($this->args['slug']) || empty($this->args['filename'])) return false;
			
			//hook filters
			add_filter('pre_set_site_transient_update_plugins', array($this, 'check_update'));
			add_filter('plugins_api', array($this, 'plugin_api_call'), 10, 3);
			add_filter('upgrader_post_install', array($this, 'upgrader_post_install'), 10, 3 );
			
		}
		
		function check_update($checked_data) {
			global $wp_version;
			
			if (empty($checked_data->checked)) {
				return $checked_data;//Comment out this line during testing.
			}
			
			$args = array(
				'slug' => $this->args['slug'],
				'version' => $checked_data->checked[$this->args['slug'] .'/'. $this->args['filename']],
			);
			
			$request_string = array(
					'body' => array(
						'action' => 'basic_check', 
						'request' => json_encode($args),
						'site-url' => site_url()
					),
					'user-agent' => 'WordPress/' . $wp_version . '; ' . site_url(),
					'timeout' => 30,
					'redirection' => 0
			);
			
			// Start checking for an update
			$raw_response = wp_remote_post($this->args['api_url'], $request_string);
			
			// Process update data
			if (!is_wp_error($raw_response) && ($raw_response['response']['code'] == 200))
				$response = json_decode($raw_response['body']);
			
			// Feed the update data into WP updater
			if (isset($response) && is_object($response) && !empty($response))
				$checked_data->response[$this->args['slug'] .'/'. $this->args['filename']] = $response;
				
			return $checked_data;
		}
	
		/**
		 * API Call
		 *
		 * Handles the Plugin API Call
		 */
		function plugin_api_call($defaults, $action, $args) {
			global $wp_version;
			
			if (!isset($args->slug) || $args->slug != $this->args['slug'])
				return false;
			
			// Get the current version
			$plugin_info = get_site_transient('update_plugins');
			$current_version = $plugin_info->checked[$this->args['slug'] .'/'.  $this->args['filename']];
			$args->version = $current_version;
			
			$request_string = array(
					'body' => array(
						'action' => $action, 
						'request' => json_encode($args),
						'site-url' => site_url()
					),
					'user-agent' => 'WordPress/' . $wp_version . '; ' . site_url(),
					'timeout' => 30,
					'redirection' => 0
			);
			
			$request = wp_remote_post($this->args['api_url'], $request_string);
			
			if (is_wp_error($request)) {
				$result = new WP_Error('plugins_api_failed', __('An Unexpected HTTP Error occurred during the API request.</p> <p><a href="?" onclick="document.location.reload(); return false;">Try again</a>', 'framework'), $request->get_error_message());
			} else {
				$result = unserialize($request['body']);
				if ($result === false) {
					$result = new WP_Error('plugins_api_failed', __('An unknown error occurred'), $request['body']);
				}
			}
			return $result;
		}
	
		/**
		 * Hook that move, rename & install the unzipped plugin
		 */
		function upgrader_post_install( $true, $hook_extra, $result ) {
			global $wp_filesystem;
			
			if( isset($hook_extra['plugin']) && stristr($hook_extra['plugin'], $this->args['slug']) ) {
			
				echo '<p>' . __('Correcting plugin folder name & activating plugin...', 'framework') .'</p>';
				
				// Move & Activate
				$proper_destination = WP_PLUGIN_DIR.'/'.$this->args['slug'] .'/';
				$wp_filesystem->move( $result['destination'], $proper_destination );
				$result['destination'] = $proper_destination;
				$activate = activate_plugin( $proper_destination .$this->args['filename'] );
		
				// Output the update message
				$fail		= __('The plugin has been updated, but could not be reactivated. Please reactivate it manually.', 'framework');
				$success	= __('Plugin reactivated successfully.', 'framework');
				echo is_wp_error( $activate ) ? $fail : $success;
			
			}
			
			return $result;
		
		}
	}
}