using System;
using System.Collections.Generic;

namespace IMS.Models
{
    public partial class AuthorDetail
    {
        public int AuthorSerial { get; set; }
        public string Title { get; set; }
        public string FirstName { get; set; }
        public string LastName { get; set; }
        public string Country { get; set; }
        public string Status { get; set; }
        public string Email { get; set; }
        public DateTime? Cdate { get; set; }
    }
}
