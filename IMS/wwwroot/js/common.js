// logout action
$('.logout').on('click', function () {

    swal({
        title: 'Are you sure?',
        text: 'Do you really want to Logout?',
        icon: 'info',
        buttons: {
            cancel: {
                text: 'No',
                value: null,
                visible: true,
                className: 'btn btn-default',
                closeModal: true,
            },
            confirm: {
                text: 'Yes',
                value: true,
                visible: true,
                className: 'btn btn-primary',
                closeModal: true
            }
        }
    }).then(function (isConfirm) {
        if (isConfirm) {
            window.location = logoutAll;
        }
    });

});

function validate(parent) {
    var is_form_valid = true; //Assume form is valid

    //Loop through each textbox inside the parent & validate
    $(parent + ' input[type="text"][validate="true"]').each(function () {
        var pattern = $(this).attr('match');
        var txtvalue = $(this).val();

        /*var regexPattern = new RegExp(pattern,["i"]);
         -- Commented due to case insesitive validation has been added via Regex*/
        var regexPattern = new RegExp(pattern);
        var is_matched = regexPattern.exec(txtvalue);

        if ($(this).parent().hasClass('input-group')) {

            if (is_matched == null) {
                //Pattern is not matched.
                is_form_valid = false;
                var error = $(this).attr('error');
                $(this).parent().next('div .errorNew').html(error).show(1000);
                $(this).closest('div').addClass('has-error');
            } else {
                $(this).parent().next('div .errorNew').html("").hide(1000);
                $(this).closest('div').removeClass('has-error');
            }
        } else {

            if (is_matched == null) {
                //Pattern is not matched.
                is_form_valid = false;
                var error = $(this).attr('error');
                $(this).next('div .errorNew').html(error).show(1000);
                $(this).closest('div').addClass('has-error');
            } else {
                $(this).next('div .errorNew').html("").hide(1000);
                $(this).closest('div').removeClass('has-error');
            }

        }
    });


    $(parent + ' input[type="number"][validate="true"]').each(function () {
        var pattern = $(this).attr('match');
        var txtvalue = $(this).val();

        /*var regexPattern = new RegExp(pattern,["i"]);
         -- Commented due to case insesitive validation has been added via Regex*/
        var regexPattern = new RegExp(pattern);
        var is_matched = regexPattern.exec(txtvalue);
        if (is_matched == null) {
            //Pattern is not matched.
            is_form_valid = false;
            var error = $(this).attr('error');
            $(this).next('div .errorNew').html(error).show(1000);
            $(this).closest('div').addClass('has-error');
        } else {
            $(this).next('div .errorNew').html("").hide(1000);
            $(this).closest('div').removeClass('has-error');
        }
    });


    //Loop through each textbox inside the parent & validate
    $(parent + ' input[type="password"][validate="true"]').each(function () {
        var pattern = $(this).attr('match');
        var txtvalue = $(this).val();

        /*var regexPattern = new RegExp(pattern,["i"]);
         -- Commented due to case insesitive validation has been added via Regex*/
        var regexPattern = new RegExp(pattern);
        var is_matched = regexPattern.exec(txtvalue);
        if (is_matched == null) {
            //Pattern is not matched.
            is_form_valid = false;
            var error = $(this).attr('error');
            $(this).next('div .errorNew').html(error).show(1000);
            $(this).closest('div').addClass('has-error');
        } else {
            $(this).next('div .errorNew').html("").hide(1000);
            $(this).closest('div').removeClass('has-error');
        }
    });


    //Loop through each textarea inside the parent & validate
    $(parent + ' textarea[validate="true"]').each(function () {
        var pattern = $(this).attr('match');
        var txtvalue = $(this).val();

        /*var regexPattern = new RegExp(pattern,["i"]);
         -- Commented due to case insesitive validation has been added via Regex*/
        var regexPattern = new RegExp(pattern);
        var is_matched = regexPattern.exec(txtvalue);
        if (is_matched == null) {
            //Pattern is not matched.
            is_form_valid = false;
            var error = $(this).attr('error');
            $(this).next('div .errorNew').html(error).show(1000);
            $(this).closest('div').addClass('has-error');
        } else {
            $(this).next('div .errorNew').html("").hide(1000);
            $(this).closest('div').removeClass('has-error');
        }
    });


    //Validate Dropdown
    $(parent + ' select[validate="true"]').each(function () {
        var value = $(this).val();

        if ($(this).hasClass('default-select2')) {

            if (value == null) {
                is_form_valid = false;
                var error = $(this).attr('error');
                $(this).next().next().html(error).show(1000);
                $(this).next('.select2-container').find('.select2-selection.select2-selection--single').addClass('validateSelectTo')
            } else {
                $(this).next().next().html("").hide(1000);
                $(this).next('.select2-container').find('.select2-selection.select2-selection--single').removeClass('validateSelectTo');
            }
        } else {

            if (value == null) {
                is_form_valid = false;
                var error = $(this).attr('error');
                $(this).next('div .errorNew').html(error).show(1000);
                $(this).closest('div').addClass('has-error');
            } else {
                $(this).next('div .errorNew').html("").hide(1000);
                $(this).closest('div').removeClass('has-error');
            }
        }
    });


    //Validate Radios
    $(parent + ' input[type="radio"][validate="true"]').each(function () {
        var name = $(this).prop('name');
        var count = $('input[type="radio"][name="' + name + '"]:checked').length;
        if (count == 0) {
            is_form_valid = false;
            var error = $(this).attr('error');
            $(this).next('div .errorNew').html(error).show(1000);
            $(this).closest('div').addClass('has-error');
        } else {
            $(this).next('div .errorNew').html("").hide(1000);
            $(this).closest('div').removeClass('has-error');
        }
    });


    //Validate Checkbox
    $(parent + ' input[type="checkbox"][validate="true"]').each(function () {
        var name = $(this).prop('name');
        var count = $('input[type="checkbox"][name="' + name + '"]:checked').length;
        if (count == 0) {
            is_form_valid = false;
            var error = $(this).attr('error');
            $(this).next('div .errorNew').html(error).show(1000);
            $(this).closest('div').addClass('has-error');
        } else {
            $(this).next('div .errorNew').html("").hide(1000);
            $(this).closest('div').removeClass('has-error');
        }
    });

    return is_form_valid;
}

