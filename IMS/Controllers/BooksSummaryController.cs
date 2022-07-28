using IMS.Models;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Controllers
{
    public class BooksSummaryController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost("/BooksSummaryController/LoadBookItemData")]
        public ActionResult LoadBookItemData()
        {
            using (IMSContext db = new IMSContext())
            {

                var list = (from x in db.AuthorDetails
                            join y in db.BookDetails on x.AuthorSerial equals y.AuthorSerial
                            where x.Status == "Active"
                            group x by new { x.Title, x.FirstName ,x.LastName} into gp
                            select new
                               {
                                   name = gp.Key.Title+'.'+ gp.Key.FirstName + ' '+ gp.Key.LastName, 
                                   noofbook = gp.Count()
                               }).OrderBy(a => a.noofbook).ToList();

                return Json(list);
            }
        }
    }
}
