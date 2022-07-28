using System;
using System.Collections.Generic;

namespace IMS.Models
{
    public partial class BookDetail
    {
        public int BookSerial { get; set; }
        public int? AuthorSerial { get; set; }
        public string BookTitle { get; set; }
        public string BookName { get; set; }
        public string ImageDoc { get; set; }
        public DateTime? Cdate { get; set; }
    }
}
