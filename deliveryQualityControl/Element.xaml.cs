using Microsoft.Maui.Controls;
using System.Diagnostics;
using System.Web;

namespace deliveryQualityControl;

public partial class Element : ContentPage, IQueryAttributable
{
    public string code { get; set; }


	public Element()
	{
		InitializeComponent();

        propertyList.ItemsSource = Database.getListOfProperties(code);

    }


    public void ApplyQueryAttributes(IDictionary<string, object> query)
    {
        code = HttpUtility.UrlDecode(query["code"].ToString());
        Debug.WriteLine(code);
        propertyList.ItemsSource = Database.getListOfProperties(code);

        OnPropertyChanged("code");

    }
    async void onTapped(object sender, EventArgs e)
    {
        // var code = (((ViewCell)sender).BindingContext as ElementRow).code;



        // await Shell.Current.GoToAsync($"//Element?code={code}");
        Debug.WriteLine("tapperino tapperino");



    }
}

