package com.example.ecom;

import android.content.Context;
import android.net.Uri;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.ArrayAdapter;
import android.widget.ImageView;
import android.widget.TextView;

import com.squareup.picasso.Picasso;

import java.util.ArrayList;

public class SuggestAdapter extends ArrayAdapter<ItemModel> implements View.OnClickListener {

    private ArrayList<ItemModel> items;
    Context context;


    public SuggestAdapter(Context context, int resource, ArrayList<ItemModel> data) {
        super(context, resource, data);
        this.items = data;
        this.context = context;
    }
///*
    @Override
    public void onClick(View v) {
        System.out.println("WHAT");
        ///*
        int position = (Integer) v.getTag();
        Object object = getItem(position);
        ItemModel itemModel = (ItemModel) object;

        switch (v.getId()) {
            case R.id.resultPic:
                System.out.println("Clicked!");
                break;
        }
        //*/
    }
    private int lastPosition = -1;
//*/
    public View getView(int position, View convertView, ViewGroup parent) {
        if (convertView == null) {
            LayoutInflater inf;
            inf = LayoutInflater.from(context);
            convertView = inf.inflate(R.layout.marketlisted,null);
            System.out.println("position: " + position);
            ((TextView) convertView.findViewById(R.id.resultTitle)).setText(items.get(position).title);
            Picasso.get().load(items.get(position).prodPic).into(((ImageView) convertView.findViewById(R.id.resultPic)));
            ((TextView) convertView.findViewById(R.id.resultPrice)).setText("$" + String.valueOf(items.get(position).price));
            ((TextView) convertView.findViewById(R.id.resultId)).setText(String.valueOf(items.get(position).product_id));
            //((TextView) convertView.findViewById(R.id.resultPrice)).setText("Chpea");


        }

        return convertView;
    }



}
