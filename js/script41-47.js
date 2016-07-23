    jQuery(document).ready(function($) {
        $('.submit-btn').click(function(event) {
            /* Prevent form submission */
            event.preventDefault();

            var inputs = $('input');
            var isError = false;

            //Remove old errors
            $('.input-frame').removeClass('error');
            $('.error-data').remove();
            for (var i = 0; i < inputs.length; i++) {
                var input = inputs[i];

                /*Requiring the data*/
                if ($(input).hasClass('required') && !validateRequired($(input).val())) {
                    addErrorData($(input), "This is a required field");
                    isError = true;
                }

                /*Checking the telephone tab only where number should be added in the data field*/
                if ($(input).hasClass('number') && !validateNumber($(input).val())) {
                    addErrorData($(input), "This field can only contain numbers");
                    isError = true;
                }

                /** Credit Card Validation */
                if ($(input).hasClass('credit-card') && !validateCreditCard($(input).val())) {
                    addErrorData($(input), "Invalid credit card number");
                    isError = true;
                }

                if (isError === false) {
                    //No errors, submit the form
                    $('#webForm').submit();
                }
            }
        });
    });

    function validateRequired(value) {
        if (value === "") return false;
        return true;
    }

    function validateNumber(value) {
        if (value !== "") {
            return !isNaN(parseInt(value, 10)) && isFinite(value);
            //isFinite, in case letter is on the end
        }
        return true;
    }

    function validateCreditCard(value){
        if (value !== "") {
            return /^(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12}|3[47][0-9]{13}|3(?:0[0-5]|[68][0-9])[0-9]{11}|(?:2131|1800|35\d{3})\d{11})$/.test(value);
        }
        return true;
    }

    function addErrorData(element, error) {
        element.parent().addClass('error');
        element.after("<div class='error-data'>" + error + "</div>");
    }
