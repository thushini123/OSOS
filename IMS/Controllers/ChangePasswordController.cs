using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace ISM.Controllers
{
    public class ChangePasswordController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost("ChangePasswordController/CheckOldPassword")]
        public ActionResult CheckOldPassword(string oldPassword)
        {
            using (IMSContext db = new IMSContext())
            {
                var result = 0;
                var UserSerial = HttpContext.Session.GetInt32("UserSerial");
                var EmployeePkSerial = HttpContext.Session.GetInt32("EmployeeSerial");
                var UserName = HttpContext.Session.GetString("UserName");

                var check = (from UserMaster in db.UserMasters
                             where UserMaster.UserName == UserName && UserMaster.Status == "Active"
                             select new
                             {
                                 UserMaster.UserName,
                                 UserMaster.Password,
                                 UserMaster.UserId,
                                 UserMaster.EmployeeName,
                                 UserMaster.UserGroup
                             }).SingleOrDefault();

                bool verified = BCrypt.Net.BCrypt.Verify(oldPassword, check.Password);

                if (verified) {
                    result = 1;
                }

                return Json(result);
            }
        }

        [HttpPost("ChangePasswordController/UpdateNewPassword")]
        public ActionResult UpdateNewPassword(string newPassword, string confirmNewPassword)
        {
            using (IMSContext db = new IMSContext())
            {
                var result = 0;
                var UserSerial = HttpContext.Session.GetInt32("UserSerial");
                var UserName = HttpContext.Session.GetString("UserName");

                if (String.Equals(newPassword, confirmNewPassword))
                {
                    string passwordNewHash = BCrypt.Net.BCrypt.HashPassword(newPassword);

                    //Check whether if exist any notification for data Sheet..
                    if (db.UserMasters.Where(x => x.UserName == UserName && x.Status == "Active").Any())
                    {
                        var cc = db.UserMasters.Where(x => x.UserName == UserName && x.Status == "Active").SingleOrDefault();

                        cc.Password = passwordNewHash;
                        cc.Mby = UserSerial;
                        cc.Mdate = DateTime.Now;

                        result = db.SaveChanges();
                    }
                }
                else {
                    result = -1;
                }
                
                return Json(result);
            }
        }

    }
}
