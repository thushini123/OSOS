$(document).ready(function () {

    //Save batton click... 
    $('#btnSave').on('click', function () {
        if (validate('#validateDiv')) {

            var oldPassword = $("#txtCurrPassword").val();
            var newPassword = $("#txtNewPassword").val();
            var confirmNewPassword = $("#txtConfirmPassword").val();

            $('#btnSave').prop('disabled', true);
            $.ajax({
                url: checkOldPassword,
                type: 'POST',
                data: { oldPassword: oldPassword},
                dataType: 'json',
                async: false,
                success: function (data) {
                    if (data == 1) {
                        //Password matched...
                        swal({
                            title: 'Are you sure?',
                            text: 'Do you really want update password ?',
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
                                $.ajax({
                                    url: updateNewPassword,
                                    type: 'POST',
                                    data: { newPassword: newPassword, confirmNewPassword: confirmNewPassword },
                                    dataType: 'json',
                                    async: false,
                                    success: function (data) {
                                        if (data == 1) {
                                            swal("Password Update Success", "", "success");
                                            Clear();
                                        }
                                        else if (data == -1) {
                                            swal("Password not maching!", "", "error");
                                            $("#txtNewPassword").val("");
                                            $("#txtConfirmPassword").val("");
                                        }
                                        else {
                                            swal("Error updating data!", "", "error");
                                            Clear();
                                        }
                                    }
                                });
                            }
                        })
                    }
                    else {
                        swal("Invalid Current Password!", "", "error");
                        $("#txtCurrPassword").val("");
                    }
                }, complete: function (data) {
                    $('#btnSave').prop('disabled', false);
                }
            });
        }
    });

    //Cancel batton click... 
    $('#btnCancel').on('click', function () {
        Clear();
        location.reload(true);
    });

    function Clear() {
        $("#txtCurrPassword").val("");
        $("#txtNewPassword").val("");
        $("#txtConfirmPassword").val("");
    }

})