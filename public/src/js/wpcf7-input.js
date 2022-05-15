function isValidEmail(address) {
    const regEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/i;

    return regEx.test(address);
}

wpcf7.input = {
    init: function(wpcf7FormEl) {
        const inputEls = wpcf7FormEl.querySelectorAll("[type='email'], [type='text'], textarea");

        inputEls.forEach((inputEl) => {
            wpcf7.input.validate(inputEl);

            inputEl.addEventListener("input", function() {
                wpcf7.input.setState.entered(inputEl);
            }, { once: true });

            inputEl.addEventListener("input", function() {
                wpcf7.input.validate(inputEl);
            });
        });
    },

    setState: {
        entered: function(inputEl) {
            console.log("In wpcf7.input.setState.entered().");

            if (!inputEl.hasAttribute("data-had-input")) {
                inputEl.setAttribute("data-had-input", true);
            }
        },

        invalid: function(inputEl) {
            console.log("In wpcf7.input.setState.invalid().");

            inputEl.setAttribute("aria-invalid", true);
        },

        valid: function(inputEl) {
            console.log("In wpcf7.input.setState.valid().");

            inputEl.setAttribute("aria-invalid", false);

            if (!inputEl.hasAttribute("data-input-was-valid")) {
                if (inputEl.hasAttribute("data-had-input")) {
                    inputEl.setAttribute("data-input-was-valid", true);
                }
            }
        }
    },

    // scrollToInvalid: function(e) {
    //     console.log("In wpcf7.input.scrollToInvalid().");

    //     const invalidInputs     = e.detail.apiResponse.invalid_fields,
    //           firstInvalidInput = document.getElementById(invalidInputs[0].idref);

    //     if (firstInvalidInput) {
    //         firstInvalidInput.scrollIntoView({
    //             behavior: motionAllowed() ? "smooth" : "auto",
    //             block: "start",
    //             inline: "start"
    //         });
    //     }
    // },

    validate: function(inputEl) {
        console.log("In wpcf7.input.validate().");

        if (inputEl.id === "wpcf7mc-input" && !wpcf7.mc.isValid()) {
            wpcf7.input.setState.invalid(inputEl);

            return;
        }

        const typeAttr = inputEl.getAttribute("type");

        if (typeAttr === "email" && !isValidEmail(inputEl.value)) {
            wpcf7.input.setState.invalid(inputEl);

            return;
        }

        const minAttr = inputEl.getAttribute("minlength"),
              maxAttr = inputEl.getAttribute("maxlength");
        const min = Number(minAttr),
              max = Number(maxAttr);

        if (minAttr !== null && (inputEl.value.length < min || inputEl.value.length > max)) {
            wpcf7.input.setState.invalid(inputEl);

            return;
        }

        wpcf7.input.setState.valid(inputEl);
    }
};
