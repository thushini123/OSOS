using IMS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Controllers
{
    public class LoginController : Controller
    {
        private readonly ILogger<LoginController> _logger;

        public LoginController(ILogger<LoginController> logger)
        {
            _logger = logger;
        }

        public IActionResult Index()
        {
            return View();
        }

        //check user in login
        [HttpPost]
        public ActionResult LoginUser(string username, string password)
        {
            using (IMSContext db = new IMSContext())
            {
                //byte[] data1 = System.Text.Encoding.ASCII.GetBytes(password);
                //data1 = new System.Security.Cryptography.SHA256Managed().ComputeHash(data1);
                //String hash = System.Text.Encoding.ASCII.GetString(data1);


                //var name = "";
                var check = (from UserMaster in db.UserMasters
                             join UserGroupMaster in db.UserGroups on UserMaster.UserGroup equals UserGroupMaster.UserGroupId into g
                             from UserGroupMaster in g.DefaultIfEmpty()
                             where UserMaster.UserName == username && UserMaster.Status == "Active"
                             select new
                             {
                                 UserMaster.UserName,
                                 UserMaster.Password,
                                 UserMaster.UserId,
                                 UserMaster.EmployeeName,
                                 UserMaster.UserGroup,
                                 groupName = UserGroupMaster.UserGroupName
                             }).FirstOrDefault();


                HttpContext.Session.Clear();
                var result = 0;
                if (check != null)
                {
                    bool verified = BCrypt.Net.BCrypt.Verify(password, check.Password);

                    if(check.UserName.Equals(username) && verified)
                    {
                        HttpContext.Session.SetString("UserName", username);
                        HttpContext.Session.SetInt32("UserSerial", check.UserId);
                        HttpContext.Session.SetString("EmployeeName", check.EmployeeName);
                        HttpContext.Session.SetInt32("UserGroup", check.UserGroup);
                        HttpContext.Session.SetString("UserGroupName", check.groupName);

                        var list = (from UserGroupPermission in db.UserGroupPermissions
                                    join UserPermissionMaster in db.UserPermissionMasters on UserGroupPermission.PermissionMasterSerial equals UserPermissionMaster.PermissionSerial into g
                                    from UserPermissionMaster in g.DefaultIfEmpty()
                                    where UserGroupPermission.GroupMasterSerial == check.UserGroup
                                    select new
                                    {
                                        UserPermissionMaster.PermissionSerial,
                                        UserPermissionMaster.PermissionValue,
                                        UserGroupPermission.ReadAndWrite,
                                        UserGroupPermission.ReadOnly
                                    }).ToArray();

                        //save login details -------------------------------------
                        UserLoginDetail UserLoginDetail = new UserLoginDetail()
                        {
                            UserId = check.UserId,
                            LoginDataTime = DateTime.Now,
                        };

                        db.UserLoginDetails.Add(UserLoginDetail);
                        db.SaveChanges();

                        foreach (var per in list)
                        {
                            if (per.PermissionValue == "CreateUser" && (per.ReadAndWrite == "true" || per.ReadOnly == "true"))
                            {
                                HttpContext.Session.SetString("CreateUserPer", "true");
                                if (per.ReadAndWrite == "true")
                                {
                                    HttpContext.Session.SetString("CreateUserReadAndWritePer", "true");
                                }
                                else
                                {
                                    HttpContext.Session.SetString("CreateUserReadOnlyPer", "true");
                                }
                            }
                            else if (per.PermissionValue == "CreateUserGroup" && (per.ReadAndWrite == "true" || per.ReadOnly == "true"))
                            {
                                HttpContext.Session.SetString("CreateUserGroupPer", "true");
                                if (per.ReadAndWrite == "true")
                                {
                                    HttpContext.Session.SetString("CreateUserGroupReadAndWritePer", "true");
                                }
                                else
                                {
                                    HttpContext.Session.SetString("CreateUserGroupReadOnlyPer", "true");
                                }
                            }
                            else if (per.PermissionValue == "AuthorDetails" && (per.ReadAndWrite == "true" || per.ReadOnly == "true"))
                            {
                                HttpContext.Session.SetString("AuthorDetailsPer", "true");
                                if (per.ReadAndWrite == "true")
                                {
                                    HttpContext.Session.SetString("EditItemReadAndWritePer", "true");
                                }
                                else
                                {
                                    HttpContext.Session.SetString("EditItemReadOnlyPer", "true");
                                }
                            }
                            else if (per.PermissionValue == "BookDetails" && (per.ReadAndWrite == "true" || per.ReadOnly == "true"))
                            {
                                HttpContext.Session.SetString("BookDetailsPer", "true");
                                if (per.ReadAndWrite == "true")
                                {
                                    HttpContext.Session.SetString("AddItemReadAndWritePer", "true");
                                }
                                else
                                {
                                    HttpContext.Session.SetString("AddItemReadOnlyPer", "true");
                                }
                            }
                            else if (per.PermissionValue == "BooksSummary" && (per.ReadAndWrite == "true" || per.ReadOnly == "true"))
                            {
                                HttpContext.Session.SetString("BooksSummaryPer", "true");
                            }
                        
                        }

                        result = 1;
                    }
                }
                else
                {
                    HttpContext.Session.Clear();

                    result = 0;
                }

                return Json(result);
            }
        }

        [ResponseCache(Duration = 0, Location = ResponseCacheLocation.None, NoStore = true)]
        public IActionResult Error()
        {
            return View(new ErrorViewModel { RequestId = Activity.Current?.Id ?? HttpContext.TraceIdentifier });
        }

        //logout user
        [HttpPost]
        public ActionResult LogOut()
        {
            HttpContext.Session.Clear();
            return Json(1);
        }
    }
}
