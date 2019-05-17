package com.example.ecom;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.AsyncTask;
import android.os.Bundle;
import android.text.Editable;
import android.text.TextWatcher;
import android.view.KeyEvent;
import android.view.inputmethod.EditorInfo;
import android.widget.ArrayAdapter;
import android.widget.EditText;
import android.widget.ListView;
import android.widget.TextView;
import android.widget.Toast;

import org.json.JSONArray;
import org.json.JSONObject;

import java.io.IOException;
import java.lang.reflect.Array;
import java.util.ArrayList;

import okhttp3.Call;
import okhttp3.Callback;
import okhttp3.MediaType;
import okhttp3.OkHttpClient;
import okhttp3.Request;
import okhttp3.Response;

public class SearchActivity extends Activity {
    Context context = this;
    ArrayList<String> results;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        results = new ArrayList<String>();
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_search);
        final EditText searchStuff = findViewById(R.id.searchStuff);

        searchStuff.addTextChangedListener(new TextWatcher() {
            @Override
            public void beforeTextChanged(CharSequence s, int start, int count, int after) {

            }

            @Override
            public void onTextChanged(CharSequence s, int start, int before, int count) {
                search(searchStuff.getText().toString());
            }

            @Override
            public void afterTextChanged(Editable s) {

            }
        });
    }
    public void search(String term) {
        System.out.println("Running search!");
        SolrSearchThread s = new SolrSearchThread();
        s.execute(term);
    }
    public class SolrSearchThread extends AsyncTask<String,Void,String> {
        String send = "http://ec2-3-86-76-11.compute-1.amazonaws.com:8983/solr/itemcore/select?q=Title:";

        protected String doInBackground(String... params) {
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
                            results = new ArrayList<String>();
                            for (int i=0; i < docs.length(); i++) {
                                results.add(docs.getJSONObject(i).getString("Title"));
                            }
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

            ArrayAdapter adapter = new ArrayAdapter<String>(context,R.layout.searchlisted,R.id.searchTitle,results);
            ((ListView)findViewById(R.id.resultsList)).setAdapter(adapter);
        }

    }
}
