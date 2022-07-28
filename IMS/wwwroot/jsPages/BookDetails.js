$(document).ready(function () {

    loadItemData();

    //Function for Clear Item details...
    function ClearAll() {
        $("#drpauthorname").val();
        $("#txtBooktitle").val("");
        $("#txtBookName").val("");
    }

    //Cancel button click...
    $('#btnCancel').on('click', function () {
        location.reload(true);
    });



    function loadItemData() {
        $.ajax({
            url: UrlLoadItemData,
            type: 'POST',
            data: {},
            dataType: 'json',
            async: true,
            success: function (data) {
                var options = '';
                options += '<option selected="selected" value="" disabled>--Select--</option>';
                $(data).each(function (key, val) {
                    options += '<option value="' + val.authorSerial + '">' + val.name + '</option>';
                });
                $("#drpauthorname").html("");
                $("#drpauthorname").html(options);

            }
        });

    }

    //FileUpload

    $('#flImage').on("change", function () {
        var input = document.getElementById('flImage');
        var fileCon = '';
        var file = input.files[0],
            reader = new FileReader();
        if (file != undefined) {

            reader.onloadend = function () {
                var b64 = fileCon = reader.result;
            };
            reader.readAsDataURL(file);
        }

        setTimeout(function () {
            if (file != undefined) {
                $('#HiddenDescDoc').attr('attr-imgS', fileCon);
            } else {
                $("#HiddenDescDoc").attr('attr-imgS', "noImage");
            }
        }, 1000);
    });


    //Load Saved Data

    function LoadData() {

        $('#myTbodyContent').html("");
        var text = $('#drpauthorname').val();
        $.ajax({
            url: UrlLoadData,
            type: 'POST',
            data: { AuthorSerial: text},
            dataType: 'json',
            success: function (data) {
                var count = 0;
                $(data)
                    .each(function (key, val) {
                        if (val.ImageDoc == null) {
                            image = "-";
                        }
                        else {
                            image = val.ImageDoc;
                        }
                        $('#myTbodyContent1')
                            .append('<tr style="background-color: #c1dccc;"><td>' +
                            val.booktitle +
                                '</td><td>' +
                            val.bookname +
                                '</td><td style="display: none">' +
                            val.image +
                                '</td>' +
                                '<td><button type="button" name="view" class="btn btn-warning bt-xs view">View</button>' +
                                '</td><td style="display: none">' +
                                '</td>');
                        $('#table2').show();

                    });
            }, complete: function () {
                $('#table2').DataTable();
            }
        });


    }


    $('#drpauthorname').on("change", function () {
        LoadData();
    });

    //view Document
    $('#table1')
        .on('click',
            '.view',
            function () {
                var id = $(this).parents('tr').find('td:nth-child(3)').text();
                var Rowcount = $("#table1 tbody tr").length;
                if (Rowcount > 0) {
                    $('#fileViewrPlaceHolder').removeAttr('data');
                    $('.objContainer').html("");
                    $('.objContainer').html('<object id="fileViewrPlaceHolder" class="col-md-12" data="' + window.atob(id) + '" style="height: 550px;"></object>')
                    $('.viewUpFilesModal').modal({ show: true, backdrop: 'static' });
                }
            });

    //Save button click...



        $('#btnSave').on('click', function () {
            if (validate('#validateDiv')) {

                var AuthorSerial = $("#drpauthorname").val();
                var BookTitle = $("#txtBooktitle").val();
                var BookName = $("#txtBookName").val();
                var ImageDoc = $("#HiddenDescDoc").attr('attr-imgS');
                swal({
                    title: 'Are you sure?',
                    text: 'Do you really want to save Data!',
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
                        formData.append("AuthorSerial", AuthorSerial);
                        formData.append("BookTitle", BookTitle);
                        formData.append("BookName", BookName);
                        formData.append("ImageDoc", ImageDoc);
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