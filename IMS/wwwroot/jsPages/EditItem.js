$(document).ready(function () {
    LoadItemDataInPageLoad();
    //Function for load Item data in page load...
    function LoadItemDataInPageLoad() {
        LoadItemsIds();
        $.ajax({
            url: loadItemDataInPageLoad,
            type: 'POST',
            data: {},
            dataType: 'json',
            async: false,
            success: function (data) {
                if (data != null) {
                    console.log(data);

                    $("#drpItemId").val(data);
                    LoadItemData(data);
                }
            },
            error: function (data) {

            }
        });
    }

    //Function for load Item Ids....
    function LoadItemsIds() {

        $.ajax({
            url: loadItemsIds,
            type: 'POST',
            data: {},
            dataType: 'json',
            async: false,
            success: function (data) {
                console.log(data);
                var options = '';
                options += '<option selected="selected" value="" disabled>--Select--</option>';
                $(data).each(function (key, val) {
                    options += '<option value="' + val.itemSerial + '">' + val.itemId + ' : ' + val.itemName + '</option>';
                });
                $("#drpItemId").html("");
                $("#drpItemId").html(options);

            }
        });

    }

    //Items Id change event...
    $("#drpItemId").on('change', function () {
        var itemSerial = $(this).val();

        if (itemSerial != null && itemSerial != '') {
            LoadItemData(itemSerial);
        }
    });

    //Function for load Items Details...
    function LoadItemData(x) {
        ClearAll();
        $.ajax({
            url: loadItemData,
            type: 'POST',
            data: {
                itemSerial: x
            },
            dataType: 'json',
            async: false,
            success: function (data) {
                console.log(data);

                $("#txtItemName").val(data.itemName);

                $("#txtBatchNo").val(data.batchNo);

                $("#txtExpDate").val(data.expDate);

                $("#txtQuantity").val(data.qty);

            }
            , complete: function (data) {

            }
        });
    }

    //Function for Clear Item details...
    function ClearAll() {
        $("#txtItemName").val("");
        $("#txtBatchNo").val("");
        $("#txtExpDate").val("");
        $("#txtQuantity").val("");
    }

    //Cancel button click...
    $('#btnCancel').on('click', function () {
        location.reload(true);
    });

    //Update button click...
    $('#btnUpdate').on('click', function () {
        if (validate('#validateDiv')) {

            var ItemSerial = $("#drpItemId").val();
            var ItemName = $("#txtItemName").val();
            var BatchNo = $("#txtBatchNo").val();
            var ExpDate = $("#txtExpDate").val();
            var Quantity = $("#txtQuantity").val();

            swal({
                title: 'Are you sure?',
                text: 'Do you really want to update Item!',
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
                    formData.append("ItemSerial", ItemSerial);
                    formData.append("ItemName", ItemName);
                    formData.append("BatchNo", BatchNo);
                    formData.append("ExpDate", ExpDate);
                    formData.append("Quantity", Quantity);

                    $.ajax({
                        url: updateItemData,
                        type: 'POST',
                        data: formData,
                        cache: false,
                        processData: false,
                        contentType: false,
                        async: false,
                        success: function (data) {
                            console.log(data.result);

                            if (data == 1) {
                                swal("Data Upadte Success!", "", "success").then(function () {
                                    location.reload(true);
                                });

                                ClearAll();

                                LoadItemsIds();
                            }
                            else {
                                swal("Error Upadte data!", "", "error");
                            }
                        }
                    });


                }
            });

        }
    });
})