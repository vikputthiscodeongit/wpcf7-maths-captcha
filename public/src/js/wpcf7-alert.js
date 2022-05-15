wpcf7.alert = {
    message: {
        get: function(msgType) {
            console.log("In wpcf7.alert.message.get().");

            let type, message;

            if (msgType === "mc") {
                type = "warning";
                message = "Your answer to the maths problem is incorrect.";
            }

            if (msgType.type === "wpcf7submit") {
                const response = msgType.detail.apiResponse;

                const status = response.status;

                switch(status) {
                    case "mail_sent":
                        type = "success";

                        break;
                    default:
                        type = "warning";

                        break;
                }

                message = response.message;
            }

            return [message, type];
        },

        show: function(e) {
            console.log("In wpcf7.alert.message.show().");

            const msgData = wpcf7.alert.message.get(e);

            wpcf7.simpleNotifier.show(...msgData);
        }
    }
};

// intercepts wpcf7submit

// check if .wpcf7-form-control-wrap.wpcf7mc
