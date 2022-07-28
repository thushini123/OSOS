using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using IMS.Models;
using Newtonsoft.Json.Linq;
using Newtonsoft.Json;

namespace ISM.Controllers
{
    public class CreateUserGroupController : Controller
    {
        public IActionResult Index()
        {
            //return View();
            using (IMSContext db = new IMSContext())
            {
                if (HttpContext.Session.GetInt32("UserSerial") == null)
                {
                    return RedirectToAction("Index", "Login");
                }
                else
                {
                    var cby = HttpContext.Session.GetInt32("UserSerial");
                    var page = this.ControllerContext.RouteData.Values["controller"].ToString();
                    var usergroup = HttpContext.Session.GetInt32("UserGroup");
                    
                    var per = db.UserPermissionMasters.Where(x => x.PermissionValue == page).Select(i => new { i.PermissionSerial }).SingleOrDefault();
                    var userPermission = per.PermissionSerial;

                    var readOnly = db.UserGroupPermissions.Where(x => x.PermissionMasterSerial == userPermission && x.GroupMasterSerial == usergroup).Select(i => new { i.ReadOnly }).SingleOrDefault();
                    var readWrite = db.UserGroupPermissions.Where(x => x.PermissionMasterSerial == userPermission && x.GroupMasterSerial == usergroup).Select(i => new { i.ReadAndWrite }).SingleOrDefault();

                    if (readOnly == null && readWrite == null)
                    {
                        HttpContext.Session.SetString("UserPerReadOnly", "");
                        return RedirectToAction("Index", "Home");
                    }
                    else if (readOnly.ReadOnly == "true")
                    {
                        HttpContext.Session.SetString("UserPerReadOnly", "true");
                        return View();
                    }
                    else if (readWrite.ReadAndWrite == "true")
                    {
                        HttpContext.Session.SetString("UserPerReadOnly", "");
                        return View();
                    }
                    else
                    {
                        HttpContext.Session.SetString("UserPerReadOnly", "");
                        return RedirectToAction("Index", "Home");
                    }
                }
            }
        }

        [HttpPost("CreateUserGroupController/LoadUserGroups")]
        public ActionResult LoadUserGroups()
        {
            using (IMSContext db = new IMSContext())
            {
                var list = (from userGroups in db.UserGroups
                            select new
                            {
                                userGroupSerial = userGroups.UserGroupId,
                                userGroupName = userGroups.UserGroupName
                            }).ToList();

                return Json(list);
            }
        }

        [HttpPost("CreateUserGroupController/LoadUserGroupPermissions")]
        public ActionResult LoadUserGroupPermissions(int groupSerial)
        {
            using (IMSContext db = new IMSContext())
            {
                var list = (from permissionMaster in db.UserPermissionMasters
                            join userGroupPermission in db.UserGroupPermissions on permissionMaster.PermissionSerial equals userGroupPermission.PermissionMasterSerial into a
                            from userGroupPermission in a.DefaultIfEmpty()
                            where userGroupPermission.GroupMasterSerial == groupSerial
                            select new
                            {
                                userGroupPermissionSerial = userGroupPermission.GroupPermissionSerial,
                                permissionName = permissionMaster.PermissionName ?? "",
                                permissionSerial = permissionMaster.PermissionSerial,
                                readOnly = userGroupPermission.ReadOnly ?? "",
                                readAndWrite = userGroupPermission.ReadAndWrite ?? ""
                            }).ToList();

                return Json(list);

            }
        }

        [HttpPost("CreateUserGroupController/LoadPermissions")]
        public ActionResult LoadPermissions()
        {
            using (IMSContext db = new IMSContext())
            {
                var list = (from permissionMaster in db.UserPermissionMasters
                            orderby permissionMaster.PermissionOrder 
                            select new
                            {
                                permissionName = permissionMaster.PermissionName ?? "",
                                permissionSerial = permissionMaster.PermissionSerial

                            }).ToList();

                return Json(list);


            }
        }

        [HttpPost("CreateUserGroupController/SaveUserGroupPermissions")]
        public ActionResult SaveUserGroupPermissions(int GroupSerial, string arrayPermissionMaster)
        {
            using (IMSContext db = new IMSContext())
            {
                var result = 0;
                var UserSerial = HttpContext.Session.GetInt32("UserSerial");

                //Start --- Permission Data Save and Update..
                JArray jPermissionDetails = JsonConvert.DeserializeObject<JArray>(arrayPermissionMaster);
                var CountAssignDetails = jPermissionDetails.Count();

                if (CountAssignDetails > 0)
                {
                    foreach (var rowPermissionDetails in jPermissionDetails)
                    {
                        var result2 = 0;
                        var UserGroupPermissionSerial = Convert.ToInt32(rowPermissionDetails[0]);
                        var PermissionMasterSerial = Convert.ToInt32(rowPermissionDetails[1]);
                        var ReadOnly = rowPermissionDetails[2].ToString();
                        var ReadAndWrite = rowPermissionDetails[3].ToString();

                        if (UserGroupPermissionSerial == 0)
                        {//Save...
                            
                            using (IMSContext db2 = new IMSContext())
                            {
                                UserGroupPermission userPermissions = new UserGroupPermission()
                                {
                                    PermissionMasterSerial = PermissionMasterSerial,
                                    GroupMasterSerial = GroupSerial,
                                    ReadOnly = ReadOnly,
                                    ReadAndWrite = ReadAndWrite
                                };

                                db2.UserGroupPermissions.Add(userPermissions);
                                result2 = db2.SaveChanges();
                            }

                            if (result2 > 0)
                            {
                                result = 1;
                            }
                        }
                        else 
                        { //Update Permission...
                            using (IMSContext db3 = new IMSContext())
                            {
                                var cc = db3.UserGroupPermissions.Where(x => x.GroupPermissionSerial == UserGroupPermissionSerial).SingleOrDefault();
                                cc.ReadOnly = ReadOnly;
                                cc.ReadAndWrite = ReadAndWrite;
                                result2 = db3.SaveChanges();
                            }

                            if (result2 > 0)
                            {
                                result = 1;
                            }
                        }
                    }
                }
                //End --- Permission Data Save Update..

                return Json(result);
            }
        }

        [HttpPost("CreateUserGroupController/SaveUserGroups")]
        public ActionResult SaveUserGroups(string usergroup)
        {
            using (IMSContext db = new IMSContext())
            {
                var result = 0;
                var UserSerial = HttpContext.Session.GetInt32("UserSerial");
                var qry = db.UserGroups.Where(x => x.UserGroupName == usergroup).Count();
                if (qry == 0)
                {

                    using (IMSContext db2 = new IMSContext())
                    {
                        UserGroup data = new UserGroup()
                        {
                            UserGroupName = usergroup,
                            Cby = UserSerial,
                            Cdate = DateTime.Now,
                        };

                        db2.UserGroups.Add(data);
                        result = db2.SaveChanges();
                    }
                }
                else
                {
                    result = 4;
                }

                return Json(result);
            }
        }

    }
}
