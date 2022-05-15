<?php
add_filter("wpcf7_validate_wpcf7mc*", "wpcf7mc_validate", 11, 2);
add_filter("wpcf7_validate_wpcf7mc", "wpcf7mc_validate", 11, 2);

function wpcf7mc_validate($result, $tag) {
    $tag->name = "wpcf7mc";

    $answer = isset($_POST["wpcf7mc"]) ? trim($_POST["wpcf7mc"]) : false;
    $answer_valid = is_numeric($answer);

    if (!$answer_valid) {
        $result->invalidate($tag, __(
            "Maths challenge must be completed.",
            "contact-form-7-maths-captcha")
        );
    }

    return $result;
}
