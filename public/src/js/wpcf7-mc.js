// import { getPropValue, motionAllowed, timeToMs } from "@codebundlesbyvik/css-operations";
import createEl from "@codebundlesbyvik/element-operations";
import getRandomIntUnder from "@codebundlesbyvik/number-operations";

class WPCF7MC {
    constructor(userOptions = {}) {
        this.wrapperClass = userOptions.wrapperClass;
        this.problemRefreshTime = userOptions.refreshTime;
        this.generationDelay = userOptions.generationDelay;

        this.instanceId = null;
        this.runCount = 0;

        // this.problemId = null;
        this.problemD1 = null;
        this.problemD2 = null;

        this.nodes = {
            /*
            field: null,
            label: null,
            inputWrapper: null,
            input: null,
            checkEl: null,
            loader: null
            */
        };

        // this.observerId = null;

        this.problemTimeoutId = null;
    }

    _eventCallbackSubmit(e) {
        return e;
    }

    _eventCallback(e) {
        console.log(`SN: notificationDestroyed event dispatched by notification ${e.detail.id}.`);
    }

    init(wpcf7El) {
        console.log("In wpcf7.mc.init().");

        if (this.instanceId) {
            throw new Error(`WPCF7MC: .init() has already been called on this instance (${this.instanceId}).`);
        }

        this.instanceId = getRandomIntUnder(100000);

        wpcf7El.setAttribute("data-wpcf7mc-generating", "");

        this.nodes.wrapper = wpcf7El;
        this.nodes.form = document.querySelector(wpcf7El).closest("form");
        this.nodes.formPrivateInputsWrapper = this.nodes.form.querySelector("div[style='display:none']");
        this.nodes.input = wpcf7El.querySelector("#wpcf7mc-input");
        this.nodes.label = wpcf7El.querySelector("#wpcf7mc-label");
        this.nodes.loader = wpcf7El.querySelector("#wpcf7mc-loader");
        this.nodes.validationInputs.d1 = wpcf7El.querySelector("input[name='_wpcf7mc_digit_1']");
        this.nodes.validationInputs.d2 = wpcf7El.querySelector("input[name='_wpcf7mc_digit_2']");

        // Move the hidden <input>s to the <div> where all WPCF7's hidden <input>s reside.
        this.nodes.validationInputs.forEach((node) => {
            node.remove();
            node.append(this.nodes.formPrivateInputsWrapper);
        });
        // this.initVIObserver();

        setTimeout(() => {
            // this.generateProblem();

            // this.insertProblem();

            // this.scheduleNextProblem();

            this.makeProblem();




            // Use callback function
            this.events.submit = this.nodes.form.addEventListener("submit", (e) => {
                this.submit(e);
            }, true);




            this.nodes.form.addEventListener("wpcf7submit", () => {
                this.regenerate();
            });
        }, this.generationDelay);
    }

    //
    // On submit, remove any _wpcf7mc_digit <input> that isn't stored in this.nodes so that the right ones are submitted.
    //

    // generate(init) {
    //     console.log("In wpcf7.mc.generate().");

    //     // if (typeof i === "undefined") {
    //     //     i = 0;
    //     // }

    //     // console.log(i);

    //     wpcf7.mc.problem.generate();

    //     // if (i === 0) {
    //     if (init) {
    //         wpcf7.mc.els.generate(wpcf7FormEl);
    //     } else {
    //         wpcf7.mc.problem.insert(wpcf7FormEl, i);
    //     }
    // }

    regenerate() {
        console.log("In wpcf7.mc.regenerate().");

        if (this.states.inRegenerate) {
            console.log("WPCF7MC: CAPTCHA is currently being regenerated. Returning!");

            return;
        }

        this.states.inRegenerate = true;

        wpcf7El.setAttribute("data-wpcf7mc-generating", "");

        clearTimeout(this.problemTimeoutId);



        // removeEventListener
        // this.events.submit.removeEventListener



        // setTimeout van generationDelay
            // this.makeProblem();

            // Block submission in this.submit(), elsewhise the wpcf7 submit function will just take over.

            // this.states.inRegenerate = false;



        // this.observerId.disconnect();
    }

    // generateEls() {
    //     console.log("In wpcf7.mc.els.generate().");

    //     Object.values(wpcf7.mc.els.nodes).forEach((node) => {
    //         if (node) {
    //             node.remove();
    //         }
    //     });

    //     wpcf7.submit.els.assignVars(wpcf7FormEl);

    //     const elObjArr = wpcf7.mc.els.objArr();

    //     elObjArr.forEach((elObj) => {
    //         const el = createEl(elObj.el, elObj.attrs);

    //         wpcf7.mc.els.nodes[elObj.role] = el;

    //         if (elObj.role === "field") {
    //             const sbFieldsetEl = wpcf7.submit.els.nodes.fieldset,
    //                   sbFieldEl    = wpcf7.submit.els.nodes.field;

    //             sbFieldsetEl.insertBefore(el, sbFieldEl);
    //         } else {
    //             if (elObj.role === "input") {
    //                 wpcf7.mc.els.nodes.inputWrapper.append(el);
    //             } else {
    //                 wpcf7.mc.els.nodes.field.append(el);
    //             }
    //         }
    //     });

    //     wpcf7.mc.els.observe.do(wpcf7FormEl);
    // }

    // MutationObserver is redundant
    // * If the present nodes are removed, $_POST will be empty on submission and back-end validation will fail.
    // * If nodes with the same name are added, they'll be removed on form submission.
    // * If the id of a present node is altered, it will still be stored in this.nodes. If the user then...
    //   > Adds a node with the same name, #2 will apply.
    //   > Doesn't add a new node with the same name, #1 will apply.
    //   > Modifies the node's value attribute, the submitter function will overwrite it on submission.
    // initVIObserver() {
    //     console.log("In wpcf7.mc.els.observe.do().");

    //     const targetNodes = Object.values(this.nodes.validationInputs);

    //     const callback = function(mutationRecords) {
    //         mutationRecords.forEach((record) => {
    //             checkRecord(record);
    //         });
    //     };

    //     const checkRecord = function(record) {
    //         // Only action of interest is altered.
    //         // If the present nodes are removed, $_POST will be empty and back-end validation will fail.
    //         // If nodes with the same name are added, they'll be removed on form submission.
    //         if (targetNodes.includes(record.target)) {
    //             console.log("WPCF7MC: validation <input> was tampered with! Regenerating...");
    //             console.log(record);

    //             this.regenerate();
    //         }
    //     };

    //     this.observerId = new MutationObserver(callback);

    //     this.doVIObservation();
    // }

    // doVIObservation() {
    //     this.observerId.observe(this.nodes.formPrivateInputsWrapper, {
    //         // subtree: true,
    //         childList: true,
    //         attributes: true,
    //         attributeFilter: [ "value" ]
    //     });
    // }

    makeProblem(freshLoad) {
        this.digit1 = getRandomIntUnder(10);
        this.digit2 = getRandomIntUnder(10);

        this.nodes.label.textContent = `${this.digit1} + ${this.digit2} =`;

        wpcf7.input.validate(this.nodes.input);

        if (freshLoad) {
            this.nodes.wrapper.removeAttribute("data-wpcf7mc-generating");

            this.nodes.loader.remove();
        }

        this.problemTimeoutId = setTimeout(() => {
            this.makeProblem(wpcf7FormEl, i);
        }, this.problemRefreshTime);
    }

    // generateProblem() {
    //     console.log("In wpcf7.mc.problem.generate().");

    //     const digit1 = getRandomIntUnder(10),
    //           digit2 = getRandomIntUnder(10);

    //     wpcf7.mc.problem.digits = [digit1, digit2];
    // }

    // insertProblem() {
    //     console.log("In wpcf7.mc.problem.insert().");

    //     if (i === 0) {
    //         wpcf7.mc.els.nodes.field.setAttribute("data-wpcf7mc-generating", "");
    //     }

    //     const digit1 = wpcf7.mc.problem.digits[0],
    //           digit2 = wpcf7.mc.problem.digits[1];

    //     wpcf7.mc.els.nodes.label.textContent = `${digit1} + ${digit2} =`;

    //     wpcf7.input.validate(wpcf7.mc.els.nodes.input);

    //     wpcf7.mc.problem.scheduleNext(wpcf7FormEl, i);
    // }

    // scheduleNextProblem() {
    //     console.log("In wpcf7.mc.problem.scheduleNext().");

    //     const problemCutoff = 17;
    //     let timeout;

    //     if (i < problemCutoff) {
    //         timeout = 167;
    //     } else {
    //         if (i === problemCutoff) {
    //             wpcf7.mc.els.nodes.field.removeAttribute("data-wpcf7mc-generating");

    //             wpcf7.mc.els.nodes.loader.remove();
    //         }

    //         timeout = 15000;
    //     }

    //     i++;

    //     wpcf7.mc.problem.id = setTimeout(() => {
    //         wpcf7.mc.generate(wpcf7FormEl, i);
    //     }, timeout);
    // }

    answerValid() {
        console.log("In wpcf7.mc.isValid().");

        const userInput = Number(this.nodes.input);
        const answer = this.digit1 + this.digit2;

        const answerValid = userInput === answer;
        console.log(`User's answer is valid: ${answerValid}`);

        return answerValid;
    }

    submit() {
        console.log("In wpcf7.submit.do().");
        console.log(e);

        e.preventDefault();
        e.stopImmediatePropagation();

        if (this.states.inRegenerate) {
            console.log("WPCF7MC: CAPTCHA is currently being regenerated. Returning!");

            return;
        }

        if (!this.answerValid()) {
            console.log("Preventing form submission - answer is invalid!");

            return;
        }

        this.nodes.validationInputs.d1 = this.digit1;
        this.nodes.validationInputs.d2 = this.digit2;

        // Remove all hidden <input> nodes that weren't created by WPCF7MC.
        const allHiddenInputNodes = this.nodes.form
            .querySelectorAll("input[name^='_wpcf7mc_digit_']");
        const validHiddenInputNodes = Object.values(this.nodes.validationInputs);

        allHiddenInputNodes.forEach((node) => {
            if (!validHiddenInputNodes.includes(node)) {
                node.remove();
            }
        });

        window.wpcf7.submit(e.target);
    }
};

export default WPCF7MC;
