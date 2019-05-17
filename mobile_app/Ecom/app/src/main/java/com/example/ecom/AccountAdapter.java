package com.example.ecom;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.net.Uri;
import android.os.AsyncTask;
import android.support.design.widget.FloatingActionButton;
import android.view.LayoutInflater;
import android.view.View;
import android.view.ViewGroup;
import android.widget.Adapter;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.ImageView;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import com.amazonaws.mobileconnectors.cognitoidentityprovider.CognitoUserPool;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.handlers.GenericHandler;
import com.squareup.picasso.Picasso;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.util.ArrayList;
import java.util.concurrent.ExecutionException;
import java.util.concurrent.TimeUnit;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class AccountAdapter extends ArrayAdapter<UserAcc> /*implements View.OnClickListener*/ {

    private ArrayList<UserAcc> account; //Will be size of 1.
    Context context;
    ArrayList<String> posts = new ArrayList<String>();


    public AccountAdapter(Context context, int resource, ArrayList<UserAcc> data) {
        super(context, resource, data);
        this.account = data;
        this.context = context;
        posts = data.get(0).posts;
    }
    /*
        @Override
        public void onClick(View v) {
            int position = (Integer) v.getTag();
            Object object = getItem(position);
            ItemModel itemModel = (ItemModel) object;

            switch (v.getId()) {
                case R.id.searchResult:
                    System.out.println("Clicked!");
                    break;
            }
        }
        private int lastPosition = -1;
    */
    public View getView(int position, View convertView, ViewGroup parent) {
        System.out.println("VIEW GETTING");
        if (convertView == null) {
            LayoutInflater inf;
            inf = LayoutInflater.from(context);
            convertView = inf.inflate(R.layout.accountlisted,null);



            String username = account.get(0).username;


            ((TextView) convertView.findViewById(R.id.username)).setText(username);
            ArrayAdapter adapter = new ArrayAdapter(context,R.layout.post,R.id.watev,posts);
            ((ListView) convertView.findViewById(R.id.postsList)).setAdapter(adapter);










            ((FloatingActionButton)convertView.findViewById(R.id.signOutButton)).setOnClickListener(new View.OnClickListener() {
                @Override
                public void onClick(View v) {
                    Toast.makeText(context, username + " is logging out.",Toast.LENGTH_SHORT).show();
                    String userPoolId = "us-east-1_spzaa5D0b";
                    String clientId = "4da0jbchabac6ogu5q4g0uns54";
                    String clientSecret = "d3rq49st53tvsushni7s64kb0lbdrko16g6do18otj9hmfq0uck";
                    final CognitoUserPool userPool = new CognitoUserPool(context, userPoolId, clientId, clientSecret);
                    userPool.getUser(username).globalSignOutInBackground(signoutHandler);

                }
            });

        }

        return convertView;
    }

    GenericHandler signoutHandler = new GenericHandler() {
        @Override
        public void onSuccess() {
            Toast.makeText(context,"Signed out!",Toast.LENGTH_SHORT).show();

            Intent intent = new Intent(context,MarketActivity.class);
            getContext().startActivity(intent);
        }

        @Override
        public void onFailure(Exception exception) {
            Toast.makeText(context,"Failed to sign out!",Toast.LENGTH_SHORT).show();

            exception.printStackTrace();

        }
    };


}

