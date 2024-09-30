<?php
class RNA_Domain_Checker_API {
    public static function check_domain($domain) {
        $authorization = get_option('rna_domain_checker_authorization');
        $url = 'https://api.rna.id/api/v1/domains/availability?domain=' . $domain;

        $response = wp_remote_get($url, array(
            'headers' => array(
                'Authorization' => $authorization
            )
        ));

        if (is_wp_error($response)) {
            return array('error' => 'API request failed');
        }

        return json_decode(wp_remote_retrieve_body($response), true);
    }
}
