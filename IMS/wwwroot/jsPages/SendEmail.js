$(document).ready(function () {
    
    loadTableData();
    function loadTableData(){
        $("#TBodySendEmail").html("");
        $.ajax({
            url: loadSendEmailTableDetails,
            type: 'POST',
            data: {},
            dataType: 'json',
            success: function (data) {
                console.log(data);
                var html = '';
                var rowId = 100;
                $(data).each(function (key, val) {
                    html += '<tr>';
                    html += '<td style="display:none;">' + val.itemSerial + '</td>';
                    html += '<td style="display:none;">' + val.supplierSerial + '</td>';

                    html += '<td align="center"><input type="checkbox" class="chkSingleEmailCheck" name="chkEmailCheck"></td>';

                    html += '<td align="left">' + val.itemId + '</td>';
                    html += '<td align="left">' + val.itemName + '</td>';
                    html += '<td align="left">' + val.supplierName + '</td>';
                    html += '<td align="left">' + val.batchNo + '</td>';
                    html += '<td align="left">' + val.expDate + '</td>';
                    html += '<td align="right">' + val.qty + '</td>';
                    html += '</tr>';
                    rowId++;
                });

                if (rowId == 100) {
                    html = '<tr><td align="center" colspan="9">No Data for View</td></tr>';
                }

                $("#TBodySendEmail").html(html);

            }
        });
    }

    $('#chkEmailCheckAll').on('change', function () {

        if ($(this).prop('checked')) {
            $('.chkSingleEmailCheck').prop('checked', true);
        }
        else {
            $('.chkSingleEmailCheck').prop('checked', false);
        }

    });

    //Send button Click...
    $('#btnSend').on('click', function () {

        if (validate('#validateDiv')) {

            var InvestigatorSerial = $("#drpInvestigator").val();
            var AssignDate = $("#txtDate").val();

            var CaseDetailsArr = [];
            $("#TBodyCaseDetails tr").each(function () {

                if ($(this).find('td:nth-child(10)').find('input[type="checkbox"]').is(":checked")) {

                    var CaseSerial = 0;

                    if ($(this).find('td:nth-child(1)').text().trim() != "")
                        CaseSerial = $(this).find('td:nth-child(1)').text().trim();

                    if ($(this).find('td:nth-child(8)').find('.firstRadio input[type="radio"]').is(":checked"))
                        var Priority = "High";
                    else if ($(this).find('td:nth-child(8)').find('.secondRadio input[type="radio"]').is(":checked"))
                        var Priority = "Medium";
                    else if ($(this).find('td:nth-child(8)').find('.thirdRadio input[type="radio"]').is(":checked"))
                        var Priority = "Low";
                    else
                        var Priority = "";

                    var Remarks = $(this).find('td:nth-child(9)').text().trim();

                    CaseDetailsArr.push([CaseSerial, Priority, Remarks]);

                }

            });

            if (CaseDetailsArr.length > 0) {
                var arrayAssignDetails = JSON.stringify(CaseDetailsArr);

                swal({
                    title: 'Are you sure?',
                    text: 'Do you really want Cases Assign to Investigator!',
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
                        //Save
                        $.ajax({
                            url: saveCaseAssignInvestigator,
                            type: 'POST',
                            data: {
                                InvestigatorSerial: InvestigatorSerial,
                                AssignDate: AssignDate,
                                arrayAssignDetails: arrayAssignDetails
                            },
                            dataType: 'json',
                            success: function (data) {
                                //console.log(data);
                                //alert('Data Save Success!');
                                if (data == 1) {
                                    swal("Case Assign Success", "", "success").then(function () {
                                        location.reload(true);
                                    });
                                    ClearAll();

                                }
                                else {
                                    swal("Error Saving data!", "", "error");
                                }
                            }
                        });

                    }
                });
            }
            else {
                swal("No data for save!", "", "warning");
            }

        }
    });

});