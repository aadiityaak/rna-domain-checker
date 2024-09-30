<?php
/**
 * Plugin Name: RNA Domain Checker
 * Description: Cek ketersediaan domain melalui API RNA.
 * Version: 1.0
 * Author: aadiityaak
 * Author URI: https://github.com/aadiityaak
 * Text Domain: rna-domain-checker
 */

if (!defined('ABSPATH')) {
    exit;
}

// Autoload classes
include_once plugin_dir_path(__FILE__) . 'includes/class-rna-domain-checker-api.php';
include_once plugin_dir_path(__FILE__) . 'includes/class-rna-domain-checker-options.php';

// Initialize Plugin
function rna_domain_checker_init() {
    RNA_Domain_Checker_Options::init();
}
add_action('admin_menu', 'rna_domain_checker_init');

// Enqueue React dan JS di Front-End
function rna_domain_checker_enqueue_frontend_scripts() {
    if (is_page() || is_single()) {
        wp_enqueue_script(
            'rna-domain-checker-react',
            plugin_dir_url(__FILE__) . 'assets/js/bundle.js', // Menggunakan bundle.js hasil dari Webpack
            array('wp-element'),
            null,
            true
        );
    }
    // Enqueue Tailwind CSS
    wp_enqueue_style(
        'rna-domain-checker-tailwind',
        plugin_dir_url(__FILE__) . 'assets/css/bundle.css'
    );
}
add_action('wp_enqueue_scripts', 'rna_domain_checker_enqueue_frontend_scripts');

add_action('rest_api_init', function () {
    register_rest_route('rna/v1', '/check-domain', array(
        'methods' => 'GET',
        'callback' => 'rna_check_domain_callback',
    ));
});

function rna_check_domain_callback(WP_REST_Request $request) {
    $domain = $request->get_param('domain');
    $result = RNA_Domain_Checker_API::check_domain($domain);
    return rest_ensure_response($result);
}


// Fungsi untuk menambahkan Shortcode
function rna_domain_checker_shortcode() {
    // Tambahkan div untuk React app
    return '<div id="rna-domain-checker"></div>';
}
add_shortcode('rna_domain_checker', 'rna_domain_checker_shortcode');

