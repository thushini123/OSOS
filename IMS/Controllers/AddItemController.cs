using IMS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Controllers
{
    public class AddItemController : Controller
    {
        public IActionResult Index()
        {
            return View();
        }

        [HttpPost("/AddItemController/SaveItemData")]
        public ActionResult SaveItemData(string ItemId, string ItemName, string BatchNo, DateTime? ExpDate, int Quantity)
        {
            using (IMSContext db = new IMSContext())
            {
                var result = 0;
                var UserSerial = HttpContext.Session.GetInt32("UserSerial") ?? 0;

                int c = db.ItemMasters.Where(x => x.ItemId == ItemId).Count();

                if (c > 0)
                {
                    result = 10;
                }
                else
                {
                    ItemMaster data = new ItemMaster
                    {
                        ItemId = ItemId,
                        ItemName = ItemName,
                        BatchNo = BatchNo,
                        ExpDate = ExpDate,
                        Qty = Quantity,
                        Cby = UserSerial,
                        Cdate = DateTime.Now,
                    };

                    db.ItemMasters.Add(data);
                    result = db.SaveChanges();
                }

                return Json(result);
            }
        }
    }
}
