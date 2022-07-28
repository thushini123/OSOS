using System;
using System.Collections.Generic;

namespace IMS.Models
{
    public partial class SupplierMaster
    {
        public SupplierMaster()
        {
            ItemMasters = new HashSet<ItemMaster>();
        }

        public int SupplierSerial { get; set; }
        public string SupplierId { get; set; }
        public string SupplierName { get; set; }
        public string SupplierAddress { get; set; }
        public string Email { get; set; }
        public int Cby { get; set; }
        public DateTime Cdate { get; set; }

        public virtual ICollection<ItemMaster> ItemMasters { get; set; }
    }
}
