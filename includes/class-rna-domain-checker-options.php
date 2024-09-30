<?php
class RNA_Domain_Checker_Options {
    public static function init() {
        add_options_page(
            'RNA Domain Checker',
            'RNA Domain Checker',
            'manage_options',
            'rna-domain-checker',
            array('RNA_Domain_Checker_Options', 'options_page')
        );
        add_action('admin_init', array('RNA_Domain_Checker_Options', 'register_settings'));
    }

    public static function register_settings() {
        register_setting('rna_domain_checker_group', 'rna_domain_checker_authorization');
    }

    public static function options_page() {
        ?>
        <div class="wrap">
            <h1>RNA Domain Checker Settings</h1>
            <form method="post" action="options.php">
                <?php
                settings_fields('rna_domain_checker_group');
                do_settings_sections('rna_domain_checker_group');
                ?>
                <table class="form-table">
                    <tr valign="top">
                        <th scope="row">Authorization Key</th>
                        <td><input type="text" name="rna_domain_checker_authorization" value="<?php echo esc_attr(get_option('rna_domain_checker_authorization')); ?>" /></td>
                    </tr>
                </table>
                <?php submit_button(); ?>
            </form>
        </div>
        <?php
    }
}
