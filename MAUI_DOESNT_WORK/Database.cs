using Dapper;
using MySqlConnector;
using System.Data;
using System.Diagnostics;
using System.Globalization;
namespace deliveryQualityControl
{

    public class ElementRow
    {
        public int id { get; }
        public string code { get; }
        public string property { get; set; }
        public string propertySymbol { get; }
        public string propertySecond { get; }
        public string propertySecondSymbol { get; }
        public string propertiesOperation { get; }
        public string propertyUnit { get; }
        public double rangeFrom { get; }
        public double rangeTo { get; }
        public string rangeUnit { get; }
        public string rangeProperty { get; }
        public string rangePropertySymbol { get; }
        public double toleranceStart { get; }
        public double toleranceEnd { get; }
        public string toleranceUnit { get; }
        public string toleranceProperty { get; }
        public string tolerancePropertySymbol { get; }
        public string illustration { get; }
        public double toleranceStartAgreement { get; }
        public double toleranceEndAgreement { get; }
        public string name { get; set; }
    }


    public class Database
    {

        //static IDbConnection db = new SqlConnection("Server=localhost;Database=QualityControl;User=sa;Password=haslo123;TrustServerCertificate=True");

        static IDbConnection db = new MySqlConnection("Server=containers-us-west-54.railway.app;Port=6708;Database=railway;Uid=root;Pwd=RQb4CN36KShQkeTdgcQa;SslMode=Preferred");
        static TextInfo textInfo = new CultureInfo("pl-PL", false).TextInfo;
        public static void test()
        {
            Debug.WriteLine(getListOfRanges("PN-EN 10024", "prostość").FirstOrDefault().propertySymbol);
        }
        public static List<ElementRow> getListOfMaterials()
        {


            List<ElementRow> query = db.Query<ElementRow>("SELECT elements.code, elements.name FROM elements GROUP BY code, name").ToList();
            for (int i = 0; i < query.Count; i++)
            {
                query[i].name = string.Format(textInfo.ToTitleCase(query[i].name.ToLower()));
            }

            return query;

        }
        public static List<ElementRow> getListOfProperties(string code)
        {
            List<ElementRow> query = db.Query<ElementRow>("SELECT DISTINCT elements.property FROM elements WHERE code = @code", new Dictionary<string, object>
{ {"code",code } }).ToList();

            Debug.WriteLine(query.Count);
            for (int i = 0; i < query.Count; i++)
            {
                query[i].property = string.Format(textInfo.ToTitleCase(query[i].property.ToLower()));
            }
            return query;

        }
        public static List<ElementRow> getListOfRanges(string code, string property)
        {


            List<ElementRow> query = db.Query<ElementRow>("SELECT* FROM elements WHERE code = @code AND property = @property", new Dictionary<string, object>
{ {"code",code}, {"property",property } }).ToList();
            return query;
        }
    }
}