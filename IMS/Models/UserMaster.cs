using System;
using System.Collections.Generic;

namespace IMS.Models
{
    public partial class UserMaster
    {
        public int UserId { get; set; }
        public string UserName { get; set; }
        public string Password { get; set; }
        public string EmployeeName { get; set; }
        public int UserGroup { get; set; }
        public int Cby { get; set; }
        public DateTime Cdate { get; set; }
        public string Status { get; set; }
        public int? Mby { get; set; }
        public DateTime? Mdate { get; set; }
    }
}
