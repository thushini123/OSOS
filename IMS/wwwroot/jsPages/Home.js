$(document).ready(function () {
    var table = "";
    loadTableDetails();
    function loadTableDetails() {
        
        table = $('#tblInventryDetails').DataTable({
            "sAjaxSource": loadInventryTableData,
            "fnServerParams": function (aoData) {},
            "bServerSide": true,
            "bProcessing": true,
            "iDisplayLength": 10,
            "columns": [
                {
                    "data": "authorName",
                    "orderable": false,
                    "searchable": false,
                },
                {
                    "data": "bookTitle",
                    "autoWidth": true,
                    "searchable": true,
                    className: "custome-center"
                },
                {
                    "data": "bookName",
                    "autoWidth": true,
                    "searchable": true,
                    className: "custome-center"
                },],
            //rowCallback: function (nRow, aData, iDisplayIndex) {
            //    var oSettings = this.fnSettings();
            //    $("td:nth-child(2)", nRow).html(
            //        oSettings._iDisplayStart + iDisplayIndex + 1
            //    );
            //    return nRow;
            //},            
            //columnDefs: [{
            //    className: 'hideCol',
            //    orderable: false,
            //    targets: 0
            //},
            //],
            "initComplete": function (settings, json) {

            },
            "aLengthMenu": [
                [5, 10, 25, 50, 100, -1],
                [5, 10, 25, 50, 100, "All"]
            ],
            dom: 'Blfrtip',
            buttons: [
                'csv', 'excel', 'pdf'
            ],
        });

    }

    $(document).on('click', '#tblInventryDetails tbody tr', function (evt) {
        $(this).addClass('bg-info-new').siblings().removeClass('bg-info-new');

        if ($(this).hasClass('bg-info-new')) {
        }
    });

});