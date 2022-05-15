wpcf7.submit = {
    // Maybe drop the following
    els: {
        nodes: {
            fieldset: null,
            field: null,
            button: null
        },

        assignVars: function(wpcf7FormEl) {
            console.log("In wpcf7.submit.els.assignVars().");

            const buttonEl = wpcf7FormEl.querySelector(".wpcf7-submit");

            if (!buttonEl) {
                console.log("Exiting function - no submit button found within this form!");

                return;
            }

            //
            // TODO: Use .closest() (maybe, or do the assignment in a completely different way)
            //
            const fieldEl    = buttonEl.parentElement,
                  fieldsetEl = fieldEl.parentElement;

            if (fieldsetEl.tagName !== "FIELDSET") {
                console.log("Exiting function - submit button's field must be wrapped in a <fieldset>.");

                return;
            }

            wpcf7.submit.els.nodes.button   = buttonEl;
            wpcf7.submit.els.nodes.field    = fieldEl;
            wpcf7.submit.els.nodes.fieldset = fieldsetEl;
        }
    },
    //

    // move to wpcf7mc
    do: function(e) {
        console.log("In wpcf7.submit.do().");

        e.preventDefault();
        e.stopImmediatePropagation();

        if (wpcf7.mc.id !== null && !wpcf7.mc.isValid()) {
            console.log("Preventing form submission - answer is invalid!");

            wpcf7.alert.message.show("mc");

            return;
        }

        window.wpcf7.submit(e.target);
    },

    // wpcf7submit
    // After submission has completed, regardless of other events
    // Do this regardless of whether wpcf7.alert or wpcf7mc is initialized
    finish: function(wpcf7FormEl, e) {
        console.log("In wpcf7.submit.finish().");

        if (wpcf7.alert.id !== null) {
            wpcf7.alert.message.show(e);
        }

        const inputEls = wpcf7FormEl.querySelectorAll("[type='email'], [type='text'], textarea");

        setTimeout(() => {
            inputEls.forEach((inputEl) => {
                inputEl.removeAttribute("data-input-was-valid");
                inputEl.removeAttribute("data-had-input");

                wpcf7.input.validate(inputEl);

                inputEl.removeAttribute("disabled");
            });

            wpcf7.submit.els.nodes.button.removeAttribute("disabled");
        }, 2000);
    },

    // wpcf7beforesubmit
    // Do this regardless of whether wpcf7.alert or wpcf7mc is initialized
    prepare: function(wpcf7FormEl) {
        console.log("In wpcf7.submit.prepare().");

        wpcf7.submit.els.nodes.button.setAttribute("disabled", "");

        const inputEls = wpcf7FormEl.querySelectorAll("[type='email'], [type='text'], textarea");

        inputEls.forEach((inputEl) => {
            inputEl.setAttribute("disabled", "");
        });
    }
};
