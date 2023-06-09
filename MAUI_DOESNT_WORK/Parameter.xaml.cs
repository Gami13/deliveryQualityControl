﻿namespace deliveryQualityControl;

public partial class Parameter : ContentPage
{
    int count = 0;

    public Parameter()
    {
        InitializeComponent();
    }

    private void OnCounterClicked(object sender, EventArgs e)
    {
        count++;

        if (count == 1)
            CounterBtn.Text = $"Clicked {count} time";
        else
            CounterBtn.Text = $"Clicked {count} times";

        Database.test();
        SemanticScreenReader.Announce(CounterBtn.Text);
    }
}

