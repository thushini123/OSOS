
$(document).ready(function () {

    LoadUserGroup();
    function LoadUserGroup() {

        $.ajax({
            url: LoadUGURL,
            type: 'POST',
            data: {},
            dataType: 'json',
            success: function (data) {
                console.log(data);
                var options = '';
                options += '<option selected="selected" disabled>- Select -</option>';
                $(data).each(function (key, val) {
                    options += '<option value="' + val.userGroupId + '">' + val.userGroupName + '</option>';
                });

                $("#drpUserGroup").html("");
                $("#drpUserGroup").html(options);

            }
        });
    }

    $("#SaveBtn").on('click', function () {

        $('#SaveBtn').prop('disabled', true);

        var LookupID = $("#drpSchEmpDet").val();

        if (validate('#NewUserPanel')) {
            //save
            if (LookupID == "") {
                var EmpName = $("#txtEmployeeName").val();
                var UName = $("#txtUserName").val();
                var UPassword = $("#txtPassword").val();
                var UGroup = $("#drpUserGroup").val();
                var UStatus = $("#drpUserStatus").val();

                $.ajax({
                    url: SaveUserURL,
                    type: 'POST',
                    data: { EmpName: EmpName, UName: UName, UPassword: UPassword, UGroup: UGroup, UStatus: UStatus },
                    dataType: 'json',
                    success: function (data) {
                        if (data == 10) {
                            swal("username already exists. Try Another!", "", "warning");
                        } else {
                            swal("Data Save Success!", "", "success");
                            Clear();
                        }
                    }, complete: function (data) {
                        $('#SaveBtn').prop('disabled', false);
                    }
                });

            }
            else {//Update

                var EmpName = $("#txtEmployeeName").val();
                var UName = $("#txtUserName").val();
                var UPassword = $("#txtPassword").val();
                var UGroup = $("#drpUserGroup").val();
                var UStatus = $("#drpUserStatus").val();

                $.ajax({
                    url: UpdateUserURL,
                    type: 'POST',
                    data: {
                        LookupID: LookupID,
                        EmpName: EmpName,
                        UName: UName,
                        UPassword: UPassword,
                        UGroup: UGroup,
                        UStatus: UStatus
                    },
                    dataType: 'json',
                    success: function (data) {
                        if (data == 10) {
                            swal("username already exists. Try Another!", "", "warning");
                        } else {
                            swal("Data Save Success!", "", "success");
                            Clear();
                            LoadAllBrowseData();
                        }
                    }, complete: function (data) {
                        $('#SaveBtn').prop('disabled', false);
                    }
                });
            }
        }
        else {
            $('#SaveBtn').prop('disabled', false);
        }
    });

    function Clear() {

        $("#txtEmployeeName").val("");
        $("#txtUserName").val("");
        $("#txtPassword").val("");
        $("#drpUserGroup").val("");
        $("#drpUserStatus").val("");

    }

    $("#cancelBtn").on('click', function () {
        location.reload(true);
    });

    $("#Browsebtn").on('click', function () {

        $('#schpanel').show();

        LoadAllBrowseData();

        $("#txtPassword").attr("placeholder", "Keep this field empty if not updating the password(When updating)");

    });

    function LoadAllBrowseData() {
        $.ajax({
            url: LoadAllBrowseDataURL,
            type: 'POST',
            data: {},
            dataType: 'json',
            success: function (data) {

                var options = '';
                options += '<option selected="selected" value="">--Select--</option>';
                $(data).each(function (key, val) {
                    options += '<option attr_emp_id="' + val.employeeName + '" attr_user_group="' + val.userGroup + '" attr_user_status="' + val.status + '" attr_user_name="' + val.userName + '" value="' + val.userId + '">' + val.employeeName + " - " + val.userName + '</option>';
                });

                $("#drpSchEmpDet").html("");
                $("#drpSchEmpDet").html(options);

            }
        });
    }

    $("#drpSchEmpDet").on('change', function () {

        var ID = $("#drpSchEmpDet").val();
        var empID = $("#drpSchEmpDet option:selected").attr("attr_emp_id");
        var Ugroup = $("#drpSchEmpDet option:selected").attr("attr_user_group");
        var Ustatus = $("#drpSchEmpDet option:selected").attr("attr_user_status");
        var UuserName = $("#drpSchEmpDet option:selected").attr("attr_user_name");

        $("#txtUserName").val(UuserName);
        $("#txtEmployeeName").val(empID);
        $("#drpUserGroup").val(Ugroup);
        $("#drpUserStatus").val(Ustatus);

    });

});









