using IMS.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using NBRO.Models;
using System;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Threading.Tasks;

namespace IMS.Controllers
{
    public class HomeController : Controller
    {
        public IActionResult Index()
        {
            //if (HttpContext.Session.GetInt32("UserSerial") != null)
            //{
                return View();
            //}
            //else
            //{
            //    return RedirectToAction("Index", "Login");
            //}
        }


        [HttpGet("/HomeController/LoadAuthorTableData")]
        public JsonResult LoadAuthorTableData(DataTableParams param)
        {
            using (IMSContext db = new IMSContext())
            {
                var List = (from Author in db.AuthorDetails
                            join Book in db.BookDetails on Author.AuthorSerial equals Book.AuthorSerial
                            where Author.Status == "Active"
                            select new
                            {
                                authorName = Author.Title+'.'+Author.FirstName+' '+ Author.LastName,
                                bookTitle = Book.BookTitle,
                                bookName = Book.BookName
                            }).ToList();


                if (!string.IsNullOrEmpty(param.sSearch))
                {
                    List = List.Where(x => x.bookTitle.ToLower().Contains(param.sSearch.ToLower())
                                                  || x.authorName.ToLower().Contains(param.sSearch.ToLower())).ToList();
                }

                //var sortColumnIndex = Convert.ToInt32(HttpContext.Request.QueryString["iSortCol_0"]);
                //var sortDirection = HttpContext.Request.QueryString["sSortDir_0"];
                var displayResult = List;
                if (param.iDisplayLength != -1)
                {
                    displayResult = List.Skip(param.iDisplayStart).Take(param.iDisplayLength).ToList();
                }

                var totalRecords = List.Count();

                return Json(new
                {
                    param.sEcho,
                    iTotalRecords = totalRecords,
                    iTotalDisplayRecords = totalRecords,
                    aaData = displayResult,
                });
            }

        }

    }
}
