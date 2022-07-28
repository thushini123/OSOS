using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace NBRO.Models
{
    public class CommonModels
    {
        public static Int32 IntegerConvertZero(string value)
        {
            Int32 num;
            if (Int32.TryParse(value, out num))
                return num;
            else
                return 0;
        }

        public static int? IntegerConvert(string value)
        {
            Int32 num;
            if (Int32.TryParse(value, out num))
                return num;
            else
                return null;
        }

        public static Decimal DecimalConvertZero(string value)
        {
            Decimal num;
            if (Decimal.TryParse(value, out num))
                return num;
            else
                return 0;
        }

        public static Decimal? DecimalConvert(string value)
        {
            Decimal num;
            if (Decimal.TryParse(value, out num))
                return num;
            else
                return null;
        }

        public static DateTime? DateConvert(string date)
        {
            DateTime dt;
            if (DateTime.TryParse(date, out dt))
                return dt;
            else
                return null;
        }

    }
}
