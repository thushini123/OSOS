using System;
using System.Collections.Generic;

namespace IMS.Models
{
    public partial class UserGroupPermission
    {
        public int GroupPermissionSerial { get; set; }
        public int PermissionMasterSerial { get; set; }
        public int GroupMasterSerial { get; set; }
        public string ReadOnly { get; set; }
        public string ReadAndWrite { get; set; }
    }
}
