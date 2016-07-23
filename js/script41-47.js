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

    function addErrorData(element, error) {
        element.parent().addClass('error');
        element.after("<div class='error-data'>" + error + "</div>");
    }
