<h2>Edit Huddle API Key</h2>
<form method="post" action="options.php">
    <?php settings_fields('edithuddle_options'); ?>
    <table class="form-table">
        <tr valign="top">
            <th scope="row">API Key</th>
            <td>
                <input type="text" name="edit_huddle_api_key" value="<?php echo get_option('edit_huddle_api_key'); ?>" />
            </td>
        </tr>
    </table>
    <p class="submit">
    <input type="submit" class="button-primary" value="<?php _e('Save Changes') ?>" />
    </p>
</form>