$(document).ready(function () {

    //Function for Clear Item details...
    function ClearAll() {
        $("#txtItemId").val("");
        $("#txtItemName").val("");
        $("#txtBatchNo").val("");
        $("#txtExpDate").val("");
        $("#txtQuantity").val("");
    }

    //Cancel button click...
    $('#btnCancel').on('click', function () {
        location.reload(true);
    });

    //Save button click...
    $('#btnSave').on('click', function () {
        if (validate('#validateDiv')) {

            var ItemId = $("#txtItemId").val();
            var ItemName = $("#txtItemName").val();
            var BatchNo = $("#txtBatchNo").val();
            var ExpDate = $("#txtExpDate").val();
            var Quantity = $("#txtQuantity").val();

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
                    formData.append("ItemId", ItemId);
                    formData.append("ItemName", ItemName);
                    formData.append("BatchNo", BatchNo);
                    formData.append("ExpDate", ExpDate);
                    formData.append("Quantity", Quantity);

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
                                swal("Item Id Already Exist!", "", "warning");
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