<?
/**
 * @package edithuddle
 * @version 0.0.1
 */
/*
Plugin Name: Edit Huddle
Plugin URI: http://edithuddle.com/wordpress
Description: Plugin for edithuddle.com to recieve user feedback on blog content.
Author: Tim Barsness / Edit Huddle
Version: 0.0.1
Author URI: http://barsnesssolutions.com/
*/

function edithuddle_add_post_content($content) {
	if(!is_feed() && !is_home()) {
		$content .= '<script type="text/javascript" src="https://ajax.googleapis.com/ajax/libs/jquery/1.6.2/jquery.min.js"></script>
<script type="text/javascript"  src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.8.16/jquery-ui.min.js"></script>
<div class="edithuddle-button-container" content="'.urlencode($content).'"></div>';
	}
	return $content;
}
add_filter('the_content', 'edithuddle_add_post_content');


function edithuddle_enqueue_scripts() {
	wp_enqueue_script('fixit', '/wp-content/plugins/edithuddle/edithuddle.js', array('jquery-ui-button', 'jquery-ui-widget'));
	//wp_enqueue_script('fixit', 'http://tim.edithuddle.com/static/js/fixit.js', array('jquery-ui-button', 'jquery-ui-widget'));
    wp_enqueue_style('jquery-style', 'http://tim.edithuddle.com/static/jqueryui/css/custom-theme/jquery-ui-1.8.16.custom.css'); 
}
add_action('wp_enqueue_scripts', 'edithuddle_enqueue_scripts');

function edithuddle_init() {
	if(isset($_GET['edithuddle'])) {
		var_dump( edithuddle_current_page_url() ); 
		exit();
	}
}
add_action('init', 'edithuddle_init');


function edithuddle_current_page_url() {
	$pageURL = 'http';
	if ($_SERVER["HTTPS"] == "on") {
		$pageURL .= "s";
	}
	
	$pageURL .= "://";
	$pageURL .= $_SERVER["SERVER_NAME"];
	if ($_SERVER["SERVER_PORT"] != "80") {
		$pageURL .= ":".$_SERVER["SERVER_PORT"];
	}
	$pageURL .= $_SERVER["REQUEST_URI"];
	return $pageURL;
}