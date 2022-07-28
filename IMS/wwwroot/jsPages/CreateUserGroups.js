
$(document).ready(function () {

    LoadUserGroupsTable();
    LoadPermissionTable("");

    $(document).on('click', '#tbodyUserGroups tr', function (evt) {
        $(this).addClass('bg-info-group').siblings().removeClass('bg-info-group');

        if ($(this).hasClass('bg-info-group')) {

            var GroupSerial = $(this).find('td:nth-child(1)').text().trim();

            if (GroupSerial != null && GroupSerial != '') {
                LoadPermissionTable(GroupSerial)
            }
        }
    });

    function LoadUserGroupsTable() {
        $("#tbodyUserGroups").html("");
        $.ajax({
            url: loadUserGroups,
            type: 'POST',
            data: {},
            dataType: 'json',
            success: function (data) {
                console.log(data);
                var html = '';
                var rowId = 1;
                $(data).each(function (key, val) {
                    html += '<tr>';
                    html += '<td style="display:none;">' + val.userGroupSerial + '</td>';
                    html += '<td align="left">' + val.userGroupName + '</td>';
                    html += '</tr>';
                    rowId++;
                });

                $("#tbodyUserGroups").html(html);

            }
        });
    }

    function LoadPermissionTable(x) {
        $("#tbodyPermissionMaster").html("");
        $.ajax({
            url: loadPermissions,
            type: 'POST',
            data: {},
            dataType: 'json',
            async: false,
            success: function (data) {
                console.log(data);
                var html = '';
                var rowId = 1;
                $(data).each(function (key, val) {
                    html += '<tr>';
                    html += '<td style="display:none;"></td>';
                    html += '<td style="display:none;">' + val.permissionSerial + '</td>';
                    html += '<td align="left">' + rowId + '</td>';
                    html += '<td align="left">' + val.permissionName + '</td>';
                    html += '<td align="center"><span class="form-check form-check-custom form-check-solid"><input class="form-check-input" type="checkbox" name="checkPermission' + rowId + '"></span></td>';
                    html += '<td align="center"><span class="form-check form-check-custom form-check-solid"><input class="form-check-input" type="checkbox" name="checkPermission' + rowId + '"></span></td>';
                    html += '</tr>';
                    rowId++;
                });
                $("#tbodyPermissionMaster").html(html);

            }, complete: function (data) {

                $.ajax({
                    url: loadUserGroupPermissions,
                    type: 'POST',
                    data: { groupSerial: x },
                    dataType: 'json',
                    success: function (data) {
                        console.log(data);
                        var html = '';
                        var rowId = 1;
                        $(data).each(function (key, val) {

                            $("#tbodyPermissionMaster tr").each(function () {
                                if ($(this).find('td:nth-child(2)').text().trim() == val.permissionSerial) {

                                    $(this).find('td:nth-child(1)').text(val.userGroupPermissionSerial);

                                    if (val.readOnly == "true") {
                                        $(this).find('td:nth-child(5)').find('input[type="checkbox"]').prop("checked", true);
                                    }

                                    if (val.readAndWrite == "true") {
                                        $(this).find('td:nth-child(6)').find('input[type="checkbox"]').prop("checked", true);
                                    }
                                }
                            });
                            rowId++;
                        });
                    }
                });
            }
        });

    }

    $("#btnSave").on('click', function () {

        if ($('#tbodyUserGroups tr').hasClass('bg-info-group')) {

            var GroupSerial = $('#tbodyUserGroups').find('.bg-info-group').find('td:nth-child(1)').text().trim();

            var PermissionsArr = [];
            $("#tbodyPermissionMaster tr").each(function () {

                var UserPermissionSerial = 0;

                if ($(this).find('td:nth-child(1)').text().trim() != "")
                    UserPermissionSerial = $(this).find('td:nth-child(1)').text().trim();

                var PermissionMasterSerial = $(this).find('td:nth-child(2)').text().trim();

                if ($(this).find('td:nth-child(5)').find('input[type="checkbox"]').is(":checked"))
                    var ReadOnly = "true";
                else
                    var ReadOnly = "false";

                if ($(this).find('td:nth-child(6)').find('input[type="checkbox"]').is(":checked"))
                    var ReadAndWrite = "true";
                else
                    var ReadAndWrite = "false";

                if (PermissionMasterSerial != "")
                    PermissionsArr.push([UserPermissionSerial, PermissionMasterSerial, ReadOnly, ReadAndWrite]);

            });
            var arrayPermissionMaster = JSON.stringify(PermissionsArr);

            swal({
                title: 'Are you sure?',
                text: 'Do you really want to save!',
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
                        url: saveUserGroupPermissions,
                        type: 'POST',
                        data: {
                            GroupSerial: GroupSerial,
                            arrayPermissionMaster: arrayPermissionMaster
                        },
                        dataType: 'json',
                        success: function (data) {

                            if (data == 1) {
                                swal("Group Permission Save Success", "", "success").then(function () {
                                    location.reload(true);
                                });
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
            swal("Select a User Group!", "", "warning");
        }

    });

    function Clear() {

    }

    $("#btnCancel").on('click', function () {
        location.reload(true);
    });

    //Create user group
    $('#btnUserGrp').on('click', function () {
        $('#UserGrpModal').modal('show');
    });

    //Save user groups
    $('#btnUserGrpSave').on('click', function () {
        if (validate('#validateDiv')) {
            var usergroup = $('#txtUsergrp').val();
            $.ajax({
                url: saveUserGroups,
                dataType: 'json',
                type: 'POST',
                data: {
                    usergroup: usergroup
                },
                success: function (data) {
                    if (data === 1) {
                        swal({
                            title: "Data Saved Successfully!",
                            icon: "success",
                            showCancelButton: false,
                            confirmButtonClass: 'btn-success',
                            confirmButtonText: 'OK!'
                        });

                        $('#txtUsergrp').val("");

                    } else if (data === 4) {
                        swal({
                            title: "User Already Exist!",
                            icon: "error",
                            showCancelButton: false,
                            confirmButtonClass: 'btn-error',
                            confirmButtonText: 'OK!'
                        });
                    }
                },
                complete: function (data) {
                    LoadUserGroupsTable();
                }
            });
        }
    });

});









