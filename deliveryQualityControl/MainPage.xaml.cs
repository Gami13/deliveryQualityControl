using System.Diagnostics;

namespace deliveryQualityControl;

public partial class MainPage : ContentPage
{

	public MainPage()
	{
		InitializeComponent();
		
		materialList.ItemsSource = Database.getListOfMaterials();
	}

async     void onTapped(object sender, EventArgs e )
    {
		var code= (((ViewCell)sender).BindingContext as ElementRow).code;
		
		

        await Shell.Current.GoToAsync($"//Element?code={code}");



    }
}

