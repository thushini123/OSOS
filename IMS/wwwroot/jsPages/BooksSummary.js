$(document).ready(function () {

    LoadItemData();

    function LoadItemData() {
        $('#myTbodyContent').html("");
        $.ajax({
            url: URLloadItemData,
            type: 'POST',
            data: { },
            dataType: 'json',
            success: function (data) {
                var count = 0;
                $(data)
                    .each(function (key, val) {
                        $('#myTbodyContent1')
                            .append('<tr style="background-color: #c1dccc;"><td>' +
                            val.name +
                                '</td><td>' +
                            val.noofbook +
                                '</td>');
                        $('#table2').show();

                    });
            }, complete: function () {
                $('#table2').DataTable();
            }
        });

    }





})