package com.example.ecom;

import android.Manifest;
import android.app.Activity;
import android.content.ClipData;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.location.Location;
import android.location.LocationListener;
import android.location.LocationManager;
import android.os.AsyncTask;
import android.os.Bundle;
import android.provider.Settings;
import android.support.design.widget.CoordinatorLayout;
import android.support.design.widget.FloatingActionButton;
import android.support.design.widget.Snackbar;
import android.support.v4.app.ActivityCompat;
import android.support.v4.widget.SlidingPaneLayout;
import android.support.v4.widget.SwipeRefreshLayout;
import android.support.v7.app.AlertDialog;
import android.util.JsonReader;
import android.view.Gravity;
import android.view.KeyEvent;
import android.view.View;
import android.support.design.widget.NavigationView;
import android.support.v4.view.GravityCompat;
import android.support.v4.widget.DrawerLayout;
import android.support.v7.app.ActionBarDrawerToggle;
import android.support.v7.app.AppCompatActivity;
import android.support.v7.widget.Toolbar;
import android.view.Menu;
import android.view.MenuItem;
import android.view.inputmethod.EditorInfo;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;


import com.amazonaws.mobileconnectors.cognitoidentityprovider.CognitoUser;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.CognitoUserPool;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.handlers.GenericHandler;
import com.google.zxing.integration.android.IntentIntegrator;
import com.google.zxing.integration.android.IntentResult;


import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.ByteArrayOutputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.InputStreamReader;
import java.lang.reflect.Array;
import java.net.HttpURLConnection;
import java.net.URL;
import java.util.ArrayList;
import java.util.Iterator;

import javax.net.ssl.HttpsURLConnection;


import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

import static android.Manifest.permission.ACCESS_FINE_LOCATION;
import static android.Manifest.permission.SYSTEM_ALERT_WINDOW;

public class MarketActivity extends AppCompatActivity {
    boolean debug = false;
    Integer toggle;
    boolean templog = false;
    //Check if logged in.

    LocationManager locManager;
    Context mContext;
    String resJson;
    LocationListener llistener;
    String upc;
    String username;
    ArrayList<String> searchRes;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        toggle = 1;
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        mContext=this;

        CoordinatorLayout cLayout = findViewById(R.id.marketLayout);
        Snackbar.make(cLayout,"Your Catalog",Snackbar.LENGTH_SHORT).show();


        String userPoolId = "us-east-1_spzaa5D0b";
        String clientId = "4da0jbchabac6ogu5q4g0uns54";
        String clientSecret = "d3rq49st53tvsushni7s64kb0lbdrko16g6do18otj9hmfq0uck";
        final CognitoUserPool userPool = new CognitoUserPool(mContext, userPoolId, clientId, clientSecret);
        System.out.println(userPool.getCurrentUser().getUserId() + " is the userID.");
        username = getIntent().getStringExtra("username");
        System.out.println(username);
        /* temporarily disabled for debug*/

        if (username == null) {
            ///*
            Intent intent = new Intent(mContext,LoginActivity.class);
            startActivity(intent);
            //*/
            //username = "steve@snapchaching.com";
        } else {
            //Toast.makeText(mContext,"Logged in: " + userPool.getCurrentUser().getUserId(), Toast.LENGTH_LONG).show();
            System.out.println("Logged in: " + userPool.getCurrentUser().getUserId());
        }
        System.out.println("going");
        new SolrPostsThread().execute(username);
        suggest();



        ((SwipeRefreshLayout) findViewById(R.id.refreshLayout)).setOnRefreshListener(new SwipeRefreshLayout.OnRefreshListener() {
            @Override
            public void onRefresh() {
                recreate();
            }
        });
        FloatingActionButton accButton = (FloatingActionButton) findViewById(R.id.accFab);
        FloatingActionButton ownButton = (FloatingActionButton) findViewById(R.id.ownFab);
        accButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                /*
                //((SlidingPaneLayout)findViewById(R.id.SlidingPanel)).openPane();
                DrawerLayout drawer = (DrawerLayout)findViewById(R.id.drawer_layout);
                if (drawer.isDrawerOpen(GravityCompat.START)) {
                    drawer.closeDrawer(Gravity.LEFT);
                    drawer.closeDrawer(Gravity.RIGHT);
                    accButton.setImageResource(R.drawable.ic_account);
                } else {
                    drawer.openDrawer(Gravity.LEFT);
                    drawer.openDrawer(Gravity.RIGHT);
                    accButton.setImageResource(R.drawable.ic_market);

                }
                */
                DrawerLayout drawer = (DrawerLayout)findViewById(R.id.drawer_layout);
                if (drawer.isDrawerOpen(GravityCompat.START)) {
                    drawer.closeDrawer(Gravity.LEFT);
                    drawer.closeDrawer(Gravity.RIGHT);
                } else {
                    drawer.openDrawer(Gravity.LEFT);
                    drawer.openDrawer(Gravity.RIGHT);
                }

            }
        });

        final Context yah = this;
        FloatingActionButton scanButton = (FloatingActionButton) findViewById(R.id.scanFab);
        scanButton.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                new IntentIntegrator((Activity) yah).initiateScan();

            }
        });


        ((FloatingActionButton) findViewById(R.id.searchFab)).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ///*
                Intent intent = new Intent(mContext,SearchActivity.class);
                startActivity(intent);
                //*/

            }
        });
        ((FloatingActionButton) findViewById(R.id.ownFab)).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                if (toggle == 1) {
                    toggle = 0;
                    ownButton.setImageResource(R.drawable.ic_own);
                    Snackbar.make(cLayout,"Marketplace",Snackbar.LENGTH_SHORT).show();

                } else {
                    toggle = 1;
                    ownButton.setImageResource(R.drawable.ic_market);
                    Snackbar.make(cLayout,"Your Catalog",Snackbar.LENGTH_SHORT).show();

                }
                suggest();
            }
        });

        ((ListView)findViewById(R.id.suggestList)).setOnItemClickListener(new AdapterView.OnItemClickListener() {
            @Override
            public void onItemClick(AdapterView<?> parent, View view, int position, long id) {
                //System.out.println("YOU TUCH LIST" + id + " id position " + position + " and view: " + view);
                //Get the product_id from the position.
                //Use that to go to activity with product_id passed.
                Intent intent = new Intent(mContext,ItemActivity.class);
                intent.putExtra("product_id",((TextView) view.findViewById(R.id.resultId)).getText().toString());
                startActivity(intent);
                //
            }
        });

    }

    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {
        IntentResult result = IntentIntegrator.parseActivityResult(requestCode, resultCode,data);
        System.out.println("TEST123");
        if (result != null) {
            if (result.getContents() == null) {
                Toast.makeText(this,"Result not found",Toast.LENGTH_LONG).show();
            }
            else {
                try {

                    final String obj = result.getContents();
                    if (debug) {
                        LookupThreadBackup t = new LookupThreadBackup();
                        t.execute(obj,resJson);
                    } else {
                        LookupThread t = new LookupThread();
                        t.execute(obj,resJson);
                    }



                } catch (Exception e) {
                    e.printStackTrace();
                    Toast.makeText(this,result.getContents(),Toast.LENGTH_LONG).show();
                }



            }
        }
    }

    public class LookupThread extends AsyncTask<String,Void,String> {

        String result;
        protected String doInBackground(String... params) {
            try {

                    //String send = "http://146.95.77.23:8081/search?upc="; //Sends to server

                upc = params[0];
                //String search = "https://api.upcitemdb.com/prod/trial/lookup?upc="; //Locally searches
                String search = "https://0c4xhsl2gf.execute-api.us-east-1.amazonaws.com/default/UPCite-apu-dev-hello";
                MediaType JSON = MediaType.get("application/json; charset=utf-8");
///*
                OkHttpClient client = new OkHttpClient();

                JSONObject json = new JSONObject();
                json.put("upc",params[0]);
                System.out.println(json + " is json.");
                String url = search;
                RequestBody body = RequestBody.create(JSON, json.toString());
                Request request = new Request.Builder()
                        .url(url)
                        .post(body)
                        .build();
                client.newCall(request).enqueue(new Callback() {
                    @Override
                    public void onFailure(Call call, IOException e) {
                        call.cancel();
                    }

                    @Override
                    public void onResponse(Call call, Response response) throws IOException {
                        final String myResponse = response.body().string();
                        System.out.println("Response is2 " + myResponse);
                        if (myResponse.equals("\"Something went wrong\"") || myResponse.equals("\"The barcode scanned was invalid\"")) {
                            runOnUiThread(new Runnable() {
                                @Override
                                public void run() {
                                    Toast.makeText(mContext,"Error, not found!",Toast.LENGTH_SHORT).show();
                                }
                            });
                            return;
                        }

                        result = myResponse;

                        try {
                            JSONObject obj = new JSONObject(myResponse);
                            System.out.println(obj);
                            Intent intent = new Intent(mContext,ResultActivity.class);

                            if (obj.has("title")) {
                                intent.putExtra("Title", obj.getString("title"));
                            }
                            if (obj.has("size")) {
                                intent.putExtra("Size", obj.getString("size"));
                            }
                            if (obj.has("description")) {
                                intent.putExtra("Description", obj.getString("description"));
                            }

                            intent.putExtra("Description",obj.getString("description"));


                            if (obj.has("Qty")) {
                                intent.putExtra("Qty", obj.getString("Qty"));
                            }

                            if (obj.has("color")) {
                                intent.putExtra("Color", obj.getString("color"));
                            }
                            if (obj.has("weight")) {
                                intent.putExtra("Weight", obj.getString("weight"));
                            }
                            if (obj.has("brand")) {
                                intent.putExtra("Brand", obj.getString("brand"));
                            }
                            if (obj.has("gender")) {
                                intent.putExtra("Gender", obj.getString("gender"));
                            }
                            if (obj.has("zipcode")) {
                                intent.putExtra("zipcode", obj.getString("zipcode"));
                            }


                            if (!obj.getString("images").isEmpty()) {
                                System.out.println("has images");
                                JSONArray images = new JSONArray(obj.getString("images"));
                                System.out.println(images);
                                System.out.println(images.get(0).toString());

                                intent.putExtra("prodPic", images.get(0).toString());
                            }
                            else {
                                intent.putExtra("prodPic","Not Found");
                            }

                            intent.putExtra("username",getIntent().getStringExtra("username"));
                            intent.putExtra("upc",params[0]);
                            intent.putExtra("username",username);
                            startActivity(intent);

                        } catch(Exception e) {
                            System.out.println("An exception with json.");
                            e.printStackTrace();
                        }
                    }
                });
            } catch (Exception e) {
                e.printStackTrace();
            }
            return "hi";
        }
        protected void onPostExecute(String res) {
        }

    }

    public class LookupThreadBackup extends AsyncTask<String,Void,String> {

        String result;
        protected String doInBackground(String... params) {
            try {

                //String send = "http://146.95.77.23:8081/search?upc="; //Sends to server

                upc = params[0];
                String search = "https://api.upcitemdb.com/prod/trial/lookup?upc="; //Locally searches
                //String search = "https://0c4xhsl2gf.execute-api.us-east-1.amazonaws.com/default/UPCite-apu-dev-hello";
                MediaType JSON = MediaType.get("application/json; charset=utf-8");
                OkHttpClient client = new OkHttpClient();

                String url = search + params[0];
                //RequestBody body = RequestBody.create(JSON, json.toString());
                Request request = new Request.Builder()
                        .url(url)
                        .build();
                client.newCall(request).enqueue(new Callback() {
                    @Override
                    public void onFailure(Call call, IOException e) {
                        call.cancel();
                    }

                    @Override
                    public void onResponse(Call call, Response response) throws IOException {
                        final String myResponse = response.body().string();
                        System.out.println("Response is (Directly) " + myResponse);
                        result = myResponse;




                        try {
                            System.out.println("Result2: " + myResponse);
                            JSONObject obj = new JSONObject(myResponse);

                            Intent intent = new Intent(mContext,ResultActivity.class);

                            obj = new JSONArray(obj.getString("items")).getJSONObject(0);
                            intent.putExtra("title",obj.getString("title"));
                            System.out.println(obj.getString("title") + " is title.");
                            if (!obj.getString("images").isEmpty()) {
                                System.out.println("has images");
                                JSONArray images = new JSONArray(obj.getString("images"));
                                System.out.println(images);
                                System.out.println(images.get(0).toString());

                                intent.putExtra("prodPic", images.get(0).toString());
                            }
                            else {
                                intent.putExtra("prodPic","Not Found");
                            }

                            intent.putExtra("username",getIntent().getStringExtra("username"));
                            intent.putExtra("upc",params[0]);
                            startActivity(intent);

                        } catch(Exception e) {
                            System.out.println("An exception with json.");
                            e.printStackTrace();
                        }
                    }
                });
            } catch (Exception e) {
                e.printStackTrace();
            }
            return "hi";
        }
        protected void onPostExecute(String res) {

        }

    }

    public void suggest(/*Future functionality is personalized suggest*/) {
        System.out.println("Running Suggest!");
        SolrThread s = new SolrThread();
        s.execute();
    }
    public class SolrThread extends AsyncTask<String,Void,String> {
        String send;


        ArrayList<ItemModel> results = new ArrayList<ItemModel>();
        protected String doInBackground(String... params) {
            try {
                if (toggle == 0) {
                    send = "http://ec2-3-86-76-11.compute-1.amazonaws.com:8983/solr/itemcore/select?q=*:*";
                } else {
                    send = "http://ec2-3-86-76-11.compute-1.amazonaws.com:8983/solr/itemcore/select?q=Seller_id:" + username;
                }
                MediaType JSON = MediaType.get("application/json; charset=utf-8");
                OkHttpClient client = new OkHttpClient();

                String url = send;
                //RequestBody body = RequestBody.create(JSON, json.toString());
                Request request = new Request.Builder()
                        .url(url)
                        .build();
                client.newCall(request).enqueue(new Callback() {
                    @Override
                    public void onFailure(Call call, IOException e) {
                        call.cancel();
                    }

                    @Override
                    public void onResponse(Call call, Response response) throws IOException {
                        final String myResponse = response.body().string();
                        System.out.println("Response is (Directly) " + myResponse);
                        try {
                            JSONObject solrJson = new JSONObject(myResponse);
                            JSONArray docs = (solrJson.getJSONObject("response")).getJSONArray("docs");
                            System.out.println("docs is " + docs);
                            results = new ArrayList<ItemModel>();
                            ItemModel newItem;
                            if (docs.length() == 0) {
                                results.add(new ItemModel("Empty: Your scanned items will be posted here!","http://hdimages.org/wp-content/uploads/2017/03/placeholder-image10.jpg",0.0,"0"));
                            }
                            for (int i=0; i < docs.length(); i++) {
                                //Get the title, prodPic, and price.
                                String newTitle = docs.getJSONObject(i).getString("Title");
                                //System.out.println(docs.getJSONObject(i).getJSONArray("Img"));

                                //String newPic = "https://gamepedia.cursecdn.com/minecraft_gamepedia/2/2f/Dirt.png?version=761b4a23642de73507809c9e32dfd80b";
                                String newPic = docs.getJSONObject(i).getString("IMG");
                                double newPrice = docs.getJSONObject(i).getDouble("Price");
                                String product_id = docs.getJSONObject(i).getString("Product_id");

                                newItem = new ItemModel(newTitle,newPic,newPrice,product_id);
                                results.add(newItem);
                            }

                            System.out.println("doing the marketlisted " + results.size());
                            runOnUiThread(new Runnable() {
                                @Override
                                public void run() {
                                    System.out.println("results is size : " + results.size());
                                    SuggestAdapter adapter = new SuggestAdapter(mContext,R.layout.marketlisted,results);
                                    ((ListView)findViewById(R.id.suggestList)).setAdapter(adapter);
                                }
                            });

                        } catch(Exception e) {
                            e.printStackTrace();
                        }
                    }
                });
            } catch (Exception e) {
                e.printStackTrace();
            }
            return "hi";
        }
        protected void onPostExecute(String res) {


        }

    }
    ///*
    public class SolrPostsThread extends AsyncTask<String,Void,String> {
        String send = "http://ec2-3-86-76-11.compute-1.amazonaws.com:8983/solr/itemcore/select?q=Seller_id:";
        ArrayList<ItemModel> results = new ArrayList<ItemModel>();
        protected String doInBackground(String... params) {
            try {
                MediaType JSON = MediaType.get("application/json; charset=utf-8");
                OkHttpClient client = new OkHttpClient();

                String url = send + params[0];
                System.out.println("Sending out : " + url);
                Request request = new Request.Builder()
                        .url(url)
                        .build();
                client.newCall(request).enqueue(new Callback() {
                    @Override
                    public void onFailure(Call call, IOException e) {
                        call.cancel();
                    }

                    @Override
                    public void onResponse(Call call, Response response) throws IOException {
                        final String myResponse = response.body().string();
                        System.out.println("Response is (Only current user) " + myResponse);
                        try {
                            JSONObject solrJson = new JSONObject(myResponse);
                            JSONArray docs = (solrJson.getJSONObject("response")).getJSONArray("docs");
                            System.out.println("docs is " + docs);
                            //results = new ArrayList<ItemModel>();
                            ArrayList<String> titlesOnly = new ArrayList<String>();
                            //ItemModel newItem;
                            System.out.println("docs is right now: " + docs);
                            titlesOnly.add("Posts:");
                            for (int i=0; i < docs.length(); i++) {
                                //Get the title, prodPic, and price.
                                String newTitle = docs.getJSONObject(i).getString("Title");

                                titlesOnly.add(newTitle);
                            }
                            ArrayList<UserAcc> User = new ArrayList<UserAcc>();
                            System.out.println("doing the accountlisted");
                            User.add(new UserAcc(username,titlesOnly));
                            runOnUiThread(new Runnable() {
                                @Override
                                public void run() {
                                    AccountAdapter adapter = new AccountAdapter(mContext,R.layout.accountlisted,User);
                                    ((ListView) findViewById(R.id.left_drawer)).setAdapter(adapter);
                                }
                            });

                        } catch(Exception e) {
                            e.printStackTrace();
                        }
                    }
                });
            } catch (Exception e) {
                e.printStackTrace();
            }
            return "hi";
        }
        protected void onPostExecute(String res) {


        }

    }
    //*/
    public void search(String term) {
        System.out.println("Running search!");
        SolrSearchThread s = new SolrSearchThread();
        s.execute(term);
    }
    public class SolrSearchThread extends AsyncTask<String,Void,String> {
        String send = "http://ec2-3-86-76-11.compute-1.amazonaws.com:8983/solr/itemcore/select?q=Title:";

        protected String doInBackground(String... params) {
            searchRes = new ArrayList<String>();
            try {
                MediaType JSON = MediaType.get("application/json; charset=utf-8");
                OkHttpClient client = new OkHttpClient();

                String url = send + params[0] + "&fl=Title";
                //RequestBody body = RequestBody.create(JSON, json.toString());
                Request request = new Request.Builder()
                        .url(url)
                        .build();
                client.newCall(request).enqueue(new Callback() {
                    @Override
                    public void onFailure(Call call, IOException e) {
                        call.cancel();
                    }

                    @Override
                    public void onResponse(Call call, Response response) throws IOException {
                        final String myResponse = response.body().string();
                        System.out.println("Response is (Directly) " + myResponse);
                        try {
                            JSONObject solrJson = new JSONObject(myResponse);
                            System.out.println("solrJson is " + solrJson);
                            JSONArray docs = (solrJson.getJSONObject("response")).getJSONArray("docs");
                            System.out.println("docs is " + docs);
                            searchRes = new ArrayList<String>();
                            for (int i=0; i < docs.length(); i++) {
                                searchRes.add(docs.getJSONObject(i).getString("Title"));
                            }
                            runOnUiThread(new Runnable() {
                                @Override
                                public void run() {
                                    ArrayAdapter adapter = new ArrayAdapter<String>(mContext,R.layout.searchlisted,R.id.searchTitle,searchRes);
                                    ((ListView)findViewById(R.id.resultsList)).setAdapter(adapter);
                                }
                            });
                        } catch(Exception e) {
                            e.printStackTrace();
                        }
                    }
                });
            } catch (Exception e) {
                e.printStackTrace();
            }
            return "hi";
        }
        protected void onPostExecute(String res) {



        }

    }


}
