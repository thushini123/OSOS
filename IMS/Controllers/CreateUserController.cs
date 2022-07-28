using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS.Models;
using Microsoft.AspNetCore.Cors;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace ISM.Controllers
{
    public class CreateUserController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost("CreateUserController/loadUG")]
        public ActionResult loadUG()
        {
            using (IMSContext db = new IMSContext())
            {
                var list = db.UserGroups.Select(i => new { i.UserGroupId, i.UserGroupName })
                    .OrderBy(x => x.UserGroupName).ToList();
                return Json(list);
            }
        }

        [HttpPost("CreateUserController/LoadAllBrowseData")]
        public ActionResult LoadAllBrowseData()
        {
            using (IMSContext db = new IMSContext())
            {
                var list = (from UserMasters in db.UserMasters
                            orderby UserMasters.EmployeeName
                            select new
                            {
                                UserId = UserMasters.UserId,
                                UserName = UserMasters.UserName ?? "",
                                UserGroup = UserMasters.UserGroup,
                                Status = UserMasters.Status ?? "",
                                EmployeeName = UserMasters.EmployeeName ?? "",
                            }).ToList();

                return Json(list);
            }
        }

        [HttpPost("CreateUserController/SaveUser")]
        public ActionResult SaveUser(string EmpName, string UName, string UPassword, int UGroup, string UStatus)
        {
            using (IMSContext db = new IMSContext())
            {
                var result = 0;
                var cby = HttpContext.Session.GetInt32("UserSerial") ?? 0;

                int c = db.UserMasters.Where(x => x.UserName == UName).Count();

                if (c > 0)
                {
                    result = 10;
                }
                else
                {
                    string passwordHash = BCrypt.Net.BCrypt.HashPassword(UPassword);
                    UPassword = passwordHash;

                    UserMaster data = new UserMaster
                    {
                        UserName = UName,
                        Password = UPassword,
                        EmployeeName = EmpName,
                        UserGroup = UGroup,
                        Status = UStatus,
                        Cby = cby,
                        Cdate = DateTime.Now,
                        Mby = cby,
                        Mdate = DateTime.Now
                    };

                    db.UserMasters.Add(data);

                    result = db.SaveChanges();
                }

                return Json(result);
            }
        }

        [HttpPost("CreateUserController/UpdateUser")]
        public ActionResult UpdateUser(int LookupID, string EmpName, string UName, string UPassword, int UGroup, string UStatus)
        {
            using (IMSContext db = new IMSContext())
            {
                var UserSerial = HttpContext.Session.GetInt32("UserSerial") ?? 0;
                var result = 0;
                
                var check = (from UserMaster in db.UserMasters
                             join UserGroupMaster in db.UserGroups on UserMaster.UserGroup equals UserGroupMaster.UserGroupId into g
                             from UserGroupMaster in g.DefaultIfEmpty()
                             where UserMaster.UserId == LookupID
                             select new
                             {
                                 UserMaster.UserName,
                                 UserMaster.Password,
                                 UserMaster.UserId,
                                 UserMaster.EmployeeName,
                                 UserMaster.UserGroup,
                                 groupName = UserGroupMaster.UserGroupName
                             }).SingleOrDefault();

                if (check != null)
                {
                    if (UPassword != "" && UPassword != null)
                    {
                        string NewPassword = BCrypt.Net.BCrypt.HashPassword(UPassword);

                        var cc = db.UserMasters.Where(x => x.UserId == LookupID).SingleOrDefault();
                        cc.Password = NewPassword;
                        cc.UserGroup = UGroup;
                        cc.EmployeeName = EmpName;
                        cc.Status = UStatus;
                        cc.Mby = UserSerial;
                        cc.Mdate = DateTime.Now;
                        result = db.SaveChanges();
                    }
                    else {
                        var cc = db.UserMasters.Where(x => x.UserId == LookupID).SingleOrDefault();
                        cc.UserGroup = UGroup;
                        cc.EmployeeName = EmpName;
                        cc.Status = UStatus;
                        cc.Mby = UserSerial;
                        cc.Mdate = DateTime.Now;
                        result = db.SaveChanges();

                    }

                }
                
                return Json(result);
            }
        }

    }
}
