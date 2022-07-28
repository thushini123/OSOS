using IMS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Controllers
{
    public class AuthorDetailsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }
        [HttpPost("/AuthorDetailsController/SaveItemData")]
        public ActionResult SaveItemData(string Title, string FirstName, string LastName, string Country,string Status, string Email)
        {
            using (IMSContext db = new IMSContext())
            {
                var result = 0;


            AuthorDetail data = new AuthorDetail
            {
                Title = Title,
                FirstName = FirstName,
                LastName = LastName,
                Country = Country,
                Status = Status,
                Email = Email,
                Cdate = DateTime.Now,
            };

            db.AuthorDetails.Add(data);
            result = db.SaveChanges();


            return Json(result);
        }
    }

    }
}
