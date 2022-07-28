using System;
using System.Collections.Generic;

namespace IMS.Models
{
    public partial class ItemMaster
    {
        public int ItemSerial { get; set; }
        public string ItemId { get; set; }
        public string ItemName { get; set; }
        public int SupplierSerial { get; set; }
        public string BatchNo { get; set; }
        public DateTime? ExpDate { get; set; }
        public int Qty { get; set; }
        public int Cby { get; set; }
        public DateTime Cdate { get; set; }

        public virtual SupplierMaster SupplierSerialNavigation { get; set; }
    }
}
