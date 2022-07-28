$(document).ready(function () {

    //Function for Clear Item details...
    function ClearAll() {
        $("#drptitle").val();
        $("#txtFirstName").val("");
        $("#txtLastName").val("");
        $("#txtCountry").val("");
        $("#txtEmail").val("");
        $("#drpstatus").val();
    }

    //Cancel button click...
    $('#btnCancel').on('click', function () {
        location.reload(true);
    });

    //Save button click...
    $('#btnSave').on('click', function () {
        if (validate('#validateDiv')) {

            var Title = $("#drptitle").val();
            var FirstName = $("#txtFirstName").val();
            var LastName = $("#txtLastName").val();
            var Country = $("#txtCountry").val();
            var Status = $("#drpstatus").val();
            var Email =  $("#txtEmail").val();

            swal({
                title: 'Are you sure?',
                text: 'Do you really want to save Item!',
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
                    //Update

                    var formData = new FormData();
                    formData.append("Title", Title);
                    formData.append("FirstName", FirstName);
                    formData.append("LastName", LastName);
                    formData.append("Country", Country);
                    formData.append("Status", Status);
                    formData.append("Email", Email);
                    $.ajax({
                        url: saveItemData,
                        type: 'POST',
                        data: formData,
                        cache: false,
                        processData: false,
                        contentType: false,
                        async: false,
                        success: function (data) {
                            console.log(data.result);

                            if (data == 1) {
                                swal("Data Save Success!", "", "success").then(function () {
                                    location.reload(true);
                                });

                                ClearAll();

                            }
                            else if (data == 10) {
                                swal("Author Already Exist!", "", "warning");
                            }
                            else {
                                swal("Error Save data!", "", "error");
                            }
                        }
                    });


                }
            });

        }
    });

})