using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using IMS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;

namespace IMS.Controllers
{
    public class BookDetailsController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

       

        [HttpPost("/BookDetailsController/SaveItemData")]
        public ActionResult SaveItemData(int AuthorSerial, string BookTitle, string BookName, string ImageDoc)
        {
            using (IMSContext db = new IMSContext())
            {
                var result = 0;


                BookDetail data = new BookDetail
                {
                    AuthorSerial = AuthorSerial,
                    BookTitle = BookTitle,
                    BookName = BookName,
                    ImageDoc = ImageDoc,
                    Cdate = DateTime.Now,
                };

                db.BookDetails.Add(data);
                result = db.SaveChanges();


                return Json(result);
            }
        }

        [HttpPost("/BookDetailsController/LoadItemData")]
        public ActionResult LoadItemData()
        {
            using (IMSContext db = new IMSContext())
            {

                var list = (from x in db.AuthorDetails
                            where x.Status == "Active"
                            select new

                            {
                                authorSerial=x.AuthorSerial,
                                name = x.Title + "." + x.FirstName + " " + x.LastName

                            }).ToList();

                return Json(list);
            }
        }



        [HttpPost("/BookDetailsController/LoadData")]
        public ActionResult LoadData(int AuthorSerial)
        {
            using (IMSContext db = new IMSContext())
            {

                var list = (from x in db.BookDetails
                            where x.AuthorSerial == AuthorSerial
                            select new

                            {
                               bookname= x.BookName,
                               booktitle=x.BookTitle,
                               image=x.ImageDoc

                            }).ToList();

                return Json(list);
            }
        }
    }
}
