using System;
using System.Collections.Generic;

namespace IMS.Models
{
    public partial class UserPermissionMaster
    {
        public int PermissionSerial { get; set; }
        public string PermissionName { get; set; }
        public string PermissionValue { get; set; }
        public int PermissionOrder { get; set; }
    }
}
