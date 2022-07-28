using System;
using System.Collections.Generic;

namespace IMS.Models
{
    public partial class UserGroup
    {
        public int UserGroupId { get; set; }
        public string UserGroupName { get; set; }
        public int? Cby { get; set; }
        public DateTime? Cdate { get; set; }
    }
}
