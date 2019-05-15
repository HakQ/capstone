package com.example.ecom;

import android.app.Activity;
import android.content.Context;
import android.content.Intent;
import android.os.Bundle;
import android.view.View;
import android.widget.Button;
import android.widget.EditText;
import android.widget.Toast;

import com.amazonaws.mobileconnectors.cognitoidentityprovider.CognitoDevice;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.CognitoUser;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.CognitoUserAttributes;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.CognitoUserCodeDeliveryDetails;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.CognitoUserPool;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.CognitoUserSession;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.continuations.AuthenticationContinuation;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.continuations.AuthenticationDetails;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.continuations.ChallengeContinuation;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.continuations.ChooseMfaContinuation;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.continuations.MultiFactorAuthenticationContinuation;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.handlers.AuthenticationHandler;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.handlers.GenericHandler;
import com.amazonaws.mobileconnectors.cognitoidentityprovider.handlers.SignUpHandler;

import java.util.Arrays;
import java.util.List;

public class LoginActivity extends Activity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_login);

        Context context = this;
        /*
        String userPoolId = "us-east-1_8npNd76Ea";
        String clientId = "3p5o08hnv252snaspi5m46bnfn";
        String clientSecret = "n7bs3v4441geetb3hdo6im56sg4as9supk0mmm2t59s2us05fbp";
        */
        String userPoolId = "us-east-1_spzaa5D0b";
        String clientId = "4da0jbchabac6ogu5q4g0uns54";
        String clientSecret = "d3rq49st53tvsushni7s64kb0lbdrko16g6do18otj9hmfq0uck";
        CognitoUserPool userPool = new CognitoUserPool(context, userPoolId, clientId, clientSecret);

        GenericHandler confirmCallback = new GenericHandler() {

            @Override
            public void onSuccess() {
                // User was successfully confirmed
                Toast.makeText(context, "Confirmed!", Toast.LENGTH_SHORT).show();
                Intent intent = new Intent(LoginActivity.this, MarketActivity.class);



                //We can either add an extra to the intent to indicate the login or we can get some sort of token?
                startActivity(intent);

            }

            @Override
            public void onFailure(Exception exception) {
                // User confirmation failed. Check exception for the cause.
                Toast.makeText(context, "Not confirmed?", Toast.LENGTH_SHORT).show();
                exception.printStackTrace();
            }
        };

        SignUpHandler signupCallback = new SignUpHandler() {
            @Override
            public void onSuccess(CognitoUser cognitoUser, boolean userConfirmed, CognitoUserCodeDeliveryDetails cognitoUserCodeDeliveryDetails) {
                // Sign-up was successful
                EditText usrText = findViewById(R.id.usrText);
                usrText.setHint("Code");
                usrText.setText("");
                ((EditText)findViewById(R.id.usrText)).setHint("Code");
                ((EditText)findViewById(R.id.passText)).setVisibility(View.GONE);

                Button joinButton = findViewById(R.id.joinButton);
                joinButton.setText("Confirm");

                joinButton.setOnClickListener(new View.OnClickListener() {
                    @Override
                    public void onClick(View v) {

                        String confCode = ((EditText) findViewById(R.id.usrText)).getText().toString();
                        cognitoUser.confirmSignUpInBackground(confCode, false, confirmCallback);
                    }
                });
            }
            @Override
            public void onFailure(Exception exception) {
                // Sign-up failed, check exception for the cause
                Toast.makeText(context, "Failed!", Toast.LENGTH_SHORT).show();
                exception.printStackTrace();
            }
        };


        ((Button) findViewById(R.id.joinButton)).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {
                ((EditText)findViewById(R.id.nameText)).setVisibility(View.VISIBLE);
                ((EditText)findViewById(R.id.addressText)).setVisibility(View.VISIBLE);

                String userId = ((EditText) findViewById(R.id.usrText)).getText().toString();
                String address = ((EditText) findViewById(R.id.addressText)).getText().toString();
                String name = ((EditText) findViewById(R.id.nameText)).getText().toString();

                if (userId.isEmpty()) {
                    Toast.makeText(context, "Username empty.", Toast.LENGTH_SHORT).show();
                } else if (address.isEmpty()) {
                    Toast.makeText(context, "Enter the source address.", Toast.LENGTH_SHORT).show();

                } else if(name.isEmpty()) {
                    Toast.makeText(context, "Enter a Preferred Name.", Toast.LENGTH_SHORT).show();

                } else {
                    userId.toLowerCase();
                    String password = ((EditText) findViewById(R.id.passText)).getText().toString();
                    CognitoUserAttributes userAttributes = new CognitoUserAttributes();
                    userAttributes.addAttribute("name",((EditText) findViewById(R.id.nameText)).getText().toString());
                    userAttributes.addAttribute("address",((EditText) findViewById(R.id.addressText)).getText().toString());
                    userPool.signUpInBackground(userId, password, userAttributes, null, signupCallback);
                }
            }
        });



        ///*
        AuthenticationHandler authHandler = new AuthenticationHandler() {

            @Override
            public void onSuccess(CognitoUserSession cognitoUserSession, CognitoDevice cognitoDevice) {


                //Toast.makeText(context,"Login succeeded!" + cognitoUserSession.toString(),Toast.LENGTH_SHORT).show();
                Intent intent = new Intent(LoginActivity.this, MarketActivity.class);
                //intent.putExtra("username",userPool.getCurrentUser().getUserId());
                intent.putExtra("username",((EditText) findViewById(R.id.usrText)).getText().toString());
                startActivity(intent);
            }

            @Override
            public void getAuthenticationDetails(AuthenticationContinuation authenticationContinuation, String userId) {
                System.out.println("getting auth details");
                // The API needs user sign-in credentials to continue

                AuthenticationDetails authenticationDetails = new AuthenticationDetails(userId, ((EditText) findViewById(R.id.passText)).getText().toString(), null);

                // Pass the user sign-in credentials to the continuation
                authenticationContinuation.setAuthenticationDetails(authenticationDetails);

                // Allow the sign-in to continue
                authenticationContinuation.continueTask();
                // ...
            }

            @Override
            public void getMFACode(MultiFactorAuthenticationContinuation multiFactorAuthenticationContinuation) {
                System.out.println("getting mfacode");
                // ...
            }

            @Override
            public void authenticationChallenge(ChallengeContinuation continuation) {
                ChooseMfaContinuation mfaOptionsContinuation = (ChooseMfaContinuation) continuation;
                // Get the list of MFA's to choose from
                List<String> mfaOptions = mfaOptionsContinuation.getMfaOptions();

                // ...
                System.out.println("the mfas");
                System.out.println(Arrays.toString(mfaOptions.toArray()));
                String option = mfaOptions.get(0);
                // Set the MFA option and continue to authenticate.
                mfaOptionsContinuation.setMfaOption(option);
                mfaOptionsContinuation.continueTask();
            }
            @Override
            public void onFailure(Exception exception) {
                // Sign-in failed, check exception for the cause
                System.out.println("Login Failed");
                Toast.makeText(context,"Login failed!",Toast.LENGTH_SHORT).show();
                exception.printStackTrace();
            }
        };
//*/




        ((Button) findViewById(R.id.loginButton)).setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View v) {

                // Sign in the user
                System.out.println("Signing in!");
                String userId = ((EditText) findViewById(R.id.usrText)).getText().toString().toLowerCase();
                String password = ((EditText) findViewById(R.id.passText)).getText().toString();
                //signIn(userId,password);
                ///*
                if (userId.isEmpty()) {
                    Toast.makeText(context, "Username empty.", Toast.LENGTH_SHORT).show();
                    return;
                } else {
                    CognitoUser user = userPool.getUser(userId);
                    user.getSessionInBackground(authHandler);
                }
                //*/
            }
        });
    }

}
