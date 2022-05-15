<?php
// Initialize the plugin
add_action("wpcf7_init", "wpcf7mc_init");

function wpcf7mc_init() {
    wpcf7_add_form_tag(array("wpcf7mc", "wpcf7mc*"), "wpcf7mc_form_tag_handler");
}

// Create form tag
function wpcf7mc_form_tag_handler($tag) {
    $tag->type = "wpcf7mc*";
    $tag->basetype = "wpcf7mc";
    $tag->raw_name = $tag->basetype;
    $tag->name = $tag->raw_name;

    $validation_error = wpcf7_get_validation_error($tag->name);

    $class = wpcf7_form_controls_class($tag->type);

    if ($validation_error) {
        $class .= " wpcf7-not-valid";
    }

    // Input
    $input_attrs = array();

    $input_attrs["class"] = $tag->get_class_option($class);
    $input_attrs["id"] = $tag->name . "-input";
    $input_attrs["type"] = "text";
    $input_attrs["name"] = $tag->name;
    $input_attrs["inputmode"] = "numeric";
    $input_attrs["tabindex"] = $tag->get_option("tabindex", "signed_int", true);
    $input_attrs["aria-required"] = "true";

    if ($validation_error) {
        $input_attrs["aria-invalid"] = "true";
        $input_attrs["aria-describedby"] = wpcf7_get_validation_error_reference($tag->name);
    } else {
        $input_attrs["aria-invalid"] = "false";
    }

    $input_attrs = wpcf7_format_atts($input_attrs);

    // Label
    $label_attrs = array();

    $label_attrs["id"] = $tag->name . "-label";
    $label_attrs["for"] = $tag->name . "-input";

    $label_attrs = wpcf7_format_atts($label_attrs);

    // Loader
    $loader_attrs = array();

    $loader_attrs["id"] = $tag->name . "-loader";
    $loader_attrs["class"] = "spinner";
    $loader_attrs["aria-busy"] = "true";
    $loader_attrs["aria-live"] = "polite";

    $loader_attrs = wpcf7_format_atts($loader_attrs);

    // Hidden inputs
    $hidden_inputs_attrs = array();

    for ($digit = 0; $digit < 2; $digit++) {
        $hidden_input_attrs = array();

        $hidden_input_attrs["type"] = "hidden";
        $hidden_input_attrs["name"] = "_wpcf7mc_digit_" . $digit;

        $hidden_input_attrs = wpcf7_format_atts($hidden_input_attrs);

        $hidden_inputs_attrs[$digit] = $hidden_input_attrs;
    }

    // Generate HTML
    $html = sprintf(
        '<span class="wpcf7-form-control-wrap %1$s"><label %2$s></label><input %3$s /><span %4$s></span><input %5$s></input><input %6$s></input>%7$s</span>',
        sanitize_html_class($tag->name), $label_attrs, $input_attrs, $loader_attrs, $hidden_inputs_attrs[0], $hidden_inputs_attrs[1], $validation_error
    );

    return $html;
}
