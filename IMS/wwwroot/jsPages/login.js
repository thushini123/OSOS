$(document).ready(function () {

    fillByMemory();

    //On Enter Key Press page log
    $(document).keypress(function (e) {
        if (e.which == 13) {
            systemLogin();
        }
    });

    function systemLogin() {

        var username = $('#txtUserName').val();
        var password = $('#txtPassword').val();

        if ($('#rememberMe').is(':checked')) {
            // save username and password
            localStorage.setItem('username', $('#txtUserName').val());
            localStorage.setItem('pass', $('#txtPassword').val());
            localStorage.setItem('chkbx', 'checked');
        } else {
            localStorage.removeItem('username');
            localStorage.removeItem('pass');
            localStorage.removeItem('chkbx');
        }

        if (username != "" && password != "") {

            $.ajax({
                url: login,
                type: 'POST',
                dataType: 'json',
                data: {
                    username: username,
                    password: password
                },
                success: function (data) {
                    if (data === 1) {
                        window.location = homeUrl;
                    }
                    else {

                        swal({
                            title: 'Wrong Username Or Password!',
                            text: '',
                            icon: 'error',
                            buttons: {
                                confirm: {
                                    text: 'OK!',
                                    value: true,
                                    visible: true,
                                    className: 'btn btn-danger',
                                    closeModal: true
                                }
                            }
                        });
                    }
                }
            });
        }
        else {

            swal({
                title: 'Enter Username and Password!',
                text: '',
                icon: 'error',
                buttons: {
                    confirm: {
                        text: 'OK!',
                        value: true,
                        visible: true,
                        className: 'btn btn-danger',
                        closeModal: true
                    }
                }
            });

        }
    }

    function fillByMemory() {
        if (localStorage.getItem('chkbx') && localStorage.getItem('chkbx') == 'checked') {
            $('#rememberMe').prop('checked', 'true');
            $('#txtUserName').val(localStorage.getItem('username'));
            $('#txtPassword').val(localStorage.getItem('pass'));
        } else {
            $('#rememberMe').removeAttr('checked');
            $('#txtUserName').val('');
            $('#txtPassword').val('');
        }
    }

    $('#btnLogin').on('click', function () {
        systemLogin();
    });


});