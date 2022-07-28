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
    public class EditItemController : Controller
    {
        public IActionResult Index()
        {
            if (HttpContext.Session.GetString("EditItemPer") == "true")
            {
                return View();
            }
            else
            {
                return RedirectToAction("Index", "Login");
            }
        }

        [HttpPost("/EditItemController/LoadItemsIds")]
        public ActionResult LoadItemsIds()
        {
            using (IMSContext db = new IMSContext())
            {
                var list = db.ItemMasters.Select(i => new { i.ItemSerial, i.ItemId, i.ItemName }).OrderBy(x => x.ItemId).ToList();

                return Json(list);
            }
        }

        [HttpPost("/EditItemController/LoadItemData")]
        public ActionResult LoadItemData(int itemSerial)
        {
            using (IMSContext db = new IMSContext())
            {
                var list = (from itemMaster in db.ItemMasters
                            where itemMaster.ItemSerial == itemSerial
                            select new
                            {
                                itemSerial = itemMaster.ItemSerial,
                                itemId = itemMaster.ItemId,
                                itemName = itemMaster.ItemName,
                                batchNo = itemMaster.BatchNo,
                                expDate = String.Format("{0:yyyy-MM-dd}", itemMaster.ExpDate),
                                qty = itemMaster.Qty

                            }).FirstOrDefault();

                return Json(list);
            }
        }

        [HttpPost("/EditItemController/UpdateItemData")]
        public ActionResult UpdateItemData(int ItemSerial, string ItemName, string BatchNo, DateTime? ExpDate, int Quantity)
        {
            using (IMSContext db = new IMSContext())
            {
                var result = 0;
                var UserSerial = HttpContext.Session.GetInt32("UserSerial") ?? 0;

                if (ItemSerial != 0)
                {
                    var c = db.ItemMasters.Where(x => x.ItemSerial == ItemSerial).SingleOrDefault();

                    c.ItemName = ItemName;
                    c.BatchNo = BatchNo;
                    c.ExpDate = ExpDate;
                    c.Qty = Quantity;
                    c.Cby = UserSerial;
                    c.Cdate = DateTime.Now;

                    result = db.SaveChanges();

                }

                return Json(result);
            }
        }

        [HttpPost("/EditItemController/LoadItemDataInPageLoad")]
        public ActionResult LoadItemDataInPageLoad()
        {
            var ItemSerial = HttpContext.Session.GetInt32("ItemSerial");

            if (ItemSerial != 0)
            {
                //Delete the Session object.
                HttpContext.Session.Remove("ItemSerial");
                return Json(ItemSerial);
            }
            else
            {
                return Json(null);
            }

        }

    }
}
