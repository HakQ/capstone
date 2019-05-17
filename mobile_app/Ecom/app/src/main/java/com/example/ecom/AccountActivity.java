package com.example.ecom;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.TextView;
import android.widget.Toast;

import com.amazonaws.mobileconnectors.cognitoidentityprovider.CognitoDevice;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.CognitoUser;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.CognitoUserPool;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.CognitoUserSession;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.continuations.AuthenticationContinuation;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.continuations.AuthenticationDetails;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.continuations.ChallengeContinuation;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.continuations.MultiFactorAuthenticationContinuation;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.handlers.AuthenticationHandler;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.handlers.GenericHandler;

import java.util.HashMap;
import java.util.Map;

public class AccountActivity extends Activity {
    Context context;
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        context = this;
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_account);
        String userPoolId = "us-east-1_8npNd76Ea";
        String clientId = "3p5o08hnv252snaspi5m46bnfn";
        String clientSecret = "n7bs3v4441geetb3hdo6im56sg4as9supk0mmm2t59s2us05fbp";
        CognitoUserPool userPool = new CognitoUserPool(this, userPoolId, clientId, clientSecret);
        ((TextView)findViewById(R.id.myUser)).setText(userPool.getCurrentUser().getUserId());

        //On access, get info.





        ((Button)findViewById(R.id.changePasswordButton)).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ((EditText)findViewById(R.id.oldPass)).setVisibility(View.VISIBLE);
                ((EditText)findViewById(R.id.newPass)).setVisibility(View.VISIBLE);
                ((Button)findViewById(R.id.submitPassChange)).setVisibility(View.VISIBLE);
                ((Button)findViewById(R.id.submitPassChange)).setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {
                        userPool.getCurrentUser().changePasswordInBackground(((EditText)findViewById(R.id.oldPass)).getText().toString(),((EditText)findViewById(R.id.newPass)).getText().toString(),changePassHandler);
                        ((EditText)findViewById(R.id.oldPass)).setVisibility(View.GONE);
                        ((EditText)findViewById(R.id.newPass)).setVisibility(View.GONE);
                        ((Button)findViewById(R.id.submitPassChange)).setVisibility(View.GONE);
                    }
                });
            }
        });
        ((Button)findViewById(R.id.signOutButton)).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                Toast.makeText(context,getIntent().getStringExtra("username") + " is logging out.",Toast.LENGTH_SHORT).show();
                userPool.getUser(getIntent().getStringExtra("username")).globalSignOutInBackground(signoutHandler);

               // userPool.getCurrentUser().getSessionInBackground(getSessionCallback);



            }
        });
    }
    GenericHandler changePassHandler = new GenericHandler() {

        @Override
        public void onSuccess() {
            // Password change was successful!
            Toast.makeText(context,"Password Changed!",Toast.LENGTH_SHORT).show();
        }

        @Override
        public void onFailure(Exception exception) {
            // Password change failed, probe exception for details
            Toast.makeText(context,"Password Failed!",Toast.LENGTH_SHORT).show();
            exception.printStackTrace();

        }
    };

    GenericHandler signoutHandler = new GenericHandler() {
        @Override
        public void onSuccess() {
            Toast.makeText(context,"Signed out!",Toast.LENGTH_SHORT).show();

            Intent intent = new Intent(context,MarketActivity.class);
            startActivity(intent);
        }

        @Override
        public void onFailure(Exception exception) {
            Toast.makeText(context,"Failed to sign out!",Toast.LENGTH_SHORT).show();
            exception.printStackTrace();

        }
    };

/*
    AuthenticationHandler getSessionCallback = new AuthenticationHandler() {

        @Override
        public void onSuccess(CognitoUserSession cognitoUserSession, CognitoDevice cognitoDevice) {
            //Got session!
            System.out.println("Success session");

            System.out.println(cognitoUserSession.getAccessToken());
            System.out.println(cognitoUserSession.getIdToken());
            System.out.println(cognitoUserSession.getRefreshToken());
            System.out.println(cognitoUserSession.getUsername());
            System.out.println(cognitoUserSession.isValid());

        }

        @Override
        public void getAuthenticationDetails(AuthenticationContinuation authenticationContinuation, String userId) {
            System.out.println("Authenticating");
            AuthenticationDetails authenticationDetails = new AuthenticationDetails("US@USIPUN.COM","Gotthere2", null);

            // Pass the user sign-in credentials to the continuation
            authenticationContinuation.setAuthenticationDetails(authenticationDetails);

            // Allow the sign-in to continue
            authenticationContinuation.continueTask();

        }

        @Override
        public void getMFACode(MultiFactorAuthenticationContinuation continuation) {

        }

        @Override
        public void authenticationChallenge(ChallengeContinuation continuation) {

        }

        @Override
        public void onFailure(Exception exception) {
            // Password change failed, probe exception for details
            Toast.makeText(context,"No got sess!",Toast.LENGTH_SHORT).show();
            exception.printStackTrace();

        }
    };
    */
}
