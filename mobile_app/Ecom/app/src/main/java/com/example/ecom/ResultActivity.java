package com.example.ecom;

import android.app.Activity;
import android.app.AlertDialog;
import android.app.ExpandableListActivity;
import android.content.Context;
import android.content.DialogInterface;
import android.content.Intent;
import android.net.Uri;
import android.os.AsyncTask;
import android.os.Bundle;
import android.provider.MediaStore;
import android.support.design.widget.FloatingActionButton;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.TextView;
import android.widget.Toast;

import com.squareup.picasso.Picasso;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.BufferedInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.io.OutputStream;
import java.io.OutputStreamWriter;
import java.lang.reflect.Array;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;
import javax.xml.transform.Result;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.RequestBody;
import okhttp3.Response;

public class ResultActivity extends Activity {
    boolean debug = false;
    Intent intent;
    float moneys;
    int times;
    Context context = this;
    String Size;
    String Description;
    String Qty;
    String Color;
    String Weight;
    String Brand;
    String Gender;
    String zipcode;
    String Category;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_res);

        intent = getIntent();
        ///*
        ((TextView) findViewById(R.id.titleView)).setText(intent.getStringExtra("title"));
        ((TextView) findViewById(R.id.descView)).setText(intent.getStringExtra("desc"));

///*
        if (intent.getStringExtra("size") != null) {
            Size = intent.getStringExtra("size");
            ((EditText)findViewById(R.id.enterSize)).setText(Size);
        } else {
            Size = null;
        }
        if (intent.getStringExtra("Description") != null) {
            Description = intent.getStringExtra("Description");
        } else {
            Description = null;
        }

        if (intent.getStringExtra("Qty") != null) {
            Qty = intent.getStringExtra("Qty");
        } else {
            Qty = null;
        }
        if (intent.getStringExtra("Color") != null) {
            Color = intent.getStringExtra("Color");
        } else {
            Color = null;
        }
        if (intent.getStringExtra("Weight") != null) {
            Weight = intent.getStringExtra("Weight");
        } else {
            Weight = null;
        }
        if (intent.getStringExtra("Brand") != null) {
            Brand = intent.getStringExtra("Brand");
        } else {
            Brand = null;
        }if (intent.getStringExtra("Gender") != null) {
            Gender = intent.getStringExtra("Gender");
        } else {
            Gender = null;
        }if (intent.getStringExtra("zipcode") != null) {
            zipcode = intent.getStringExtra("zipcode");
        } else {
            zipcode = null;
        }if (intent.getStringExtra("Category") != null) {
            Category = intent.getStringExtra("Category");
        } else {
            Category = null;
        }
//*/


        if (intent.getStringExtra("prodPic").equals("Not Found")) {
            System.out.println("Image Not Available");
        } else {
            Picasso.get().load(intent.getStringExtra("prodPic")).into(((ImageView) findViewById(R.id.prodPicView)));
        }
        //*/
        final EditText enterHours = (EditText) findViewById(R.id.enterHours);
        final EditText enterMinutes = (EditText) findViewById(R.id.enterMinutes);
        final EditText enterDollars = (EditText) findViewById(R.id.enterDollars);
        final EditText enterCents = (EditText) findViewById(R.id.enterCents);

        ((FloatingActionButton) findViewById(R.id.submitProduct)).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                if (enterHours.getText().toString().isEmpty()) { return; }//Later set separate responses
                if (enterMinutes.getText().toString().isEmpty()) { return; }
                if (enterDollars.getText().toString().isEmpty()) { return; }
                if (enterCents.getText().toString().isEmpty()) { return; }

                int hours = Integer.parseInt(enterHours.getText().toString());
                final int minutes = Integer.parseInt(enterMinutes.getText().toString()) + (hours * 60);
                times = minutes;
                int dollars = Integer.parseInt(enterDollars.getText().toString());
                int cents = Integer.parseInt(enterCents.getText().toString());
                moneys = dollars + (cents/100);
                if (minutes < 45 || minutes > 120) {
                    Toast.makeText(ResultActivity.this,"Must be between 45 minutes to 2 hours long.",Toast.LENGTH_SHORT).show();
                } else if (cents > 100 || dollars > 1000) {
                    Toast.makeText(ResultActivity.this, "Cents must be less than 100, dollars less than 1000.", Toast.LENGTH_SHORT).show();
                } else if (((EditText)findViewById(R.id.enterSize)).getText().toString().isEmpty() && ((Size == null) || (Size.isEmpty()))) {
                    Toast.makeText(ResultActivity.this, "Must enter size.", Toast.LENGTH_SHORT).show();
                } else if ((((EditText)findViewById(R.id.enterZipcode)).getText().toString().isEmpty()) && ((zipcode == null) || (zipcode.isEmpty()))) {
                    Toast.makeText(ResultActivity.this, "Must enter zipcode.", Toast.LENGTH_SHORT).show();
                } else if ((((EditText)findViewById(R.id.enterQty)).getText().toString().isEmpty()) && ((Qty == null) || (Qty.isEmpty()))) {
                    Toast.makeText(ResultActivity.this, "Must enter quantity.", Toast.LENGTH_SHORT).show();
                }else {

                        ///*
                        new AlertDialog.Builder(ResultActivity.this)
                                .setTitle("Confirm?")
                                .setMessage("Do you want to post this item?")
                                .setPositiveButton("ok", new DialogInterface.OnClickListener() {
                                    public void onClick(DialogInterface dialog, int which) {
                                        //Submitto the posto
                                        //Create json with title, upc, time (minutes), and cost.
                                        JSONObject prod = new JSONObject();
                                        try {

                                            prod.put("upc",intent.getStringExtra("upc"));
                                            if (debug) {
                                                postThreadBackup p = new postThreadBackup();
                                                p.execute(prod);
                                            } else {
                                                postThread p = new postThread();
                                                p.execute(prod);
                                            }
                                            System.out.println(prod);
                                        } catch (Exception e) {
                                            e.printStackTrace();
                                        }
                                        //Toast.makeText(ResultActivity.this, "Submitted!", Toast.LENGTH_SHORT).show();
                                        Intent intent2 = new Intent(ResultActivity.this,MarketActivity.class);
                                        intent2.putExtra("username",intent.getStringExtra("username"));
                                        finish();
                                        startActivity(intent2);
                                    }
                                })
                                .setNegativeButton("no", new DialogInterface.OnClickListener() {
                                    @Override
                                    public void onClick(DialogInterface dialog, int which) {
                                        Intent intent2 = new Intent(ResultActivity.this,MarketActivity.class);
                                        intent2.putExtra("username",intent.getStringExtra("username"));
                                        startActivity(intent2);
                                        //startActivity(new Intent(ResultActivity.this,MainActivity.class));
                                    }
                                }).show();
                        //*/
                        //startActivity(new Intent(ResultActivity.this,MainActivity.class));
                }
            }
        });
    }



    public class postThread extends AsyncTask<JSONObject,Void,String> {

        String result;
        protected String doInBackground(JSONObject... params) {
            try {
                //String send = "http://146.95.79.164:8081/search?upc=";
                //String send = "https://4ldtno1wu9.execute-api.us-east-1.amazonaws.com/dev/upload-api-dev-app";
                //String send = "https://0c4xhsl2gf.execute-api.us-east-1.amazonaws.com/default/UPCite-apu-dev-hello";

                String send = "https://4ldtno1wu9.execute-api.us-east-1.amazonaws.com/dev/upload-api-dev-app";
                //String send = "http://ec2-3-86-76-11.compute-1.amazonaws.com:3000";

                /*
                //send += params[0];
                System.out.println(send + " is send.");
                URL snapServer = new URL(send);
                HttpsURLConnection connSend = (HttpsURLConnection) snapServer.openConnection();

                connSend.setConnectTimeout(1000);
                System.out.println(connSend.getResponseMessage() + " not found!");
                System.out.println(connSend.getResponseCode());
                if (connSend.getResponseCode() == 200) {
                    System.out.println("Successfully sent!");
                } else {
                    System.out.println("Could not send?");
                }
                */
                MediaType JSON = MediaType.get("application/json; charset=utf-8");
///*
                OkHttpClient client = new OkHttpClient();

                String json = params[0].toString();
                System.out.println(json + " is json.");
                String url = send;
                JSONObject prod = new JSONObject();

                if (intent.getStringExtra("size") != null) {
                    prod.put("Size",intent.getStringExtra("Size")); //ask

                } else {
                    //prod.put("Size","Large");
                    prod.put("Size",((EditText)findViewById(R.id.enterSize)).getText().toString());

                    //Show Size
                }
                if (intent.getStringExtra("Description") != null) {
                    prod.put("Description",intent.getStringExtra("Description")); //ask

                } else {
                    prod.put("Description","none"); //ask
                    //

                }

                prod.put("IMG",intent.getStringExtra("prodPic"));
                prod.put("UPC",intent.getStringExtra("upc"));
                prod.put("Title",intent.getStringExtra("Title"));
                prod.put("Price_paid",moneys);
                prod.put("Competitor",0);
/*
                prod.put("Qty","1"); //ask
                prod.put("Color","blue"); //ask
                prod.put("Weight",10); //ask
                prod.put("Brand",intent.getStringExtra("Brand")); //ask
                prod.put("Gender","male"); //ask
                prod.put("Zip_Code","10001"); //ask
                prod.put("Category","sweater"); //ask
                prod.put("Seller",intent.getStringExtra("username"));
                prod.put("Time",times);
*/

///*
                if ((Qty != null) && (!Qty.isEmpty())) {
                    prod.put("Qty",intent.getStringExtra("Qty")); //ask

                } else {
                    //prod.put("Qty","0"); //ask
                    prod.put("Qty",((EditText)findViewById(R.id.enterQty)).getText().toString());
                }
                if ((Color != null) && (!Color.isEmpty())) {
                    System.out.println("Color is here!");
                    prod.put("Color",intent.getStringExtra("Color"));

                } else {
                    prod.put("Color","NAN");

                }
                prod.put("Time",times);

                if ((Weight != null) && (!Weight.isEmpty())) {
                    prod.put("Weight",intent.getStringExtra("Weight"));

                } else {
                    prod.put("Weight",2);

                }

                prod.put("Seller",intent.getStringExtra("username"));

                if ((Brand != null) && (!Brand.isEmpty())) {
                    prod.put("Brand",intent.getStringExtra("Brand"));

                } else {
                    prod.put("Brand","NAN");

                }if (Gender != null && (!Gender.isEmpty())) {
                    prod.put("Gender",intent.getStringExtra("Gender"));

                } else {
                    prod.put("Gender","male");

                }if (zipcode != null && (!zipcode.isEmpty())) {
                    prod.put("Zip_Code",intent.getStringExtra("zipcode")); //ask

                } else {
                    //prod.put("Zip_Code","NAN"); //ask
                    prod.put("Zip_Code",((EditText)findViewById(R.id.enterZipcode)).getText().toString());


                }if (Category != null && (!Category.isEmpty())) {
                    prod.put("Category",intent.getStringExtra("Category"));

                } else {
                    prod.put("Category","NAN");
                }
//*/

                json = prod.toString();
                System.out.println("Sending this3: " + json);
                RequestBody body = RequestBody.create(JSON, json);
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
                        System.out.println("Response is this yo" + myResponse);
                        runOnUiThread(new Runnable() {
                            @Override
                            public void run() {
                                Toast.makeText(context,myResponse,Toast.LENGTH_SHORT).show();
                            }
                        });
                    }
                });
//*/
            } catch(Exception e) {
                e.printStackTrace();
            }
            return "hi";
        }
        protected void onPostExecute(String res) {
        }

    }

    public class postThreadBackup extends AsyncTask<JSONObject,Void,String> {

        String result;
        protected String doInBackground(JSONObject... params) {
            try {
                //String send = "http://146.95.79.164:8081/search?upc=";
                //String send = "https://4ldtno1wu9.execute-api.us-east-1.amazonaws.com/dev/upload-api-dev-app";
                //String send = "https://0c4xhsl2gf.execute-api.us-east-1.amazonaws.com/default/UPCite-apu-dev-hello";
                //String send = "https://4ldtno1wu9.execute-api.us-east-1.amazonaws.com/dev/upload-api-dev-app";
                String send = "mongodb://ec2-3-86-76-11.compute-1.amazonaws.com:27017";

                MediaType JSON = MediaType.get("application/json; charset=utf-8");
                OkHttpClient client = new OkHttpClient();

                String json = params[0].toString();
                System.out.println(json + " is json.");
                String url = send;
                JSONObject prod = new JSONObject();
                prod.put("Size","large"); //ask
                prod.put("Description","none"); //ask
                String pics[] = new String[1];
                pics[0] = intent.getStringExtra("prodPic");
                prod.put("IMG",pics);
                prod.put("UPC",intent.getStringExtra("upc"));
                prod.put("Title",intent.getStringExtra("title"));
                prod.put("Price_paid",moneys);
                prod.put("Competitor",0);
                prod.put("Qty","10");
                prod.put("Color","blue");
                prod.put("Time",times);
                prod.put("Weight",10);
                prod.put("Seller","dpkd");
                prod.put("Brand","nike");
                prod.put("Gender","male");
                prod.put("Category","sweater"); //ask
                prod.put("zipcode","10001");
                json = prod.toString();
                System.out.println("Sending this3: " + json);
                RequestBody body = RequestBody.create(JSON, json);
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
                        System.out.println("Response is this yo" + myResponse);
                    }
                });
            } catch(Exception e) {
                e.printStackTrace();
            }
            return "hi";
        }
        protected void onPostExecute(String res) {
        }

    }
}
