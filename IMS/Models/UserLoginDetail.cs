using System;
using System.Collections.Generic;

namespace IMS.Models
{
    public partial class UserLoginDetail
    {
        public int LoginId { get; set; }
        public int? UserId { get; set; }
        public DateTime? LoginDataTime { get; set; }
    }
}
